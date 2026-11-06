import React from "react";
import { ArrowRight, Sparkles, CheckCircle2, HelpCircle } from "lucide-react";

interface Improvement {
  section: string;
  originalSnippet: string;
  improvedSnippet: string;
  rationale: string;
}

interface DiffViewerProps {
  improvements: Improvement[];
}

export function DiffViewer({ improvements }: DiffViewerProps) {
  if (!improvements || improvements.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500">
          Nenhuma alteração específica registrada no comparativo.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-start space-x-2.5">
        <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" />
        <div>
          <span className="font-semibold">Otimização Orientada a Impacto:</span> As melhorias abaixo substituem descrições passivas por realizações com métricas quantificáveis (framework Google XYZ) e garantem que as palavras-chave da vaga sejam detectadas pelos robôs de triagem.
        </div>
      </div>

      <div className="space-y-4">
        {improvements.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                <span>{item.section}</span>
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">
                Alteração #{index + 1}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original */}
              <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center space-x-1">
                  <span>Antes (Original)</span>
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans line-through decoration-red-400/60">
                  {item.originalSnippet}
                </p>
              </div>

              {/* Otimizado */}
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Depois (Otimizado)</span>
                </span>
                <p className="text-xs text-zinc-800 dark:text-zinc-100 leading-relaxed font-sans font-medium">
                  {item.improvedSnippet}
                </p>
              </div>
            </div>

            {/* Rationale / Explicação do Recrutador */}
            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs text-zinc-600 dark:text-zinc-400 flex items-start space-x-2 border border-zinc-100 dark:border-zinc-800">
              <HelpCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-zinc-400" />
              <div>
                <strong className="text-zinc-700 dark:text-zinc-300">Por que funciona: </strong>
                <span>{item.rationale}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
