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
  FileCode,
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
      setUploadError("Por favor, selecione um arquivo no formato PDF (.pdf).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("O arquivo PDF excede o tamanho máximo de 5MB.");
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
      setActiveResumeTab("text"); // Muda para a visualização do texto extraído para conferência
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

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800/80">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
            1. Dados de Entrada para Análise
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Forneça o seu currículo atual e a vaga de TI que você deseja conquistar.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Preencher com Exemplo Dev</span>
          </button>
          {(resumeText || jobDescription) && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 px-2 py-1 transition"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/80 flex items-start space-x-3 text-red-800 dark:text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Atenção</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna 1: Currículo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Seu Currículo</span>
              </label>

              {/* Seletor de Abas de Entrada */}
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveResumeTab("text")}
                  className={`px-2.5 py-1 rounded-md transition ${
                    activeResumeTab === "text"
                      ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-xs font-semibold"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  Texto
                </button>
                <button
                  type="button"
                  onClick={() => setActiveResumeTab("pdf")}
                  className={`px-2.5 py-1 rounded-md transition ${
                    activeResumeTab === "pdf"
                      ? "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white shadow-xs font-semibold"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  Upload PDF
                </button>
              </div>
            </div>

            {activeResumeTab === "pdf" ? (
              <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-8 text-center bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition">
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
                  className="cursor-pointer flex flex-col items-center justify-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    {isUploading ? (
                      <RefreshCw className="w-6 h-6 animate-spin" />
                    ) : (
                      <Upload className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      {isUploading
                        ? "Processando e extraindo texto do PDF..."
                        : "Clique para selecionar o PDF do currículo"}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      PDF selecionável (até 5MB)
                    </p>
                  </div>
                </label>

                {uploadError && (
                  <p className="mt-3 text-xs text-red-600 dark:text-red-400 font-medium">
                    {uploadError}
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-1.5">
                {uploadedFileName && (
                  <div className="flex items-center space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium pb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Texto extraído do arquivo: {uploadedFileName}</span>
                  </div>
                )}
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Cole aqui o texto do seu currículo atual (Resumo, Experiências, Formação, Tech Stack)..."
                  className="w-full h-80 p-4 text-sm font-mono rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition resize-none leading-relaxed"
                />
                <div className="flex justify-between text-xs text-zinc-400 px-1">
                  <span>Mínimo 50 caracteres</span>
                  <span>{resumeText.length} caracteres</span>
                </div>
              </div>
            )}
          </div>

          {/* Coluna 2: Descrição da Vaga */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Descrição da Vaga Desejada</span>
              </label>
              <span className="text-xs text-zinc-500">Cole os requisitos da vaga</span>
            </div>

            <div className="space-y-1.5">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Cole aqui a descrição completa da vaga (requisitos técnicos, diferenciais, responsabilidades da posição)..."
                className="w-full h-80 p-4 text-sm font-sans rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition resize-none leading-relaxed"
              />
              <div className="flex justify-between text-xs text-zinc-400 px-1">
                <span>Mínimo 30 caracteres</span>
                <span>{jobDescription.length} caracteres</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Ação Principal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md">
            🔒 Seus dados são processados de forma sigilosa e nunca são compartilhados ou usados para treinar IAs públicas.
          </p>

          <button
            type="submit"
            disabled={
              isLoading ||
              resumeText.trim().length < 50 ||
              jobDescription.trim().length < 30
            }
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-98"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Analisando ATS & Otimizando com IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Otimizar Currículo para a Vaga</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
