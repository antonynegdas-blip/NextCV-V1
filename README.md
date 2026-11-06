# 🚀 DevMatch.ai — Otimizador de Currículos Tech para ATS & Gupy

SaaS desenvolvido em **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS** e **Google Gemini API** para otimizar currículos de tecnologia (Desenvolvedores, Engenheiros de Software, DevOps e Dados) de acordo com os requisitos específicos de cada vaga.

---

## 🌟 Principais Recursos

1. **Diagnóstico & ATS Match Score (0 a 100%):**
   - Pontuação geral de aderência aos robôs de triagem (Gupy, Lever, Greenhouse, Workday).
   - Análise segmentada de **Hard Skills**, **Alinhamento de Experiência** e **Legibilidade ATS**.
   - Mapeamento instantâneo de **Palavras-chave Encontradas vs. Faltantes**.

2. **Otimização Assistida com IA (Anti-Alucinação):**
   - Reescrita do resumo profissional alinhado à cultura e exigências da vaga.
   - Aplicação do framework **Google XYZ** (*"Alcancei [X], medido por [Y], fazendo [Z]"*) e verbos de ação fortes nos bullet points.
   - Preservação da verdade do candidato (a IA nunca inventa empresas ou diplomas fictícios).

3. **Comparativo Interativo ("Antes vs Depois"):**
   - Visão lado a lado das alterações com a justificativa de RH de por que aquela mudança aumenta a chance de triagem.

4. **Exportação Versátil:**
   - **Imprimir / Salvar em PDF** formatado com layout limpo e hierarquia amigável a parsers de OCR.
   - **Copiar Texto Limpo** para colar diretamente nos campos de texto da Gupy.
   - **Copiar em Markdown** para edição rápida no Notion/Obsidian/Docs.

5. **Upload Seguro de PDF:**
   - Parser nativo de PDF com validação de tipo MIME e limite de 5MB.

---

## 🛡️ Camada de Segurança & Robustez (V1)

- **Rate Limiting por IP:** Previne abusos de tráfego e protege as cotas da API do Gemini.
- **Validação com Zod:** Sanitização e validação de tamanho de texto em todas as fronteiras (client e server).
- **Proteção contra Prompt Injection:** Delimitação de tags XML estritas e diretrizes de sistema que tratam os dados de entrada estritamente como texto passivo.
- **Modo Demonstração Automático:** Caso a chave `GEMINI_API_KEY` não seja fornecida, o sistema entra em modo de demonstração com um aviso discreto, permitindo testar toda a interface e fluxo sem quebrar.

---

## 🛠️ Tecnologias Utilizadas

- **Fullstack:** Next.js 16 (App Router, Server Components & Route Handlers)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Inteligência Artificial:** SDK Oficial do Google Gen AI (`@google/genai`) com modelo `gemini-2.5-flash`
- **Validação de Schemas:** Zod
- **Parser de PDF:** `unpdf`
- **Ícones:** Lucide React

---

## 🚀 Como Executar Localmente

### 1. Clonar e Instalar Dependências

```bash
cd /home/certa/Documentos/Saas
npm install
```

### 2. Configurar a Chave da API do Gemini

Crie o arquivo `.env.local` na raiz:

```env
GEMINI_API_KEY=sua_chave_do_google_ai_studio
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> 💡 *Você pode gerar sua chave gratuitamente no [Google AI Studio](https://aistudio.google.com/).*

### 3. Rodar em Modo de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### 4. Build de Produção

```bash
npm run build
npm run start
```
