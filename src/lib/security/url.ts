/**
 * Sanitizador de URLs externas para prevenção de XSS via pseudo-protocolos (javascript:, data:)
 */
export function sanitizeExternalUrl(url?: string): string | null {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();

  // Bloqueia tentativas de execução de script
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:") ||
    lower.startsWith("file:")
  ) {
    return null;
  }

  // Se começar sem protocolo (ex: linkedin.com/in/user), adiciona https://
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(trimmed)) {
    return `https://${trimmed}`;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.href;
    }
  } catch {
    return null;
  }

  return null;
}
