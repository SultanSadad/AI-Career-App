"use client";

import React, { useState } from "react";
import { Sparkles, Check, ArrowRight, RefreshCw, X, AlertCircle } from "lucide-react";
import { improveExperienceWithAI } from "@/app/actions/ai-career";

interface AiExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: string;
  company: string;
  currentDescription: string;
  onApply: (improvedText: string) => void;
}

export function AiExperienceModal({
  isOpen,
  onClose,
  position,
  company,
  currentDescription,
  onApply,
}: AiExperienceModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    improvedBullets: string[];
    formattedText: string;
    keyChangesSummary: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    const res = await improveExperienceWithAI({
      position,
      company,
      currentDescription,
    });

    if (res.success && res.data) {
      setResult(res.data);
    } else {
      setError(res.error || "Gagal mengoptimasi deskripsi dengan AI.");
    }
    setLoading(false);
  };

  const handleAccept = () => {
    if (result?.formattedText) {
      onApply(result.formattedText);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-neutral-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-yellow-400/20 text-neutral-900 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-neutral-900" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">AI Experience Enhancer</h3>
              <p className="text-xs text-neutral-500 font-medium">
                {position || "Role"} • {company || "Company"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-600 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Content Comparison */}
        {!result && !loading && (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Deskripsi Saat Ini
            </label>
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 leading-relaxed font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
              {currentDescription || "Belum ada deskripsi. Tulis draf singkat di form terlebih dahulu."}
            </div>
            <p className="text-xs text-neutral-500">
              AI akan menyusun ulang kalimat di atas menjadi bullet point berstandar Google XYZ & ATS dengan metrik terukur.
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center space-y-3 text-center">
            <RefreshCw className="w-8 h-8 text-neutral-900 animate-spin" />
            <p className="text-xs font-semibold text-neutral-800">Menyusun bullet point berstandar ATS...</p>
            <p className="text-[11px] text-neutral-500">Mengoptimalkan action verbs & metrik dampak kerja</p>
          </div>
        )}

        {/* Result Comparison */}
        {result && !loading && (
          <div className="space-y-4">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-neutral-800 font-medium">
              💡 {result.keyChangesSummary}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Hasil Rekomendasi AI
              </label>
              <div className="p-3.5 bg-neutral-900 text-neutral-100 rounded-xl text-xs leading-relaxed space-y-1.5 max-h-60 overflow-y-auto font-sans">
                {result.improvedBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold">•</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            Batal
          </button>

          {!result ? (
            <button
              type="button"
              disabled={loading || !currentDescription?.trim()}
              onClick={handleGenerate}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Generate Enhancements
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Coba Lagi
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-yellow-400 text-neutral-950 hover:bg-yellow-300 transition-all shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                Terapkan ke CV
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}