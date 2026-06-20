"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, Shield, RefreshCw, Volume2, VolumeX } from "lucide-react";

type Theme = "matrix" | "cyberpunk" | "ocean" | "classic";

type LineLog = {
  text: string;
  type: "input" | "system" | "success" | "error" | "output";
};


export default function DevOpsTerminal() {
  const [theme, setTheme] = useState<Theme>("matrix");
  const [input, setInput] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-sound-enabled");
    if (saved === "true") {
      setTimeout(() => setSoundEnabled(true), 0);
    }
  }, []);
  const [history, setHistory] = useState<LineLog[]>([
    { text: "Lakshay Rewani DevOps Engine v1.0.4 - Initialized.", type: "system" },
    { text: "Type 'help' to view all available commands.", type: "system" },
  ]);

  const [isDeploying, setIsDeploying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const playAudio = (freq = 600, type = "sine", duration = 0.04) => {
    if (typeof window === "undefined" || !localStorage.getItem("portfolio-sound-enabled")) {
      const saved = localStorage.getItem("portfolio-sound-enabled");
      if (saved !== "true") return;
    } else if (!soundEnabled) {
      return;
    }
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;
      const ctx = new AudioCtxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type as OscillatorType;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignored
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    localStorage.setItem("portfolio-sound-enabled", nextVal ? "true" : "false");
    
    // Play sound dynamically inside this scope so we bypass initial state mismatch
    if (nextVal) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          gain.gain.setValueAtTime(0.015, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        }
      } catch {
        // Ignored
      }
    }
  };

  // Auto scroll to bottom of terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    const newHistory = [...history, { text: `lakshay@devops-cluster:~$ ${trimmed}`, type: "input" as const }];
    
    // Play command execution sound
    if (command === "clear") {
      playAudio(500, "sine", 0.05);
    } else if (["help", "about", "skills", "projects", "deploy", "theme"].includes(command)) {
      playAudio(750, "sine", 0.05);
    } else {
      playAudio(180, "triangle", 0.15); // buzz for invalid command
    }

    if (command === "clear") {
      setHistory([]);
      return;
    }

    if (command === "help") {
      setHistory([
        ...newHistory,
        { text: "Available commands:", type: "system" },
        { text: "  about       - Display professional summary & background", type: "output" },
        { text: "  skills      - List categorized technical skill sets", type: "output" },
        { text: "  projects    - Print all portfolio projects & descriptions", type: "output" },
        { text: "  deploy      - Simulate a full Kubernetes CI/CD deployment run", type: "output" },
        { text: "  theme <t>   - Change terminal theme (matrix, cyberpunk, ocean, classic)", type: "output" },
        { text: "  clear       - Clear console screens and logs", type: "output" },
      ]);
      return;
    }

    if (command === "about") {
      setHistory([
        ...newHistory,
        { text: "PROFESSIONAL PROFILE:", type: "system" },
        { text: "Name: Lakshay Rewani", type: "output" },
        { text: "Role: DevOps Engineer (Fresher) & AI/Data Science Student", type: "output" },
        { text: "CGPA: 9.11 / 10 | Location: Jaipur, India", type: "output" },
        { text: "Summary: Proficient in automating CI/CD pipelines (Jenkins, GitHub Webhooks, Docker, Docker Compose), cloud infrastructure design (AWS EC2, ASG, ALB, CloudWatch), Linux system administration (RHCSA Certified, RHEL 9/Ubuntu), and web server operations (Nginx, Apache).", type: "output" },
      ]);
      return;
    }

    if (command === "skills") {
      setHistory([
        ...newHistory,
        { text: "TECHNICAL SKILLS ARCHITECTURE:", type: "system" },
        { text: "  [Cloud & Infrastructure]  AWS EC2, ASG, ALB, Target Groups, CloudWatch, OpenShift", type: "output" },
        { text: "  [CI/CD & IaC]             Jenkins, GitHub Webhooks, Docker, Docker Compose, Ansible, Terraform", type: "output" },
        { text: "  [Languages]               Python, Java, SQL, Bash, HTML, CSS, C, C++", type: "output" },
        { text: "  [Databases & OS]          MySQL, PostgreSQL, MongoDB, Linux RHEL 9, Ubuntu, Nginx, Apache", type: "output" },
      ]);
      return;
    }

    if (command === "projects") {
      setHistory([
        ...newHistory,
        { text: "PORTFOLIO PROJECTS INDEX:", type: "system" },
        { text: "  1. Automated Multi-Server CI/CD Pipeline - Jenkins, Docker Compose, AWS EC2", type: "output" },
        { text: "  2. Automated Static Website Deployment - Jenkins, GitHub Webhooks, Nginx", type: "output" },
        { text: "  3. Highly Available Static Website - Auto Scaling Groups & ALB on AWS", type: "output" },
        { text: "  4. BloodMate - Blood Bank Management (JavaFX, JDBC, MySQL, Maven)", type: "output" },
        { text: "  5. Hospital Management System - Core Java desktop GUI App with full SQL integration", type: "output" },
        { text: "  6. WordPress Deployment on AWS EC2 - Production-grade LAMP stack with SSH hardening", type: "output" },
      ]);
      return;
    }

    if (command === "theme") {
      const selected = arg.toLowerCase() as Theme;
      if (["matrix", "cyberpunk", "ocean", "classic"].includes(selected)) {
        setTheme(selected);
        setHistory([
          ...newHistory,
          { text: `Theme successfully changed to: ${selected}`, type: "success" },
        ]);
      } else {
        setHistory([
          ...newHistory,
          { text: "Error: Invalid theme name. Choose from 'matrix', 'cyberpunk', 'ocean', or 'classic'.", type: "error" },
        ]);
      }
      return;
    }

    if (command === "deploy") {
      if (isDeploying) return;
      setIsDeploying(true);
      setHistory(newHistory);
      
      const deploymentSteps = [
        { text: "Initializing Kubernetes deployment pipeline...", type: "system" as const },
        { text: "Verifying credentials... RHCSA authentication success.", type: "success" as const },
        { text: "Pulling Docker image: lakshayrewani/portfolio-app:latest", type: "output" as const },
        { text: "Image pulled: SHA256 matches build cache. size: 284MB", type: "success" as const },
        { text: "Applying manifests: deployments, services, hpa, ingress...", type: "output" as const },
        { text: "Creating resources in namespace: devopswithlakshay", type: "system" as const },
        { text: "deployment.apps/portfolio-app created", type: "success" as const },
        { text: "service/portfolio-service created", type: "success" as const },
        { text: "ingress.networking.k8s.io/portfolio-ingress created", type: "success" as const },
        { text: "Checking pod readiness gates... (1/2 pods ready)", type: "output" as const },
        { text: "Checking pod readiness gates... (2/2 pods ready)", type: "output" as const },
        { text: "Ingress controller routing verified. Uptime monitoring connected.", type: "success" as const },
        { text: "DEPLOYMENT SUCCESSFULLY RENDERED at http://devopswithlakshay.online !", type: "success" as const },
      ];

      // Sequential logs spawning
      let i = 0;
      const runLogSpawning = () => {
        if (i < deploymentSteps.length) {
          setHistory(prev => [...prev, deploymentSteps[i]]);
          // Play diagnostic beep with increasing pitch
          playAudio(700 + i * 40, "sine", 0.05);
          i++;
          setTimeout(runLogSpawning, 450);
        } else {
          setIsDeploying(false);
          // Play success chime
          setTimeout(() => {
            playAudio(1200, "sine", 0.06);
            setTimeout(() => playAudio(1500, "sine", 0.08), 80);
          }, 200);
        }
      };
      
      runLogSpawning();
      return;
    }

    // Invalid command fallback
    setHistory([
      ...newHistory,
      { text: `bash: command not found: ${command}. Type 'help' for suggestions.`, type: "error" },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isDeploying) {
      handleCommand(input);
      setInput("");
    }
  };

  // Get theme colors
  const getThemeClasses = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          bg: "bg-[#1a0f2b]/95 border-[#f43f5e]/30 shadow-[0_0_20px_rgba(244,63,94,0.15)]",
          text: "text-[#f43f5e] font-mono",
          input: "text-[#38bdf8] caret-[#f43f5e]",
          system: "text-[#a855f7]",
          success: "text-[#10b981]",
          error: "text-red-400 font-bold",
          output: "text-[#38bdf8]",
          terminalIcon: "text-[#f43f5e]"
        };
      case "ocean":
        return {
          bg: "bg-[#0b192c]/95 border-[#00d8ff]/30 shadow-[0_0_20px_rgba(0,216,255,0.15)]",
          text: "text-[#00d8ff] font-mono",
          input: "text-white caret-[#00d8ff]",
          system: "text-[#38bdf8] opacity-75",
          success: "text-[#10b981]",
          error: "text-rose-400 font-bold",
          output: "text-[#e0f2fe]",
          terminalIcon: "text-[#00d8ff]"
        };
      case "classic":
        return {
          bg: "bg-[#18181b]/95 border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]",
          text: "text-white font-mono",
          input: "text-gray-300 caret-white",
          system: "text-gray-500",
          success: "text-green-400",
          error: "text-red-400 font-bold",
          output: "text-gray-200",
          terminalIcon: "text-white"
        };
      case "matrix":
      default:
        return {
          bg: "bg-[#050b05]/95 border-emerald-500/20 shadow-[0_0_25px_rgba(16,185,129,0.15)]",
          text: "text-emerald-400 font-mono",
          input: "text-emerald-300 caret-emerald-400",
          system: "text-emerald-700",
          success: "text-emerald-400 font-bold",
          error: "text-rose-500 font-bold animate-pulse",
          output: "text-emerald-500",
          terminalIcon: "text-emerald-500"
        };
    }
  };

  const currentTheme = getThemeClasses();

  return (
    <section id="terminal" className="bg-[#0a0a0a] text-white py-32 px-4 md:px-12 relative z-20 border-b border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* Title */}
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">CLI Command Center</span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">DevOps Console</h2>
          <p className="text-gray-400 text-lg md:text-2xl max-w-2xl font-light">
            Interactive terminal core. Query my experiences, skills, projects, or trigger a full deployment pipeline directly.
          </p>
        </div>

        {/* Terminal Frame */}
        <div
          onClick={focusInput}
          className={`w-full max-w-4xl mx-auto rounded-2xl border flex flex-col h-[520px] overflow-hidden transition-all duration-500 ${currentTheme.bg}`}
        >
          {/* Header Bar */}
          <div className="h-12 bg-white/[0.02] border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className={`w-4 h-4 ${currentTheme.terminalIcon}`} />
              <span className={`text-xs font-mono tracking-tight ${currentTheme.system}`}>
                devops@lakshay-rewani-cluster:~
              </span>
            </div>
            
            {/* Control buttons & Mute Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSound}
                className="text-gray-500 hover:text-[#818cf8] hover:scale-105 transition-all cursor-pointer flex items-center justify-center p-1"
                title={soundEnabled && mounted ? "Mute Console Audio" : "Unmute Console Audio"}
              >
                {soundEnabled && mounted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50" />
              </div>
            </div>
          </div>

          {/* Body Log Container */}
          <div
            ref={scrollRef}
            className="flex-1 p-6 overflow-y-auto flex flex-col gap-2.5 text-left text-xs leading-relaxed select-text"
          >
            {history.map((log, index) => {
              let colorClass = currentTheme.output;
              if (log.type === "input") colorClass = currentTheme.text;
              else if (log.type === "system") colorClass = currentTheme.system;
              else if (log.type === "success") colorClass = currentTheme.success;
              else if (log.type === "error") colorClass = currentTheme.error;

              return (
                <div key={index} className={`${colorClass} whitespace-pre-wrap`}>
                  {log.text}
                </div>
              );
            })}

            {isDeploying && (
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Deploying cluster resources...</span>
              </div>
            )}
          </div>

          {/* Prompt line */}
          <div className="h-14 bg-white/[0.01] border-t border-white/5 flex items-center px-6 gap-2 flex-shrink-0">
            <span className={`text-xs font-bold font-mono flex-shrink-0 ${currentTheme.terminalIcon}`}>
              lakshay@devops-cluster:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              disabled={isDeploying}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                playAudio(500 + Math.random() * 150, "sine", 0.02);
              }}
              onKeyDown={handleKeyDown}
              placeholder={isDeploying ? "Deploying resource pods..." : "Type 'help' and press Enter..."}
              className={`flex-1 bg-transparent border-none outline-none font-mono text-xs p-0 select-text ${currentTheme.input} disabled:opacity-30 disabled:cursor-not-allowed`}
            />
            <Shield className={`w-4 h-4 opacity-30 flex-shrink-0 ${currentTheme.terminalIcon}`} />
          </div>
        </div>

      </div>
    </section>
  );
}
