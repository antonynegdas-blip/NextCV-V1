import { NextRequest, NextResponse } from "next/server";
import { parsePdfBuffer } from "@/lib/parsers/pdf";
import { checkRateLimit } from "@/lib/ratelimit";
import { sanitizeRawText, assertServerEnvironment } from "@/lib/security/sanitizer";
import { validateRequestOrigin } from "@/lib/security/request";

assertServerEnvironment();

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const SECURITY_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
  "X-Content-Type-Options": "nosniff",
};

export async function POST(req: NextRequest) {
  try {
    // 1. Defesa Anti-CSRF / Validação de Origem
    const originCheck = validateRequestOrigin(req);
    if (!originCheck.valid) {
      return NextResponse.json(
        { error: originCheck.reason || "Origem da requisição não autorizada." },
        { status: 403, headers: SECURITY_HEADERS }
      );
    }

    // 2. Rate Limiting por IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 20, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Muitos uploads em sequência. Aguarde alguns instantes." },
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    // 3. Processamento de FormData seguro
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json(
        { error: "Formato de formulário inválido." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo foi enviado." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "O arquivo excede o limite máximo permitido de 5MB." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    // 4. Validação por extensão e tipo MIME
    const isPdfExt = file.name.toLowerCase().endsWith(".pdf");
    if (!isPdfExt) {
      return NextResponse.json(
        { error: "Formato inválido. Apenas arquivos .pdf são aceitos." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const arrayBuffer = await file.arrayBuffer();

    // 5. Validação de Magic Bytes (%PDF-) para impedir executáveis mascarados
    const headerBytes = new Uint8Array(arrayBuffer.slice(0, 5));
    const headerString = String.fromCharCode(...headerBytes);
    if (!headerString.startsWith("%PDF")) {
      return NextResponse.json(
        { error: "Arquivo corrompido ou formato PDF inválido (assinatura do arquivo rejeitada)." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    // 6. Extração e sanitização do texto
    const extractedText = await parsePdfBuffer(arrayBuffer);
    const cleanedText = sanitizeRawText(extractedText, 35000);

    if (!cleanedText || cleanedText.length < 20) {
      return NextResponse.json(
        {
          error:
            "Não foi possível extrair texto legível deste PDF. Caso seja um documento escaneado/imagem, cole o texto manualmente.",
        },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    // Higieniza nome do arquivo para retorno seguro
    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);

    return NextResponse.json(
      {
        success: true,
        text: cleanedText,
        charCount: cleanedText.length,
        fileName: safeFileName,
      },
      { headers: SECURITY_HEADERS }
    );
  } catch (error: unknown) {
    console.error("Erro protegido no processamento do PDF:", error instanceof Error ? error.message : "Erro desconhecido");
    return NextResponse.json(
      { error: "Falha segura ao processar o arquivo PDF. Tente novamente." },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
