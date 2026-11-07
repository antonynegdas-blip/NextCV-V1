"use client";

import React, { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { InputSection } from "@/components/InputSection";
import { ScoreDashboard } from "@/components/ScoreDashboard";
import { ResumeViewer } from "@/components/ResumeViewer";
import { DiffViewer } from "@/components/DiffViewer";
import { OptimizationResult } from "@/types/resume";
import {
  BarChart3,
  FileCheck,
  GitCompare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Zap,
} from "lucide-react";

export default function Home() {
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "resume" | "diff">(
    "dashboard"
  );

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleOptimize = async (resumeText: string, jobDescription: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Ocorreu uma falha durante o processamento.");
      }

      setResult(json.data);
      setIsDemo(!!json.isDemo);
      setActiveTab("dashboard");

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro inesperado ao processar.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-blue-500/25 selection:text-blue-200">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 space-y-10 sm:space-y-14">
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 text-[11px] sm:text-xs font-mono backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
            <span className="text-blue-400 font-semibold">Engine de Triagem ATS</span>
            <span className="text-zinc-500">•</span>
            <span className="hidden sm:inline">Gupy, Lever, Greenhouse & Workday</span>
            <span className="sm:hidden text-zinc-400">Gupy & ATS</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] sm:leading-[1.1]">
            Currículo de Tecnologia Calibrado para{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-400">
              Passar na Triagem
            </span>
          </h1>

          <p className="text-xs sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Elimine o descarte automático de candidaturas. Identifique com precisão matemática as palavras-chave ausentes da vaga e reestruture realizações com base no framework de impacto quantificável.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-2 text-[11px] sm:text-xs text-zinc-400">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Sem alucinações de dados</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Framework Google XYZ</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Layout limpo para OCR</span>
            </div>
          </div>
        </div>

        {/* Etapa 1: Ingestão de Dados */}
        <section>
          <InputSection
            onOptimize={handleOptimize}
            isLoading={isLoading}
            error={error}
          />
        </section>

        {/* Etapa 2: Diagnóstico & Currículo Otimizado */}
        {result && (
          <section ref={resultsRef} className="space-y-6 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-white/[0.07]">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center font-bold shrink-0">
                    02
                  </span>
                  <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
                    Diagnóstico de Triagem & Otimização
                  </h2>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Navegue entre as métricas de compatibilidade, o currículo gerado e as alterações sugeridas.
                </p>
              </div>

              {/* Segmented Control de Abas */}
              <div className="flex bg-black/40 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-white/10 text-xs font-medium print:hidden overflow-x-auto no-scrollbar w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("dashboard")}
                  className={`inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 min-h-[38px] rounded-lg sm:rounded-xl transition cursor-pointer whitespace-nowrap shrink-0 flex-1 sm:flex-none ${
                    activeTab === "dashboard"
                      ? "bg-zinc-800 text-white font-semibold shadow-inner"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Score & Gaps</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("resume")}
                  className={`inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 min-h-[38px] rounded-lg sm:rounded-xl transition cursor-pointer whitespace-nowrap shrink-0 flex-1 sm:flex-none ${
                    activeTab === "resume"
                      ? "bg-zinc-800 text-white font-semibold shadow-inner"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <FileCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Currículo Calibrado</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("diff")}
                  className={`inline-flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 min-h-[38px] rounded-lg sm:rounded-xl transition cursor-pointer whitespace-nowrap shrink-0 flex-1 sm:flex-none ${
                    activeTab === "diff"
                      ? "bg-zinc-800 text-white font-semibold shadow-inner"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <GitCompare className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Antes vs Depois ({result.improvements?.length || 0})</span>
                </button>
              </div>
            </div>

            {/* Conteúdo Dinâmico */}
            <div>
              {activeTab === "dashboard" && (
                <ScoreDashboard result={result} isDemo={isDemo} />
              )}
              {activeTab === "resume" && (
                <ResumeViewer resume={result.optimizedResume} />
              )}
              {activeTab === "diff" && (
                <DiffViewer improvements={result.improvements} />
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-white/[0.06] py-8 text-center text-xs text-zinc-500 print:hidden mt-auto">
        <p>
          AstraCV — Engenharia de Perfil Técnico para Sistemas ATS e Processos Seletivos.
        </p>
      </footer>
    </div>
  );
}
