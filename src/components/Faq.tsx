import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { tokenConfig } from '../config/tokenConfig';

interface FaqItem {
  question: string;
  answer: string;
}

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'Is LEASH free to use?',
      answer:
        'Yes, 100% free. The Agent Permission Builder, Markdown/JSON export tools, and deterministic Policy Checker run entirely in your local browser without requiring a wallet, subscription, API key, or account.',
    },
    {
      question: 'How does enforcement work? Does LEASH directly stop my agent?',
      answer:
        'LEASH standardizes and generates readable boundary instructions and structured schemas. However, instruction-level prompts guide the model; physical runtime enforcement depends on your agent framework, execution harness (e.g. sandbox container, OS user permissions, or proxy middleware). LEASH helps you formulate tight, unambiguous guardrails so models know what is forbidden.',
    },
    {
      question: 'Is my agent prompt or data transmitted to your servers?',
      answer:
        'No. Zero data is transmitted. All parsing, policy generation, prompt analysis, and localStorage drafts happen 100% locally in your browser memory. We have no backend analytics, tracking pixels, or data collection servers.',
    },
    {
      question: `What is the distinction between the tool and the ${tokenConfig.ticker} token?`,
      answer:
        `The LEASH policy tool is an open community developer utility. The ${tokenConfig.ticker} token is an experimental Solana community coin. You do not need to buy or hold ${tokenConfig.ticker} to use any of the existing builder or checker features. In future phases, token holders may access remote cloud workspace synchronization and community template registries.`,
    },
    {
      question: 'Which AI agent platforms are compatible with exported policies?',
      answer:
        'LEASH produces clean Markdown (ideal for AGENTS.md, CLAUDE.md, .cursorrules, system prompts) and documented JSON schemas. While compatible with any modern prompt-driven framework (Cursor, Claude Code, Cline, Windsurf, AutoGPT, LangChain, custom LangGraph harnesses), we do not claim universal native plugin execution on proprietary platforms.',
    },
    {
      question: 'Why are credentials and spending blocked by default?',
      answer:
        'Autonomous agent failures most frequently result in leaked API tokens or unexpected API consumption. By defaulting credentials and financial actions to "Blocked", LEASH enforces a defense-in-depth posture before an operator intentionally loosens permissions.',
    },
  ];

  return (
    <section id="faq" className="py-24 border-t border-slate-900 bg-[#080a0e] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-lime-400/10 text-lime-400 border border-lime-400/20 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Clear answers, zero hype.
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Everything you need to know about our privacy architecture, enforcement boundaries, and token role.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl bg-[#0f131a] border border-slate-800 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-lime-400"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-white pr-2">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-lime-400 border-lime-500/30' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-400 leading-relaxed border-t border-slate-850 font-sans">
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
};
