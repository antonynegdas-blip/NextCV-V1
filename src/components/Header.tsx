import React from "react";
import { Terminal, Shield, Zap, CheckCircle2 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-zinc-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900 border border-white/10 shadow-inner overflow-hidden">
            <svg className="w-5 h-5" viewBox="0 0 64 64" fill="none">
              <path d="M17 45V19h6.5l12.5 17.5V19h6V45h-6.5L23 27.5V45H17z" fill="#34d399"/>
              <path d="M44 26l5 6-5 6" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-white">
                Next<span className="text-emerald-400">CV</span>
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PRO ATS
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 hidden sm:block tracking-tight">
              Otimizador de Perfil Tech para Triagem Automatizada
            </span>
          </div>
        </div>

        {/* Status / Guarantees */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/5 text-xs text-zinc-300">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-zinc-400">Privacidade:</span>
            <span className="font-medium text-zinc-200">Anti-Vazamento & LGPD</span>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/5 text-xs font-mono text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-zinc-400">Algoritmo:</span>
            <span className="font-medium text-emerald-400">Neural Matcher v2.4</span>
          </div>
        </div>
      </div>
    </header>
  );
}
