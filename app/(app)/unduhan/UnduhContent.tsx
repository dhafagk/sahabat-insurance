"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  FileText,
  Download,
  ExternalLink,
  FileCheck,
} from "lucide-react";
import EmailGateModal from "./EmailGateModal";

export interface DownloadItem {
  name: string;
  type: "pdf" | "link";
  size?: string | null;
  file?: { url?: string | null; filesize?: number | null } | null;
  href?: string | null;
}

export interface AccordionSection {
  id: string;
  category: string;
  title: string;
  description?: string | null;
  items: DownloadItem[];
}

interface GateTarget {
  fileName: string;
  fileUrl: string;
}

interface AccordionItemProps {
  section: AccordionSection;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  requireEmailGate: boolean;
  unduhanlId?: string;
  onGate: (target: GateTarget) => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function resolveHref(item: DownloadItem): string {
  if (typeof item.file === "object" && item.file?.url) return item.file.url;
  return item.href ?? "#";
}

function resolveSize(item: DownloadItem): string | null {
  if (item.size) return item.size;
  if (typeof item.file === "object" && item.file?.filesize) {
    return formatBytes(item.file.filesize);
  }
  return null;
}

function AccordionItem({
  section,
  isOpen,
  onToggle,
  index,
  requireEmailGate,
  onGate,
}: AccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`bg-card rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-navy shadow-lg shadow-navy/8"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start sm:items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-inset rounded-2xl"
        aria-expanded={isOpen}
      >
        <div className="flex items-start sm:items-center gap-4 min-w-0">
          <div
            className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
              isOpen ? "bg-navy" : "bg-navy/8"
            }`}
          >
            <FileCheck
              size={18}
              className={isOpen ? "text-white" : "text-navy"}
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                {section.category}
              </span>
            </div>
            <h3 className="font-semibold text-text-primary text-base leading-snug">
              {section.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 pt-1 sm:pt-0">
          <span className="hidden sm:block text-xs text-text-muted">
            {section.items.length} file
          </span>
          <div
            className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? "border-navy bg-navy text-white"
                : "border-slate-200 text-text-muted"
            }`}
          >
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 pb-6">
              <div className="h-px bg-slate-100 mb-4" aria-hidden="true" />
              {section.description && (
                <p className="text-sm text-text-muted mb-5 leading-relaxed">
                  {section.description}
                </p>
              )}

              <ul className="flex flex-col gap-2">
                {section.items.map((item, i) => {
                  const href = resolveHref(item);
                  const size = resolveSize(item);
                  const isPdf = item.type === "pdf";
                  const gated = isPdf && requireEmailGate;

                  if (gated) {
                    return (
                      <li key={i}>
                        <button
                          type="button"
                          onClick={() =>
                            onGate({ fileName: item.name, fileUrl: href })
                          }
                          className="group w-full flex items-center gap-4 px-4 py-3 rounded-xl border border-slate-100 hover:border-navy/30 hover:bg-navy/3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy text-left"
                        >
                          <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-navy/8 flex items-center justify-center transition-colors duration-200">
                            <FileText
                              size={15}
                              className="text-navy"
                              aria-hidden="true"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary group-hover:text-navy truncate transition-colors duration-200">
                              {item.name}
                            </p>
                            {size && (
                              <p className="text-xs text-text-muted mt-0.5">
                                PDF · {size}
                              </p>
                            )}
                          </div>

                          <div className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-navy/20 text-navy group-hover:bg-navy group-hover:text-white group-hover:border-navy transition-all duration-200">
                            <Download size={11} aria-hidden="true" />
                            Unduh
                          </div>
                        </button>
                      </li>
                    );
                  }

                  return (
                    <li key={i}>
                      <a
                        href={href}
                        download={isPdf ? true : undefined}
                        target={!isPdf ? "_blank" : undefined}
                        rel={!isPdf ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-4 px-4 py-3 rounded-xl border border-slate-100 hover:border-navy/30 hover:bg-navy/3 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                      >
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-navy/8 flex items-center justify-center transition-colors duration-200">
                          {isPdf ? (
                            <FileText
                              size={15}
                              className="text-navy"
                              aria-hidden="true"
                            />
                          ) : (
                            <ExternalLink
                              size={15}
                              className="text-accent"
                              aria-hidden="true"
                            />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary group-hover:text-navy truncate transition-colors duration-200">
                            {item.name}
                          </p>
                          {size && (
                            <p className="text-xs text-text-muted mt-0.5">
                              PDF · {size}
                            </p>
                          )}
                          {!isPdf && !size && (
                            <p className="text-xs text-text-muted mt-0.5">
                              Tautan
                            </p>
                          )}
                        </div>

                        <div
                          className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                            isPdf
                              ? "border-navy/20 text-navy group-hover:bg-navy group-hover:text-white group-hover:border-navy"
                              : "border-accent/20 text-accent group-hover:bg-accent group-hover:text-white group-hover:border-accent"
                          }`}
                        >
                          {isPdf ? (
                            <>
                              <Download size={11} aria-hidden="true" />
                              Unduh
                            </>
                          ) : (
                            <>
                              <ExternalLink size={11} aria-hidden="true" />
                              Buka
                            </>
                          )}
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface UnduhContentProps {
  sections: AccordionSection[];
  requireEmailGate?: boolean;
  unduhanlId?: string;
}

export default function UnduhContent({
  sections,
  requireEmailGate = false,
  unduhanlId,
}: UnduhContentProps) {
  const [openId, setOpenId] = useState<string | null>(sections[0]?.id ?? null);
  const [gateTarget, setGateTarget] = useState<GateTarget | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <>
      <div className="flex flex-col gap-3">
        {sections.map((section, index) => (
          <AccordionItem
            key={section.id}
            section={section}
            isOpen={openId === section.id}
            onToggle={() => toggle(section.id)}
            index={index}
            requireEmailGate={requireEmailGate}
            unduhanlId={unduhanlId}
            onGate={setGateTarget}
          />
        ))}
      </div>

      {gateTarget && (
        <EmailGateModal
          fileName={gateTarget.fileName}
          fileUrl={gateTarget.fileUrl}
          unduhanlId={unduhanlId}
          onClose={() => setGateTarget(null)}
        />
      )}
    </>
  );
}
