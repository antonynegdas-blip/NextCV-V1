import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { optimizeResumeWithGemini } from "@/lib/gemini";
import { checkRateLimit } from "@/lib/ratelimit";
import { sanitizeRawText, assertServerEnvironment } from "@/lib/security/sanitizer";
import { validateRequestOrigin } from "@/lib/security/request";

assertServerEnvironment();

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

    // 2. Identificação de IP para Rate Limiting
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
        { status: 429, headers: SECURITY_HEADERS }
      );
    }

    // 3. Leitura e validação de corpo JSON com Zod
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Corpo da requisição inválido. Esperado JSON válido." },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const validation = RequestSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400, headers: SECURITY_HEADERS });
    }

    // 4. Sanitização profunda de entradas (Anti-Injection & Bidi Attacks)
    const cleanResume = sanitizeRawText(validation.data.resumeText, 30000);
    const cleanJob = sanitizeRawText(validation.data.jobDescription, 20000);

    // 5. Execução no motor seguro
    const result = await optimizeResumeWithGemini(cleanResume, cleanJob);
    const isDemo =
      !process.env.GEMINI_API_KEY ||
      process.env.GEMINI_API_KEY === "your_gemini_api_key_here";

    return NextResponse.json(
      {
        success: true,
        data: result,
        isDemo,
        remainingRequests: rateLimit.remaining,
      },
      { headers: SECURITY_HEADERS }
    );
  } catch (error: unknown) {
    // Escudo de Segurança: Logs seguros no servidor, sem jamais vazar detalhes internos ao cliente
    console.error("Falha protegida na rota /api/optimize:", error instanceof Error ? error.message : "Erro desconhecido");

    return NextResponse.json(
      { error: "Falha ao processar a calibragem com segurança. Por favor, tente novamente em instantes." },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
