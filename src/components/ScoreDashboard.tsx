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
  TrendingUp,
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

  const getScoreTheme = (score: number) => {
    if (score >= 80) {
      return {
        text: "text-emerald-400",
        stroke: "#34d399",
        bg: "from-emerald-500/10 to-teal-500/5",
        border: "border-emerald-500/30",
        label: "Alta Probabilidade de Triagem",
      };
    }
    if (score >= 60) {
      return {
        text: "text-amber-400",
        stroke: "#fbbf24",
        bg: "from-amber-500/10 to-orange-500/5",
        border: "border-amber-500/30",
        label: "Aderência Moderada (Ajustes Recomendados)",
      };
    }
    return {
      text: "text-rose-400",
      stroke: "#fb7185",
      bg: "from-rose-500/10 to-red-500/5",
      border: "border-rose-500/30",
      label: "Baixa Aderência (Gaps Estruturais)",
    };
  };

  const theme = getScoreTheme(atsScore);
  const strokeDashoffset = 283 - (283 * atsScore) / 100;

  return (
    <div className="space-y-6">
      {/* Aviso Modo Demonstração (Sem citar IA ou chaves) */}
      {isDemo && (
        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10 text-xs text-zinc-300 flex items-start space-x-3 backdrop-blur-md">
          <div className="p-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold text-white">Visualização Ativa:</span>{" "}
            <span>
              Exibindo diagnóstico completo gerado pelo motor de correspondência algorítmica.
            </span>
          </div>
        </div>
      )}

      {/* Grid Superior: Score Circular Principal + 3 Pilares */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Card do Score Geral */}
        <div className="lg:col-span-4 bg-zinc-900/80 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center space-x-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Score Geral de Triagem</span>
          </div>

          {/* SVG Circular Progress Meter */}
          <div className="relative w-36 h-36 flex items-center justify-center my-1">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-zinc-800"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke={theme.stroke}
                strokeWidth="7"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-4xl font-extrabold tracking-tight ${theme.text}`}>
                {atsScore}
                <span className="text-xl font-medium text-zinc-400">%</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
                ATS Index
              </span>
            </div>
          </div>

          <div className="mt-4 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-300">
            {theme.label}
          </div>
        </div>

        {/* 3 Métricas Detalhadas */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-semibold text-zinc-300">Hard Skills & Stack</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="my-4">
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold text-white">
                  {scoreBreakdown.hardSkillsScore}
                </span>
                <span className="text-sm text-zinc-400">%</span>
              </div>
              <div className="w-full bg-zinc-800/80 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${scoreBreakdown.hardSkillsScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Correspondência das linguagens, frameworks e bancos solicitados.
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-semibold text-zinc-300">Senioridade & Escopo</span>
              <Layers className="w-4 h-4 text-teal-400" />
            </div>
            <div className="my-4">
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold text-white">
                  {scoreBreakdown.experienceAlignmentScore}
                </span>
                <span className="text-sm text-zinc-400">%</span>
              </div>
              <div className="w-full bg-zinc-800/80 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-teal-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${scoreBreakdown.experienceAlignmentScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Equivalência das responsabilidades e tempo de experiência exigido.
            </p>
          </div>

          <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-semibold text-zinc-300">Legibilidade ATS</span>
              <FileCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="my-4">
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-extrabold text-white">
                  {scoreBreakdown.atsClarityScore}
                </span>
                <span className="text-sm text-zinc-400">%</span>
              </div>
              <div className="w-full bg-zinc-800/80 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-cyan-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${scoreBreakdown.atsClarityScore}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Clareza para robôs de OCR e presença de métricas de impacto.
            </p>
          </div>
        </div>
      </div>

      {/* Palavras-chave: Correspondentes vs Ausentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                Palavras-chave Identificadas
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              {matchedKeywords.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {matchedKeywords.map((kw, i) => (
              <span
                key={i}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{kw}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                Gaps de Palavras-chave na Vaga
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              {missingKeywords.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {missingKeywords.map((kw, i) => (
              <span
                key={i}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{kw}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas Críticos e Dicas Técnicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {criticalAlerts.length > 0 && (
          <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center space-x-2 pb-3 border-b border-white/[0.06] text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-xs font-semibold uppercase tracking-wider">
                Pontos de Atenção na Triagem
              </h3>
            </div>
            <ul className="mt-4 space-y-3">
              {criticalAlerts.map((alert, i) => (
                <li
                  key={i}
                  className="text-xs text-zinc-300 flex items-start space-x-2.5 leading-relaxed"
                >
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span>{alert}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {actionableTips.length > 0 && (
          <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-xl">
            <div className="flex items-center space-x-2 pb-3 border-b border-white/[0.06] text-teal-400">
              <Lightbulb className="w-4 h-4" />
              <h3 className="text-xs font-semibold uppercase tracking-wider">
                Estratégia para Entrevista Técnica
              </h3>
            </div>
            <ul className="mt-4 space-y-3">
              {actionableTips.map((tip, i) => (
                <li
                  key={i}
                  className="text-xs text-zinc-300 flex items-start space-x-2.5 leading-relaxed"
                >
                  <span className="text-teal-400 font-bold mt-0.5">•</span>
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
