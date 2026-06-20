"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Play, RefreshCw } from "lucide-react";

type Stage = {
  id: number;
  label: string;
  sub: string;
  status: "idle" | "running" | "success" | "failed";
};

const INITIAL_STAGES: Stage[] = [
  { id: 0, label: "Code Lint", sub: "linting & types check", status: "idle" },
  { id: 1, label: "Unit Tests", sub: "junit test runner", status: "idle" },
  { id: 2, label: "Docker Build", sub: "container image compile", status: "idle" },
  { id: 3, label: "AWS ASG Deploy", sub: "canary target swap", status: "idle" },
  { id: 4, label: "Health Check", sub: "prometheus check", status: "idle" },
];

export default function PipelineVisualizer() {
  const [stages, setStages] = useState<Stage[]>(INITIAL_STAGES);
  const [pipelineActive, setPipelineActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const runPipeline = useCallback(async () => {
    if (pipelineActive) return;
    setPipelineActive(true);
    setStages(INITIAL_STAGES.map(s => ({ ...s, status: "idle" })));

    for (let i = 0; i < INITIAL_STAGES.length; i++) {
      // 1. Set current stage to running
      setStages(prev =>
        prev.map((s, idx) => (idx === i ? { ...s, status: "running" } : s))
      );

      // Simulate step duration
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 2. Set current stage to success
      setStages(prev =>
        prev.map((s, idx) => (idx === i ? { ...s, status: "success" } : s))
      );
    }
    setPipelineActive(false);
  }, [pipelineActive]);

  useEffect(() => {
    if (isInView) {
      runPipeline();
    }
  }, [isInView, runPipeline]);

  return (
    <div
      ref={containerRef}
      className="glass-card w-full p-8 md:p-10 rounded-[2rem] border border-white/5 bg-[#121212]/30 backdrop-blur-md flex flex-col md:flex-row items-center gap-6 justify-between overflow-hidden relative"
    >
      {/* Background glow lines */}
      <div className="absolute top-0 right-0 w-80 h-32 bg-indigo-500/5 blur-3xl pointer-events-none rounded-full" />
      
      {/* Header section (2.5 columns width equivalent) */}
      <div className="flex flex-col gap-3 flex-shrink-0 text-left w-full md:w-auto md:max-w-xs border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-10">
        <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase">Automation Pipeline</span>
        <h3 className="text-xl font-bold tracking-tight">Active Deployment Run</h3>
        <p className="text-xs text-gray-500 font-light leading-relaxed">
          Simulated live validation of your workspace push. Stages execute tests, builds, and pushes.
        </p>
        <button
          onClick={runPipeline}
          disabled={pipelineActive}
          className="mt-4 flex items-center justify-center gap-2 self-start px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 disabled:opacity-50 text-indigo-300 text-xs font-semibold rounded-lg border border-indigo-500/20 hover:border-indigo-500/40 transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          {pipelineActive ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Trigger Pipeline</span>
            </>
          )}
        </button>
      </div>

      {/* Pipeline timeline layout */}
      <div className="flex flex-col md:flex-row flex-1 items-start md:items-center justify-between w-full gap-8 md:gap-4 md:pl-6">
        {stages.map((stage, idx) => {
          const isRunning = stage.status === "running";
          const isSuccess = stage.status === "success";

          return (
            <div key={stage.id} className="flex flex-row md:flex-col items-center gap-4 md:gap-3 flex-1 relative w-full">
              {/* Connector line (rendered behind nodes on desktop) */}
              {idx < stages.length - 1 && (
                <div className="absolute left-[15px] top-[30px] w-0.5 h-[50px] md:left-[55%] md:top-[16px] md:w-[90%] md:h-0.5 bg-white/5 z-0">
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-indigo-500 to-emerald-500 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isSuccess ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}

              {/* Status Circle Node */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                    isSuccess
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : isRunning
                      ? "bg-indigo-500/10 border-indigo-500 text-indigo-400"
                      : "bg-[#181818] border-white/10 text-gray-600"
                  }`}
                  animate={isRunning ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  {isSuccess ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isRunning ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                  ) : (
                    <span className="text-[10px] font-mono font-semibold">{idx + 1}</span>
                  )}
                </motion.div>
                
                {isRunning && (
                  <span className="absolute -inset-1 rounded-full border border-indigo-500/30 animate-ping pointer-events-none" />
                )}
              </div>

              {/* Text Info */}
              <div className="flex flex-col text-left md:text-center">
                <span
                  className={`text-xs font-semibold transition-colors ${
                    isSuccess
                      ? "text-emerald-400"
                      : isRunning
                      ? "text-indigo-300"
                      : "text-gray-500"
                  }`}
                >
                  {stage.label}
                </span>
                <span className="text-[9px] font-mono text-gray-600 mt-0.5 tracking-tight uppercase">
                  {isRunning ? "Running..." : isSuccess ? "Success ✓" : stage.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
