"use client";

import { DEMO_FAQS } from "@/constants/demoData";
import { LifeBuoy, ChevronDown } from "lucide-react";

interface FaqAccordionProps {
  openFaq: number | null;
  onToggleFaq: (index: number) => void;
}

export default function FaqAccordion({ openFaq, onToggleFaq }: FaqAccordionProps) {
  return (
    <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <LifeBuoy className="w-5 h-5 text-indigo-600" />
        <h2 className="text-base font-bold text-slate-800">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="divide-y divide-slate-100">
        {DEMO_FAQS.map((faq, index) => {
          const isOpen = openFaq === index;
          return (
            <div key={index} className="py-3.5">
              <button
                type="button"
                onClick={() => onToggleFaq(index)}
                className="w-full flex justify-between items-center text-left gap-4 py-1 cursor-pointer"
              >
                <span className="text-xs font-bold text-slate-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <p className="text-xs text-slate-500 leading-relaxed mt-2 pt-1 pl-1">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
