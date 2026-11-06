<div align="center">

  <img src="public/icon.svg" alt="NextCV Logo" width="80" height="80" />

  # NextCV — ATS Precision Resume Optimizer
  
  **Otimizador de Perfil Técnico e Currículos para Sistemas ATS (Gupy, Greenhouse, Lever, Workday)**

  [![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
  [![Security](https://img.shields.io/badge/Security-A%2B%20Hardened-emerald?style=for-the-badge&logo=shield)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
  [![License](https://img.shields.io/badge/License-MIT-zinc?style=for-the-badge)](LICENSE)

  <p align="center">
    <a href="#-visão-geral">Visão Geral</a> •
    <a href="#-arquitetura-do-sistema">Arquitetura</a> •
    <a href="#-funcionalidades-chave">Funcionalidades</a> •
    <a href="#-blindagem-de-segurança--lgpd">Segurança</a> •
    <a href="#-stack-tecnológica">Stack</a> •
    <a href="#-estrutura-do-projeto">Estrutura</a>
  </p>
</div>

---

## 📌 Visão Geral

O **NextCV** é uma aplicação web full-stack desenvolvida para solucionar uma das maiores ineficiências do mercado de recrutamento técnico: a reprovação sumária de desenvolvedores qualificados em plataformas de triagem automatizada (Applicant Tracking Systems — ATS) por ausência de correspondência semântica e falta de métricas quantificáveis.

A plataforma analisa os requisitos da vaga desejada, calcula um índice de correspondência técnica (**ATS Match Score**) segmentado em 3 pilares e reestrutura as realizações profissionais com base no framework **Google XYZ** (*"Alcancei [X], medido por [Y], fazendo [Z]"*), entregando um currículo otimizado com diagramação em coluna única certificada para OCR.

---

## 🏗️ Arquitetura do Sistema

```
┌────────────────────────────────────────────────────────────────────────┐
│                          CAMADA DE INGESTÃO                            │
│    Upload PDF (Validação de Magic Bytes)  │  Colagem de Texto Puro     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                       GATEWAY DE SEGURANÇA                             │
│   • Origin Validation (Sec-Fetch-Site)   • Rate Limiting por IP        │
│   • Sanitização Bidi (Trojan Source)     • Defesa Anti-Prompt Injection│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    MOTOR ALGORÍTMICO DE ANÁLISE                        │
│   • Extração de Requisitos da Vaga       • ATS Scoring (0 a 100%)      │
│   • Mapeamento de Gaps de Palavras-chave • Reescrita STAR/Google XYZ   │
│   • Resiliência Multi-Modelos (Fila de Contingência Ativa)             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                        RENDERIZAÇÃO & SAÍDA                            │
│   • Score Dashboard Interativo           • Visualizador Diff de Impacto│
│   • Currículo A4 Formatado para OCR      • Exportação Gupy / Markdown  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Funcionalidades Chave

### 1. Diagnóstico de Triagem ATS (0 a 100%)
* **Score Ponderado:** Decomposição algorítmica em três pilares fundamentais:
  * **Hard Skills & Stack:** Presença das linguagens, frameworks, bancos e ferramentas mandatórias.
  * **Alinhamento de Escopo:** Coerência entre a senioridade do candidato e as responsabilidades da vaga.
  * **Legibilidade OCR:** Estrutura textual otimizada para os parsers de plataformas como a Gupy.
* **Mapeamento de Gaps:** Identificação clara entre competências detectadas e termos obrigatórios faltantes.

### 2. Otimização Assistida com Salvaguarda Anti-Alucinação
* **Preservação de Fatos:** Regras estritas impedem a criação de cargos fictícios, diplomas inexistentes ou anos de experiência não vivenciados.
* **Framework Google XYZ:** Reformulação de descrições passivas para realizações ancoradas em verbos de ação fortes e métricas de resultado.
* **Diff Interativo ("Antes vs. Depois"):** Interface comparativa estilo Code Review com justificativas de RH sobre o ganho de conversão de cada alteração.

### 3. Diagramação em Coluna Única (ATS Certified Layout)
* Layout limpo, sem elementos flutuantes, tabelas complexas ou gráficos que confundem leitores de triagem.
* **Exportação A4 Nativa:** Estilização `@media print` milimétrica para geração de PDF sem dependência de bibliotecas pesadas no client.
* **Exportação para Gupy:** Botão de cópia rápida formatado para preenchimento de formulários de texto puro.

---

## 🛡️ Blindagem de Segurança & LGPD

Construído sob a metodologia *Defense-in-Depth* (Defesa em Profundidade):

| Camada | Mecanismo de Proteção | Impacto |
| :--- | :--- | :--- |
| **Isolamento de Segredos** | Variáveis estritamente server-side + guarda `assertServerEnvironment()` | **Zero Leakage:** Impossibilidade matemática da chave vazar no bundle client. |
| **Integridade de Transporte** | HSTS (`max-age=63072000; preload`) + CSP Estrito | Força HTTPS, previne SSL-Stripping e bloqueia ataques de XSS e Clickjacking. |
| **Anti-CSRF & Hijacking** | Validação de `Sec-Fetch-Site` e cabeçalhos `Origin` / `Host` | Rejeita requisições cross-site disparadas por scripts externos maliciosos. |
| **Higienização de Entradas** | Filtro de caracteres Unicode Bidi Overrides + Detecção de Injeção | Bloqueia ataques do tipo *Trojan Source* e neutraliza tentativas de prompt injection. |
| **Validação de Arquivos** | Inspeção binária de Magic Bytes (`%PDF-`) + Limite de 5MB | Impede que arquivos maliciosos executáveis sejam renomeados como PDF. |
| **Privacidade & LGPD** | *Zero Retention Policy* + Cabeçalhos `Cache-Control: no-store` | Nenhum currículo é persistido em banco de dados; tráfego estritamente volátil em memória. |

---

## 💻 Stack Tecnológica

* **Core Fullstack:** [Next.js 16](https://nextjs.org/) (App Router, Server Components & Route Handlers)
* **Linguagem:** [TypeScript 5](https://www.typescriptlang.org/) (Tipagem estrita ponta a ponta)
* **Estilização & UI:** [Tailwind CSS v4](https://tailwindcss.com/) com arquitetura *Double-Bezel* e design tokens modernos
* **Ícones & Microinterações:** [Lucide React](https://lucide.dev/)
* **Parser de Documentos:** `unpdf` (Extração em memória sem dependências nativas de C++)
* **Validação de Schemas:** [Zod](https://zod.dev/) (Validação em tempo de compilação e execução)
* **Bundler & Build Tool:** Turbopack

---

## 📂 Estrutura do Projeto

```text
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── optimize/route.ts    # Endpoint de análise com validações de segurança
│   │   │   └── parse-pdf/route.ts   # Upload e extração segura de PDFs
│   │   ├── globals.css              # Design tokens e regras de impressão A4
│   │   ├── layout.tsx               # Metadados, tipografia e ícones vetoriais
│   │   ├── page.tsx                 # View principal do otimizador e dashboard
│   │   └── icon.svg                 # Favicon vetorial oficial
│   ├── components/
│   │   ├── Header.tsx               # Barra de navegação com monitor de status
│   │   ├── InputSection.tsx         # Drag & Drop de arquivo e formulário segmentado
│   │   ├── ScoreDashboard.tsx       # Medidor circular SVG de aderência e tags
│   │   ├── ResumeViewer.tsx         # Folha do currículo para OCR e impressão
│   │   └── DiffViewer.tsx           # Comparador visual Antes vs Depois
│   ├── lib/
│   │   ├── gemini.ts                # Motor de otimização com fallback multi-modelos
│   │   ├── parsers/pdf.ts           # Parser de buffer de PDF com limpeza
│   │   ├── ratelimit.ts             # Limitador de vazão de requisições por IP
│   │   ├── sampleData.ts            # Dataset de teste para desenvolvedores
│   │   └── security/
│   │       ├── request.ts           # Validador de origem e proteção anti-CSRF
│   │       ├── sanitizer.ts         # Higienizador de Bidi e comandos maliciosos
│   │       └── url.ts               # Sanitizador anti-XSS para links externos
│   └── types/
│       └── resume.ts                # Schemas Zod e tipagens TypeScript
├── next.config.ts                   # Cabeçalhos de segurança HTTP (CSP, HSTS)
├── package.json
└── README.md
```

---

## 📄 Licença

Este projeto é distribuído sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais detalhes.

---

<div align="center">
  <sub>Construído com obsessão por performance, segurança e design de engenharia de software.</sub>
</div>
