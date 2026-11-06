"use client";

import React, { useState, useRef } from "react";
import {
  FileText,
  Upload,
  Briefcase,
  Sparkles,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Code2,
  FileUp,
  X,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { SAMPLE_RESUME, SAMPLE_JOB } from "@/lib/sampleData";

interface InputSectionProps {
  onOptimize: (resumeText: string, jobDescription: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function InputSection({
  onOptimize,
  isLoading,
  error,
}: InputSectionProps) {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [activeResumeTab, setActiveResumeTab] = useState<"text" | "pdf">("text");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setUploadError("Por favor, selecione um arquivo em formato PDF (.pdf).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("O arquivo PDF excede o limite de 5MB.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Falha ao extrair texto do PDF.");
      }

      setResumeText(data.text);
      setUploadedFileName(file.name);
      setActiveResumeTab("text");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro no upload do arquivo.";
      setUploadError(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleLoadSample = () => {
    setResumeText(SAMPLE_RESUME);
    setJobDescription(SAMPLE_JOB);
    setUploadedFileName(null);
    setUploadError(null);
  };

  const handleClear = () => {
    setResumeText("");
    setJobDescription("");
    setUploadedFileName(null);
    setUploadError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim() || !jobDescription.trim()) return;
    onOptimize(resumeText, jobDescription);
  };

  const isReady = resumeText.trim().length >= 50 && jobDescription.trim().length >= 30;

  return (
    <div className="relative group">
      {/* Outer ambient glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-blue-500/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-75 transition duration-1000 -z-10" />

      {/* Outer Double-Bezel Shell */}
      <div className="bg-zinc-900/90 border border-white/10 rounded-[2.2rem] p-2 sm:p-3 shadow-2xl backdrop-blur-2xl">
        <div className="bg-zinc-950/90 border border-white/[0.06] rounded-[1.8rem] p-6 sm:p-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.07]">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center justify-center font-bold">
                  01
                </span>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Parâmetros de Calibração
                </h2>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Forneça o currículo original e a especificação da vaga para processamento algorítmico.
              </p>
            </div>

            <div className="flex items-center space-x-2.5">
              <button
                type="button"
                onClick={handleLoadSample}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/[0.05] hover:bg-white/[0.09] text-zinc-200 border border-white/10 hover:border-emerald-500/40 transition cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Carregar Exemplo Dev</span>
              </button>
              {(resumeText || jobDescription) && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition cursor-pointer"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>

          {/* Feedback de Erro */}
          {error && (
            <div className="mt-5 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start space-x-3 text-red-200 text-xs">
              <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-300">Falha na Análise</p>
                <p className="mt-0.5 text-red-200/90">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: Currículo */}
              <div className="flex flex-col space-y-3 bg-zinc-900/60 border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-zinc-200">
                      Currículo Original
                    </span>
                  </div>

                  {/* Tabs */}
                  <div className="flex bg-black/40 p-1 rounded-xl border border-white/[0.06] text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setActiveResumeTab("text")}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        activeResumeTab === "text"
                          ? "bg-zinc-800 text-white font-semibold shadow-xs"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Texto
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveResumeTab("pdf")}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        activeResumeTab === "pdf"
                          ? "bg-zinc-800 text-white font-semibold shadow-xs"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      PDF
                    </button>
                  </div>
                </div>

                {activeResumeTab === "pdf" ? (
                  <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl p-8 text-center bg-black/20 hover:bg-black/30 hover:border-emerald-500/30 transition min-h-[280px]">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".pdf,application/pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="pdf-upload"
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-3 w-full"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-zinc-800/90 border border-white/10 flex items-center justify-center text-emerald-400 shadow-inner">
                        {isUploading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <FileUp className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">
                          {isUploading
                            ? "Extraindo conteúdo do PDF..."
                            : "Arraste ou clique para selecionar seu PDF"}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          Suporta arquivos de até 5MB
                        </p>
                      </div>
                    </label>

                    {uploadError && (
                      <p className="mt-3 text-xs text-red-400 font-medium">
                        {uploadError}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col space-y-2">
                    {uploadedFileName && (
                      <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                        <div className="flex items-center space-x-1.5 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">Arquivo: {uploadedFileName}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setUploadedFileName(null)}
                          className="hover:text-emerald-300 ml-2"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    <textarea
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Cole o conteúdo do seu currículo profissional atual (Resumo, Histórico de Empresas, Formação, Stacks)..."
                      className="w-full h-72 p-4 text-xs font-mono rounded-xl border border-white/[0.08] bg-black/40 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/60 focus:border-emerald-500/60 transition resize-none leading-relaxed"
                    />
                    <div className="flex justify-between items-center text-[11px] text-zinc-500 px-1">
                      <span>Mínimo 50 caracteres</span>
                      <span className="font-mono">{resumeText.length} caracteres</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card 2: Vaga Alvo */}
              <div className="flex flex-col space-y-3 bg-zinc-900/60 border border-white/[0.06] rounded-2xl p-5 hover:border-white/10 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-teal-400" />
                    <span className="text-sm font-semibold text-zinc-200">
                      Descrição da Vaga
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-medium">
                    Requisitos & Atribuições
                  </span>
                </div>

                <div className="flex-1 flex flex-col space-y-2">
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Cole a descrição completa da vaga técnica (requisitos obrigatórios, diferenciais, stacks e responsabilidades)..."
                    className="w-full h-72 p-4 text-xs font-sans rounded-xl border border-white/[0.08] bg-black/40 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-teal-500/60 focus:border-teal-500/60 transition resize-none leading-relaxed"
                  />
                  <div className="flex justify-between items-center text-[11px] text-zinc-500 px-1">
                    <span>Mínimo 30 caracteres</span>
                    <span className="font-mono">{jobDescription.length} caracteres</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ação Principal */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.07]">
              <div className="text-xs text-zinc-400 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Otimização para ATS de triagem técnica (Gupy, Greenhouse, Lever, Workday)</span>
              </div>

              <button
                type="submit"
                disabled={isLoading || !isReady}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-xl font-medium text-sm text-zinc-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:brightness-110 shadow-lg shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition transform active:scale-[0.99] cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" />
                    <span className="font-semibold">Calculando Aderência & Otimizando...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-zinc-950" />
                    <span className="font-semibold">Analisar & Otimizar para Vaga</span>
                    <ArrowRight className="w-4 h-4 text-zinc-950 ml-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
