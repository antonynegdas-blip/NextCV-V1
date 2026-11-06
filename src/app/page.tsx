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
  ArrowDown,
  CheckCircle,
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
        throw new Error(json.error || "Ocorreu uma falha durante a otimização.");
      }

      setResult(json.data);
      setIsDemo(!!json.isDemo);
      setActiveTab("dashboard");

      // Rolagem suave até a área de resultados
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro inesperado ao otimizar.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-emerald-500" />
            <span>Passe pelos filtros da Gupy, Lever e Greenhouse com IA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Seu Currículo Dev Alinhado à Vaga em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Segundos
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Elimine rejeições automáticas. Analisamos os requisitos exatos da vaga de tecnologia, identificamos lacunas de palavras-chave e reescrevemos seus resultados com métricas de alto impacto.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Sem alucinações (anti-fake)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Framework Google XYZ</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>PDF Limpo & ATS Friendly</span>
            </div>
          </div>
        </div>

        {/* Formulário de Entrada */}
        <section>
          <InputSection
            onOptimize={handleOptimize}
            isLoading={isLoading}
            error={error}
          />
        </section>

        {/* Resultados & Otimização */}
        {result && (
          <section ref={resultsRef} className="space-y-6 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-emerald-500" />
                  <span>2. Diagnóstico & Currículo Otimizado</span>
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Alternar entre o diagnóstico de aderência, o currículo final e o comparativo.
                </p>
              </div>

              {/* Seletor de Abas de Resultado */}
              <div className="flex bg-zinc-200/80 dark:bg-zinc-800 p-1 rounded-xl text-xs font-semibold print:hidden">
                <button
                  type="button"
                  onClick={() => setActiveTab("dashboard")}
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg transition ${
                    activeTab === "dashboard"
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-emerald-500" />
                  <span>Match Score & Gaps</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("resume")}
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg transition ${
                    activeTab === "resume"
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <FileCheck className="w-4 h-4 text-teal-500" />
                  <span>Currículo Otimizado</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("diff")}
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg transition ${
                    activeTab === "diff"
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <GitCompare className="w-4 h-4 text-cyan-500" />
                  <span>Antes vs Depois ({result.improvements?.length || 0})</span>
                </button>
              </div>
            </div>

            {/* Conteúdo da Aba Ativa */}
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

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400 print:hidden mt-auto">
        <p>
          DevMatch AI © 2026 — Plataforma de Otimização de Currículos para Tecnologia e Sistemas ATS.
        </p>
      </footer>
    </div>
  );
}
