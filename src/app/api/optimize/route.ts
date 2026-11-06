import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { optimizeResumeWithGemini } from "@/lib/gemini";
import { checkRateLimit } from "@/lib/ratelimit";

const RequestSchema = z.object({
  resumeText: z
    .string()
    .min(50, "O currículo precisa ter pelo menos 50 caracteres para uma análise consistente.")
    .max(30000, "O texto do currículo excede o limite máximo permitido (30.000 caracteres)."),
  jobDescription: z
    .string()
    .min(30, "A descrição da vaga precisa ter pelo menos 30 caracteres.")
    .max(20000, "A descrição da vaga excede o limite permitido (20.000 caracteres)."),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Identificação de IP para Rate Limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 12, 60); // 12 requisições por minuto por IP
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `Limite de requisições atingido. Por favor, aguarde ${rateLimit.resetInSeconds} segundos antes de tentar novamente.`,
        },
        { status: 429 }
      );
    }

    // 2. Leitura e validação de corpo JSON com Zod
    const body = await req.json();
    const validation = RequestSchema.safeParse(body);

    if (!validation.success) {
      const errorMsg = validation.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { resumeText, jobDescription } = validation.data;

    // 3. Execução da Otimização via Gemini
    const result = await optimizeResumeWithGemini(resumeText, jobDescription);
    const isDemo =
      !process.env.GEMINI_API_KEY ||
      process.env.GEMINI_API_KEY === "your_gemini_api_key_here";

    return NextResponse.json({
      success: true,
      data: result,
      isDemo,
      remainingRequests: rateLimit.remaining,
    });
  } catch (error: unknown) {
    console.error("Erro na rota /api/optimize:", error);
    const message =
      error instanceof Error ? error.message : "Ocorreu um erro interno inesperado.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
