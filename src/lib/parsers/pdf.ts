import { extractText } from "unpdf";

export async function parsePdfBuffer(buffer: ArrayBuffer | Uint8Array): Promise<string> {
  try {
    const { text } = await extractText(buffer);
    const fullText = Array.isArray(text) ? text.join("\n\n") : text;
    
    // Limpeza de caracteres de controle e quebras excessivas
    const cleaned = fullText
      .replace(/\r\n/g, "\n")
      .replace(/\t/g, " ")
      .replace(/[ \t]{2,}/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    return cleaned;
  } catch (error) {
    console.error("Erro ao fazer parse do PDF:", error);
    throw new Error("Falha ao ler o arquivo PDF. Verifique se o arquivo não está corrompido ou protegido por senha.");
  }
}
