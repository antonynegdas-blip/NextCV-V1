import React from "react";
import { Sparkles, CheckCircle2, ChevronRight, HelpCircle, GitCommit } from "lucide-react";

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
      <div className="p-12 text-center bg-zinc-900/60 rounded-2xl border border-white/10">
        <p className="text-xs text-zinc-400">
          Nenhuma alteração pontual registrada para exibição.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-xs text-emerald-300 flex items-start space-x-3 backdrop-blur-md">
        <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
        <div className="leading-relaxed">
          <span className="font-semibold text-white">Metodologia de Calibração:</span> As reformulações abaixo aplicam o framework de impacto quantificável (*"Alcancei [X], medido por [Y], fazendo [Z]"*), garantindo que os termos exigidos pela vaga sejam capturados pelos filtros sem criar declarações falsas.
        </div>
      </div>

      <div className="space-y-4">
        {improvements.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900/80 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-xl space-y-4"
          >
            {/* Header da Alteração */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <GitCommit className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-zinc-200">
                  {item.section}
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">
                Ponto #{index + 1}
              </span>
            </div>

            {/* Split Diff */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original */}
              <div className="p-4 rounded-xl bg-rose-500/[0.06] border border-rose-500/20 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>Original (Baixo Impacto)</span>
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed line-through decoration-rose-500/40">
                  {item.originalSnippet}
                </p>
              </div>

              {/* Otimizado */}
              <div className="p-4 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/30 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Calibrado para ATS</span>
                </span>
                <p className="text-xs text-zinc-100 leading-relaxed font-medium">
                  {item.improvedSnippet}
                </p>
              </div>
            </div>

            {/* Justificativa de RH / Triagem */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs text-zinc-300 flex items-start space-x-2.5">
              <HelpCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-zinc-400" />
              <div className="leading-relaxed">
                <strong className="text-zinc-200">Impacto na Triagem: </strong>
                <span className="text-zinc-400">{item.rationale}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
