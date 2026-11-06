import React from "react";
import { Sparkles, Terminal, ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
                DevMatch<span className="text-emerald-500">.ai</span>
              </span>
              <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Tech BR
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">
              Otimizador de Currículos Dev & Tech para Gupy e Sistemas ATS
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-medium text-zinc-600 dark:text-zinc-300">
          <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Anti-Alucinação & LGPD Ready</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>Powered by Gemini</span>
          </div>
        </div>
      </div>
    </header>
  );
}
