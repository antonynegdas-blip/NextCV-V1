import React from "react";
import {
  OptimizationResult,
} from "@/types/resume";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  FileCheck,
} from "lucide-react";

interface ScoreDashboardProps {
  result: OptimizationResult;
  isDemo?: boolean;
}

export function ScoreDashboard({ result, isDemo }: ScoreDashboardProps) {
  const {
    atsScore,
    scoreBreakdown,
    matchedKeywords,
    missingKeywords,
    criticalAlerts,
    actionableTips,
  } = result;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20";
    if (score >= 60) return "text-amber-500 border-amber-500 bg-amber-50/50 dark:bg-amber-950/20";
    return "text-red-500 border-red-500 bg-red-50/50 dark:bg-red-950/20";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Altíssima Aderência (Forte candidato à triagem)";
    if (score >= 70) return "Boa Aderência (Com as otimizações, passa na triagem)";
    if (score >= 50) return "Aderência Mediana (Exige inclusão das palavras-chave faltantes)";
    return "Baixa Aderência (Requisitos da vaga muito distantes da stack atual)";
  };

  return (
    <div className="space-y-6">
      {isDemo && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-sm flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" />
          <div>
            <p className="font-semibold">Modo Demonstração Ativo</p>
            <p className="text-xs mt-0.5">
              Nenhuma chave <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded font-mono">GEMINI_API_KEY</code> foi informada no arquivo <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded font-mono">.env.local</code>. Exibindo análise simulada completa para demonstrar o visual e a funcionalidade.
            </p>
          </div>
        </div>
      )}

      {/* Grid Superior: Score Geral e Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card Principal: Score Geral */}
        <div className="md:col-span-1 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center justify-center text-center shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            ATS Match Score
          </span>

          <div
            className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center ${getScoreColor(
              atsScore
            )} shadow-inner`}
          >
            <span className="text-3xl font-extrabold tracking-tight">
              {atsScore}%
            </span>
            <span className="text-[10px] font-medium uppercase text-zinc-500">
              Gupy & ATS
            </span>
          </div>

          <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-3 leading-snug">
            {getScoreLabel(atsScore)}
          </p>
        </div>

        {/* Breakdown de 3 Pilares */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Hard Skills & Stack
              </span>
              <Cpu className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="my-3">
              <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                {scoreBreakdown.hardSkillsScore}%
              </span>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${scoreBreakdown.hardSkillsScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500">
              Presença de linguagens, frameworks e bancos exigidos.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Alinhamento de Experiência
              </span>
              <Layers className="w-4 h-4 text-teal-500" />
            </div>
            <div className="my-3">
              <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                {scoreBreakdown.experienceAlignmentScore}%
              </span>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-teal-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${scoreBreakdown.experienceAlignmentScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500">
              Senioridade, responsabilidades e domínio do setor.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Clareza & Formatação ATS
              </span>
              <FileCheck className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="my-3">
              <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                {scoreBreakdown.atsClarityScore}%
              </span>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${scoreBreakdown.atsClarityScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500">
              Legibilidade por OCR/parsers e métricas de impacto.
            </p>
          </div>
        </div>
      </div>

      {/* Palavras-chave: Encontradas vs Faltantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs">
          <div className="flex items-center space-x-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Palavras-chave Encontradas ({matchedKeywords.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {matchedKeywords.length > 0 ? (
              matchedKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>{kw}</span>
                </span>
              ))
            ) : (
              <span className="text-xs text-zinc-400">Nenhuma palavra-chave correspondente detectada.</span>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs">
          <div className="flex items-center space-x-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <XCircle className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              Palavras-chave Ausentes na Triagem ({missingKeywords.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {missingKeywords.length > 0 ? (
              missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{kw}</span>
                </span>
              ))
            ) : (
              <span className="text-xs text-emerald-500 font-medium">Todas as palavras-chave essenciais estão cobertas!</span>
            )}
          </div>
        </div>
      </div>

      {/* Alertas Críticos e Dicas de Entrevista */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {criticalAlerts.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs">
            <div className="flex items-center space-x-2 pb-3 border-b border-zinc-100 dark:border-zinc-800 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-sm font-semibold">Alertas de Triagem (Gupy / ATS)</h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {criticalAlerts.map((alert, i) => (
                <li
                  key={i}
                  className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start space-x-2 leading-relaxed"
                >
                  <span className="text-red-500 font-bold">•</span>
                  <span>{alert}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {actionableTips.length > 0 && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs">
            <div className="flex items-center space-x-2 pb-3 border-b border-zinc-100 dark:border-zinc-800 text-teal-600 dark:text-teal-400">
              <Lightbulb className="w-4 h-4" />
              <h3 className="text-sm font-semibold">Dicas Estratégicas para Entrevista</h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {actionableTips.map((tip, i) => (
                <li
                  key={i}
                  className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start space-x-2 leading-relaxed"
                >
                  <span className="text-teal-500 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
