import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
        'Yes. The Permission Builder, policy exports, and deterministic validator run entirely client-side in the browser. No wallet, no subscription, and no fees are required to define or export policies.',
    },
    {
      question: 'How does enforcement work? Does LEASH directly intercept my agent?',
      answer:
        'LEASH generates unambiguous, standardized operational guidelines for system prompts and structured JSON schemas for runtime harnesses. While clear instructions directly constrain language model reasoning, physical runtime containment (such as blocking network sockets or file writes) depends on your execution platform, container sandbox, or proxy layer. LEASH makes your boundaries explicit so the agent knows what requires human approval.',
    },
    {
      question: 'Is any prompt or code transmitted to external servers?',
      answer:
        'No. Zero data is transmitted. All parsing, evaluation, formatting, and draft saving occur 100% locally in your browser memory (and localStorage). There are no tracking scripts, analytics cookies, or backend database calls.',
    },
    {
      question: `What is the distinction between the tool and the ${tokenConfig.ticker} token?`,
      answer:
        `The LEASH policy tool is a functional developer utility available to everyone. The ${tokenConfig.ticker} token is an experimental Solana community coin. You do not need to hold or purchase the token to use the builder, validator, or export tools. In future phases, token verification will be used for cloud workspace synchronization and community template registries.`,
    },
    {
      question: 'Which agent frameworks support these exported policies?',
      answer:
        'The output follows standard Markdown (ideal for AGENTS.md, CLAUDE.md, .cursorrules, system prompts) and documented JSON schemas. They are compatible with Cursor, Claude Code, Cline, Windsurf, AutoGPT, LangChain, LangGraph, and custom Python or TypeScript agent harnesses.',
    },
    {
      question: 'Why are credentials and spending blocked by default?',
      answer:
        'Unbounded autonomous agents most commonly cause harm through accidental API consumption or leaked credentials (.env variables, private keys). Defaulting these to "Blocked" ensures a secure-by-default posture until an operator deliberately relaxes constraints.',
    },
  ];

  return (
    <section id="faq" className="border-b border-[#D5D1C3] py-10 scroll-mt-6">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 pb-3 border-b border-[#D5D1C3]">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A7F73] font-semibold">
            Inquiries
          </div>
          <h2 className="text-2xl font-bold text-[#20231F] mt-1">
            Frequently Answered Questions
          </h2>
        </div>
        <span className="text-xs font-mono text-[#575B52] mt-1 sm:mt-0">
          Architecture & Privacy
        </span>
      </div>

      {/* Restrained Expandable Text (Not rounded cards!) */}
      <div className="divide-y divide-[#D5D1C3] border-y border-[#D5D1C3]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="py-4">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left flex items-center justify-between gap-4 focus:outline-none group"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-sm text-[#20231F] group-hover:text-[#D65A31] transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#7A7F73] transition-transform duration-150 flex-shrink-0 ${
                    isOpen ? 'transform rotate-180 text-[#D65A31]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-2.5 text-xs text-[#575B52] leading-relaxed max-w-3xl font-sans">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
