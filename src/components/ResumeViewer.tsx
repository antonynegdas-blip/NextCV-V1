"use client";

import React, { useState } from "react";
import {
  ResumeData,
} from "@/types/resume";
import {
  Copy,
  Printer,
  Check,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

interface ResumeViewerProps {
  resume: ResumeData;
}

export function ResumeViewer({ resume }: ResumeViewerProps) {
  const [copiedType, setCopiedType] = useState<"markdown" | "text" | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdown = () => {
    let md = `# ${resume.fullName}\n`;
    md += `**${resume.headline}**\n\n`;
    md += `${resume.location || ""} | ${resume.email || ""} | ${resume.phone || ""}\n`;
    if (resume.linkedinUrl) md += `LinkedIn: ${resume.linkedinUrl} | `;
    if (resume.githubUrl) md += `GitHub: ${resume.githubUrl} | `;
    if (resume.portfolioUrl) md += `Portfolio: ${resume.portfolioUrl}`;
    md += `\n\n---\n\n`;

    md += `## RESUMO PROFISSIONAL\n${resume.summary}\n\n`;

    md += `## COMPETÊNCIAS TÉCNICAS\n`;
    if (resume.skills.technical?.length) {
      md += `- **Linguagens & Tecnologias:** ${resume.skills.technical.join(", ")}\n`;
    }
    if (resume.skills.domain?.length) {
      md += `- **Metodologias & Práticas:** ${resume.skills.domain.join(", ")}\n`;
    }
    if (resume.skills.tools?.length) {
      md += `- **Ferramentas:** ${resume.skills.tools.join(", ")}\n`;
    }
    md += `\n`;

    md += `## EXPERIÊNCIA PROFISSIONAL\n`;
    resume.experiences.forEach((exp) => {
      md += `### ${exp.role} — ${exp.company}\n`;
      md += `*${exp.period}${exp.location ? ` | ${exp.location}` : ""}*\n`;
      if (exp.technologies?.length) {
        md += `*Tech Stack: ${exp.technologies.join(", ")}*\n`;
      }
      exp.bullets.forEach((b) => {
        md += `- ${b}\n`;
      });
      md += `\n`;
    });

    if (resume.education?.length) {
      md += `## FORMAÇÃO ACADÊMICA\n`;
      resume.education.forEach((edu) => {
        md += `- **${edu.degree}** — ${edu.institution} (${edu.year})\n`;
      });
      md += `\n`;
    }

    if (resume.projects?.length) {
      md += `## PROJETOS EM DESTAQUE\n`;
      resume.projects.forEach((proj) => {
        md += `### ${proj.name}${proj.url ? ` (${proj.url})` : ""}\n`;
        md += `${proj.description}\n`;
        if (proj.technologies?.length) {
          md += `*Tecnologias: ${proj.technologies.join(", ")}*\n`;
        }
        md += `\n`;
      });
    }

    return md;
  };

  const handleCopy = (type: "markdown" | "text") => {
    const text = generateMarkdown();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Barra de Ações (Oculta na Impressão) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700/80 print:hidden">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
            Formato 100% Compatível com ATS (Gupy, Workday, Lever)
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => handleCopy("text")}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
          >
            {copiedType === "text" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-500" />
                <span>Copiar Texto (Gupy)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleCopy("markdown")}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
          >
            {copiedType === "markdown" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-500" />
                <span>Copiar Markdown</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Salvar PDF</span>
          </button>
        </div>
      </div>

      {/* Folha do Currículo (Estilizada para tela e perfeita para impressão) */}
      <div
        id="resume-sheet"
        className="bg-white text-zinc-900 p-8 sm:p-12 rounded-2xl border border-zinc-200 shadow-sm font-sans max-w-4xl mx-auto print:border-none print:shadow-none print:p-0 print:max-w-none"
      >
        {/* Cabeçalho */}
        <header className="border-b border-zinc-200 pb-5 mb-5 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 uppercase">
            {resume.fullName}
          </h1>
          <p className="text-sm font-semibold text-zinc-700 mt-1 tracking-wide">
            {resume.headline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-xs text-zinc-600">
            {resume.location && (
              <span className="inline-flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-zinc-400" />
                <span>{resume.location}</span>
              </span>
            )}
            {resume.email && (
              <span className="inline-flex items-center space-x-1">
                <Mail className="w-3 h-3 text-zinc-400" />
                <span>{resume.email}</span>
              </span>
            )}
            {resume.phone && (
              <span className="inline-flex items-center space-x-1">
                <Phone className="w-3 h-3 text-zinc-400" />
                <span>{resume.phone}</span>
              </span>
            )}
            {resume.linkedinUrl && (
              <a
                href={resume.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-emerald-700 hover:underline"
              >
                <LinkedinIcon className="w-3 h-3" />
                <span>LinkedIn</span>
              </a>
            )}
            {resume.githubUrl && (
              <a
                href={resume.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-emerald-700 hover:underline"
              >
                <GithubIcon className="w-3 h-3" />
                <span>GitHub</span>
              </a>
            )}
            {resume.portfolioUrl && (
              <a
                href={resume.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-emerald-700 hover:underline"
              >
                <Globe className="w-3 h-3" />
                <span>Portfólio</span>
              </a>
            )}
          </div>
        </header>

        {/* Resumo Profissional */}
        {resume.summary && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2">
              Resumo Profissional
            </h2>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed text-justify">
              {resume.summary}
            </p>
          </section>
        )}

        {/* Habilidades Técnicas */}
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2">
            Competências Técnicas
          </h2>
          <div className="space-y-1.5 text-xs sm:text-sm">
            {resume.skills.technical?.length > 0 && (
              <div>
                <strong className="text-zinc-800">Linguagens & Tecnologias: </strong>
                <span className="text-zinc-700">
                  {resume.skills.technical.join(" • ")}
                </span>
              </div>
            )}
            {resume.skills.domain?.length > 0 && (
              <div>
                <strong className="text-zinc-800">Práticas & Metodologias: </strong>
                <span className="text-zinc-700">
                  {resume.skills.domain.join(" • ")}
                </span>
              </div>
            )}
            {resume.skills.tools?.length > 0 && (
              <div>
                <strong className="text-zinc-800">Ferramentas & DevOps: </strong>
                <span className="text-zinc-700">
                  {resume.skills.tools.join(" • ")}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Experiências Profissionais */}
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-3">
            Experiência Profissional
          </h2>

          <div className="space-y-4">
            {resume.experiences.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
                  <div className="font-bold text-zinc-900">
                    {exp.role} <span className="font-normal text-zinc-600">| {exp.company}</span>
                  </div>
                  <div className="text-xs text-zinc-500 font-medium">
                    {exp.period} {exp.location ? `• ${exp.location}` : ""}
                  </div>
                </div>

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="text-[11px] text-zinc-500 italic pb-0.5">
                    Tech Stack: {exp.technologies.join(", ")}
                  </div>
                )}

                <ul className="list-disc list-outside pl-4 space-y-1 text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projetos em Destaque */}
        {resume.projects && resume.projects.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-3">
              Projetos em Destaque
            </h2>

            <div className="space-y-3">
              {resume.projects.map((proj, idx) => (
                <div key={idx} className="text-xs sm:text-sm">
                  <div className="flex items-center space-x-2 font-bold text-zinc-900">
                    <span>{proj.name}</span>
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 hover:underline font-normal inline-flex items-center text-[11px]"
                      >
                        <ExternalLink className="w-2.5 h-2.5 ml-1" />
                      </a>
                    )}
                  </div>
                  <p className="text-zinc-700 mt-0.5">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[11px] text-zinc-500 italic mt-0.5">
                      Tecnologias: {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Formação Acadêmica */}
        {resume.education && resume.education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 mb-2">
              Formação Acadêmica
            </h2>

            <div className="space-y-1 text-xs sm:text-sm">
              {resume.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between">
                  <div>
                    <strong className="text-zinc-800">{edu.degree}</strong> —{" "}
                    <span className="text-zinc-700">{edu.institution}</span>
                  </div>
                  <span className="text-xs text-zinc-500">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
