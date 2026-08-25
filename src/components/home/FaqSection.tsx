/**
 * ==============================================================================
 * 📌 FAQ ACCORDION SECTION
 * ==============================================================================
 * 💡 WHAT IS THIS FILE?
 * Expandable FAQ questions addressing escrow security, payouts, creator vetting,
 * and API integration.
 * ==============================================================================
 */

"use client";

import { useState } from "react";
import { Sparkles, ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the automated milestone escrow work?",
    answer:
      "When an enterprise client creates a project, funds for each agreed-upon milestone are deposited into a secure escrow account. The creator begins work with 100% confidence. Once deliverables are reviewed and approved by the client, funds are immediately unlocked for creator withdrawal.",
  },
  {
    question: "How fast do creators receive their bank payouts?",
    answer:
      "Standard payouts are processed via direct ACH / SEPA / wire transfer within 24 to 48 business hours. Growth and Enterprise tier creators can enable instant same-day bank routing with 0% extra processing fees.",
  },
  {
    question: "How are creators vetted before joining the directory?",
    answer:
      "All creators undergo an identity check, portfolio review, and deliverable quality assessment by our creative curation board before their profile is marked as 'Verified' in the platform directory.",
  },
  {
    question: "Can I connect my existing backend API to this starter pack?",
    answer:
      "Yes! DevHub is built with Redux Toolkit and RTK Query. Setting your backend endpoint in `.env` (`NEXT_PUBLIC_BASE_URL=http://localhost:5000/api/v1`) instantly connects all dashboard and authentication modules to your database.",
  },
  {
    question: "What happens if there is a dispute regarding deliverables?",
    answer:
      "Our built-in arbitration system allows either party to pause milestone release. Dedicated escrow officers review revision logs, deliverable files, and chat messages to reach a fair, binding resolution within 48 hours.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-4 border border-indigo-100">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our milestone escrow, creator payouts, and agency tooling.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-800 hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-3 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
