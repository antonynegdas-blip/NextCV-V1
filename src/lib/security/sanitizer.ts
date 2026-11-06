/**
 * Módulo de Sanitização e Segurança de Entradas (Anti-Injection, Anti-Bidi & Anti-XSS)
 */

export function assertServerEnvironment(): void {
  if (typeof window !== "undefined") {
    throw new Error("VIOLAÇÃO DE SEGURANÇA: Módulo restrito ao servidor invocado no cliente.");
  }
}

/**
 * Remove caracteres de controle de baixa ordem, ataques Bidi (Trojan Source) e normaliza texto.
 */
export function sanitizeRawText(input: string, maxLength: number = 30000): string {
  if (typeof input !== "string") return "";

  let cleaned = input
    // Remove bytes nulos e caracteres de controle perigosos (mantém \n e \t)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    // Remove caracteres de inversão de direção Unicode (Bidi Overrides)
    .replace(/[\u202A-\u202E\u2066-\u2069]/g, "")
    // Remove zero-width spaces e invisíveis excessivos
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    // Normaliza quebras de linha
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();

  // Neutraliza tentativas conhecidas de prompt injection
  cleaned = defangPromptInjection(cleaned);

  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength);
  }

  return cleaned;
}

/**
 * Neutraliza comandos comuns de prompt injection dentro do texto fornecido
 */
function defangPromptInjection(text: string): string {
  const injectionPatterns = [
    /ignore\s+(all\s+)?(previous|prior)\s+instructions/gi,
    /disregard\s+(all\s+)?(previous|prior)\s+instructions/gi,
    /forget\s+(all\s+)?(previous|prior)\s+rules/gi,
    /system\s*prompt\s*:/gi,
    /you\s+are\s+now\s+(in\s+)?(dan|developer\s+mode)/gi,
    /override\s+(system|developer)\s+instructions/gi,
  ];

  let safeText = text;
  for (const pattern of injectionPatterns) {
    safeText = safeText.replace(pattern, "[Comando desativado por segurança]");
  }

  return safeText;
}

/**
 * Mascara qualquer chave ou credencial para impedir vazamento em logs
 */
export function maskSecret(secret?: string): string {
  if (!secret) return "[NÃO DEFINIDO]";
  if (secret.length <= 8) return "********";
  return `${secret.slice(0, 4)}...${secret.slice(-4)}`;
}

