import { z } from "zod";

// --- Schema do Currículo ---
export const ResumeSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  headline: z.string().describe("Título profissional, ex: Desenvolvedor Full Stack Sênior | Node.js, React"),
  email: z.string().optional().default(""),
  phone: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  linkedinUrl: z.string().optional().or(z.literal("")),
  githubUrl: z.string().optional().or(z.literal("")),
  portfolioUrl: z.string().optional().or(z.literal("")),
  summary: z.string().describe("Resumo profissional focado em valor e impacto"),
  skills: z.object({
    technical: z.array(z.string()).describe("Linguagens, frameworks, bancos de dados, cloud"),
    domain: z.array(z.string()).describe("Metodologias ágeis, arquitetura, boas práticas, segurança"),
    tools: z.array(z.string()).describe("Ferramentas como Docker, Git, CI/CD, Jira"),
  }),
  experiences: z.array(
    z.object({
      company: z.string(),
      role: z.string(),
      period: z.string().describe("Ex: Jan 2022 - Atual"),
      location: z.string().optional().or(z.literal("")),
      technologies: z.array(z.string()).optional().default([]),
      bullets: z.array(z.string()).describe("Lista de realizações e responsabilidades com métricas de impacto"),
    })
  ),
  education: z.array(
    z.object({
      degree: z.string().describe("Ex: Bacharelado em Ciência da Computação"),
      institution: z.string(),
      year: z.string(),
    })
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      technologies: z.array(z.string()),
      url: z.string().optional().or(z.literal("")),
    })
  ).optional().default([]),
});

export type ResumeData = z.infer<typeof ResumeSchema>;

// --- Schema da Vaga ---
export const JobAnalysisSchema = z.object({
  roleTitle: z.string(),
  seniority: z.string().describe("Júnior, Pleno, Sênior, Especialista ou Tech Lead"),
  requiredSkills: z.array(z.string()).describe("Hard skills obrigatórias"),
  desiredSkills: z.array(z.string()).describe("Diferenciais / Nice to have"),
  responsibilities: z.array(z.string()).describe("Principais atribuições"),
  cultureKeywords: z.array(z.string()).describe("Palavras-chave de cultura e soft skills"),
});

export type JobAnalysis = z.infer<typeof JobAnalysisSchema>;

// --- Schema do Resultado da Otimização ---
export const OptimizationResultSchema = z.object({
  atsScore: z.number().min(0).max(100).describe("Pontuação geral de aderência ATS de 0 a 100"),
  scoreBreakdown: z.object({
    hardSkillsScore: z.number().min(0).max(100),
    experienceAlignmentScore: z.number().min(0).max(100),
    atsClarityScore: z.number().min(0).max(100),
  }),
  matchedKeywords: z.array(z.string()).describe("Palavras-chave da vaga que já constam no currículo"),
  missingKeywords: z.array(z.string()).describe("Palavras-chave essenciais da vaga que estão faltando"),
  criticalAlerts: z.array(z.string()).describe("Alertas críticos de triagem (ex: tempo de experiência, ausência de stack principal)"),
  actionableTips: z.array(z.string()).describe("Dicas práticas para o candidato se destacar na entrevista"),
  optimizedResume: ResumeSchema,
  improvements: z.array(
    z.object({
      section: z.string().describe("Seção alterada (ex: Resumo, Experiência na Empresa X)"),
      originalSnippet: z.string().describe("Trecho original"),
      improvedSnippet: z.string().describe("Novo trecho otimizado com método STAR/XYZ"),
      rationale: z.string().describe("Por que essa mudança aumenta a chance de aprovação"),
    })
  ),
});

export type OptimizationResult = z.infer<typeof OptimizationResultSchema>;

