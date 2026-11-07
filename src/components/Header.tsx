import React from "react";
import { Shield } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-zinc-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-b from-slate-900 to-zinc-950 border border-blue-500/20 shadow-inner overflow-hidden shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 64 64" fill="none">
              <path d="M32 15L17 47h7.5l3.5-7.5h8l3.5 7.5H47L32 15zm-2 19l2-5.5 2 5.5h-4z" fill="#60a5fa"/>
              <path d="M49 13c0 3-2 5-5 5 3 0 5 2 5 5 0-3 2-5 5-5-3 0-5-2-5-5z" fill="#38bdf8"/>
            </svg>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-500 animate-ping opacity-75" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white">
                Astra<span className="text-blue-400">CV</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                PRO ATS
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 hidden sm:block tracking-tight">
              Otimizador de Perfil Tech para Triagem Automatizada
            </span>
          </div>
        </div>

        {/* Status / Guarantees */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/5 text-xs text-zinc-300">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-zinc-400">Privacidade:</span>
            <span className="font-medium text-zinc-200">Anti-Vazamento & LGPD</span>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-zinc-900/80 border border-white/5 text-[11px] sm:text-xs font-mono text-zinc-300 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-zinc-400 hidden sm:inline">Algoritmo:</span>
            <span className="font-medium text-blue-400">
              <span className="hidden sm:inline">Neural Matcher </span>v2.4
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
