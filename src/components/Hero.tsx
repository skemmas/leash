import { ArrowDown, Terminal, Lock } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="border-b border-[#D5D1C3] pb-10 pt-4">
      {/* Top Meta Line */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-[#D5D1C3]/80 text-[11px] font-mono text-[#575B52]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D65A31]" />
          <span className="uppercase tracking-wider font-semibold text-[#20231F]">
            LEASH CONTROL PANEL
          </span>
          <span className="text-[#7A7F73]">/</span>
          <span>AUTONOMOUS AGENT BOUNDARY PROTOCOL</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#697255] font-semibold">REVISION 1.0</span>
          <span>100% CLIENT EVALUATION</span>
        </div>
      </div>

      <div className="max-w-3xl space-y-4">
        {/* Core Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#20231F] leading-tight">
          Your agent. Your rules.
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-[#575B52] leading-relaxed">
          Define permissions. Set spending limits. Export readable and machine-validated rules for any autonomous agent harness.
        </p>

        <p className="text-xs sm:text-sm text-[#575B52] leading-relaxed max-w-2xl">
          As AI agents execute bash tools, inspect local files, and call network endpoints, operators need unambiguous, structured guardrails. LEASH generates portable Markdown and JSON specifications in seconds.
        </p>

        {/* Action Controls & Telemetry */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href="#builder"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#D65A31] text-[#FFFFFF] text-xs font-semibold hover:bg-[#C04A22] transition-colors shadow-sm"
          >
            <span>Configure Permissions</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <a
            href="#checker"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#FFFFFF] border border-[#D5D1C3] text-[#20231F] text-xs font-semibold hover:bg-[#EBE8DE] transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-[#697255]" />
            <span>Validate Existing Instructions</span>
          </a>

          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#7A7F73] ml-2">
            <Lock className="w-3 h-3 text-[#697255]" />
            <span>Zero telemetry · Runs offline</span>
          </div>
        </div>
      </div>
    </section>
  );
};
