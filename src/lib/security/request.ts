import { NextRequest } from "next/server";

/**
 * Validação rigorosa de origem e proteção anti-CSRF / Cross-Site Hijacking
 */
export function validateRequestOrigin(req: NextRequest): { valid: boolean; reason?: string } {
  // 1. Verificação de Sec-Fetch-Site (padrão moderno do navegador)
  const secFetchSite = req.headers.get("sec-fetch-site");
  if (secFetchSite === "cross-site") {
    return { valid: false, reason: "Requisições cross-site não autorizadas." };
  }

  // 2. Validação de Host vs Origin
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  const origin = req.headers.get("origin");

  if (origin && host) {
    try {
      const originUrl = new URL(origin);
      // Remove porta para comparação de host seguro
      const originHost = originUrl.host;
      if (originHost !== host && !host.includes("localhost") && !originHost.includes("localhost")) {
        return { valid: false, reason: "Origem não coincide com o domínio do host." };
      }
    } catch {
      return { valid: false, reason: "Cabeçalho de origem malformado." };
    }
  }

  return { valid: true };
}

