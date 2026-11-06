import { NextRequest, NextResponse } from "next/server";
import { parsePdfBuffer } from "@/lib/parsers/pdf";
import { checkRateLimit } from "@/lib/ratelimit";


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 20, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Muitos uploads em sequência. Aguarde alguns instantes." },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo foi enviado." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "O arquivo excede o limite máximo permitido de 5MB." },
        { status: 400 }
      );
    }

    // Validação de tipo de arquivo
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return NextResponse.json(
        { error: "Formato inválido. Por favor, envie um arquivo em formato PDF (.pdf)." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const extractedText = await parsePdfBuffer(arrayBuffer);

    if (!extractedText || extractedText.length < 20) {
      return NextResponse.json(
        {
          error:
            "Não foi possível extrair texto legível deste PDF. Ele pode ser uma imagem escaneada. Recomendamos colar o texto diretamente ou usar um PDF com texto selecionável.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      text: extractedText,
      charCount: extractedText.length,
      fileName: file.name,
    });
  } catch (error: unknown) {
    console.error("Erro no processamento do PDF:", error);
    const message =
      error instanceof Error ? error.message : "Erro ao processar arquivo.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
