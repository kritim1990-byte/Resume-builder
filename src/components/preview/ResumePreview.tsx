'use client';

import React, { useState, useRef } from 'react';
import { ResumeData } from '@/types/resume';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { ZoomIn, ZoomOut, RotateCcw, Printer, Download, Loader2 } from 'lucide-react';

interface ResumePreviewProps {
  resume: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const [zoom, setZoom] = useState(100);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 60));
  const handleResetZoom = () => setZoom(100);

  // Native Print
  const handleNativePrint = () => {
    window.print();
  };

  // Export PDF using html2pdf.js
  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    setIsGeneratingPdf(true);

    try {
      // Dynamic import html2pdf.js client side
      const html2pdf = (await import('html2pdf.js')).default;
      const element = previewRef.current;
      const fileName = `${resume.personalInfo.fullName.replaceAll(' ', '_') || 'Resume'}_LPU.pdf`;

      const opt = {
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF export failed, falling back to print dialog:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 print:hidden">
        <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>Zoom: {zoom}%</span>
          <button
            onClick={handleZoomOut}
            type="button"
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomIn}
            type="button"
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            type="button"
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors text-slate-400"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNativePrint}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
            title="Open Print Window"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-all disabled:opacity-50"
            title="Download PDF File"
          >
            {isGeneratingPdf ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>{isGeneratingPdf ? 'Generating...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* A4 Sheet Container */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 flex justify-center items-start print:p-0 print:overflow-visible">
        <div
          className="transition-transform origin-top duration-200 w-full max-w-[800px] print:w-full print:max-w-none print:transform-none"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <div ref={previewRef} id="resume-preview-container" className="print:m-0 print:p-0">
            <TemplateRenderer data={resume} />
          </div>
        </div>
      </div>
    </div>
  );
};
