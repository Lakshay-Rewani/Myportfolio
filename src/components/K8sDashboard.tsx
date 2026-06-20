"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Cpu, HardDrive, Terminal, Volume2, VolumeX } from "lucide-react";

type Deployment = {
  name: string;
  replicas: number;
  maxReplicas: number;
  pods: { id: string; status: "Pending" | "Running" | "Terminating"; age: number }[];
};

export default function K8sDashboard() {
  const [deployments, setDeployments] = useState<Deployment[]>([
    { name: "hms-portal-deployment", replicas: 1, maxReplicas: 4, pods: [{ id: "hms-001", status: "Running", age: 342 }] },
    { name: "bloodmate-api-deployment", replicas: 1, maxReplicas: 4, pods: [{ id: "bm-001", status: "Running", age: 182 }] },
    { name: "cicd-runner-deployment", replicas: 1, maxReplicas: 4, pods: [{ id: "cicd-001", status: "Running", age: 95 }] },
  ]);

  const [metrics, setMetrics] = useState({ cpu: 12, ram: 42 });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const saved = localStorage.getItem("portfolio-sound-enabled");
    if (saved === "true") {
      setTimeout(() => setSoundEnabled(true), 0);
    }
  }, []);
  const [logs, setLogs] = useState<string[]>([
    "info: k8s-master initialized",
    "info: namespace devopswithlakshay configured",
    "info: deployments successfully mounted to cluster",
  ]);

  // Listen to storage events to keep mute states in sync across terminal & cluster
  useEffect(() => {
    const checkStorage = () => {
      const saved = localStorage.getItem("portfolio-sound-enabled");
      setSoundEnabled(saved === "true");
    };
    window.addEventListener("storage", checkStorage);
    // Poll localstorage status occasionally as well
    const pollInterval = setInterval(checkStorage, 1000);

    return () => {
      window.removeEventListener("storage", checkStorage);
      clearInterval(pollInterval);
    };
  }, []);

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

  // Periodically fluctuate basic metrics and logs
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate total pods
      const totalPodsCount = deployments.reduce((acc, curr) => acc + curr.pods.filter(p => p.status === "Running").length, 0);
      const targetCpu = Math.min(95, Math.max(5, Math.round(totalPodsCount * 12 + Math.random() * 8)));
      const targetRam = Math.min(98, Math.max(10, Math.round(35 + totalPodsCount * 4 + Math.random() * 3)));
      
      setMetrics({ cpu: targetCpu, ram: targetRam });
    }, 2000);

    return () => clearInterval(interval);
  }, [deployments]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev.slice(0, 5)]);
  };

  const scaleDeployment = (name: string, direction: "up" | "down") => {
    setDeployments(prev =>
      prev.map(dep => {
        if (dep.name !== name) return dep;

        let newReplicas = dep.replicas;
        let updatedPods = [...dep.pods];

        if (direction === "up" && dep.replicas < dep.maxReplicas) {
          newReplicas += 1;
          const podId = `${name.substring(0, 4)}-${Math.random().toString(36).substr(2, 4)}`;
          
          // Spawn new pod as Pending
          const newPod = { id: podId, status: "Pending" as const, age: 0 };
          updatedPods.push(newPod);
          
          addLog(`info: scaling up ${name} to ${newReplicas} replicas`);
          addLog(`pod: creating pod ${podId}`);
          playAudio(500, "sine", 0.06);

          // Transition Pending -> Running after 1 second
          setTimeout(() => {
            setDeployments(curr =>
              curr.map(d => {
                if (d.name !== name) return d;
                return {
                  ...d,
                  pods: d.pods.map(p => (p.id === podId ? { ...p, status: "Running" as const } : p)),
                };
              })
            );
            addLog(`pod: pod ${podId} is now Running`);
            playAudio(880, "sine", 0.08);
          }, 1200);

        } else if (direction === "down" && dep.replicas > 1) {
          newReplicas -= 1;
          // Find last non-terminating pod
          const runningPods = updatedPods.filter(p => p.status !== "Terminating");
          if (runningPods.length > 0) {
            const targetPod = runningPods[runningPods.length - 1];
            
            // Set status to Terminating
            updatedPods = updatedPods.map(p => p.id === targetPod.id ? { ...p, status: "Terminating" as const } : p);
            
            addLog(`info: scaling down ${name} to ${newReplicas} replicas`);
            addLog(`pod: terminating pod ${targetPod.id}`);
            playAudio(300, "sine", 0.06);

            // Remove pod after 1.2s
            setTimeout(() => {
              setDeployments(curr =>
                curr.map(d => {
                  if (d.name !== name) return d;
                  return {
                    ...d,
                    pods: d.pods.filter(p => p.id !== targetPod.id),
                  };
                })
              );
              addLog(`pod: pod ${targetPod.id} terminated`);
            }, 1200);
          }
        }

        return { ...dep, replicas: newReplicas, pods: updatedPods };
      })
    );
  };

  return (
    <div className="glass-card w-full p-8 md:p-10 rounded-[2rem] border border-white/5 bg-[#121212]/30 backdrop-blur-md flex flex-col lg:flex-row gap-10 overflow-hidden select-none">
      
      {/* Scaling Controls / Deployments Panel */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <Server className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-bold tracking-tight text-white">Cluster ReplicaSet Controller</h3>
          </div>
          <button
            onClick={toggleSound}
            className="text-gray-500 hover:text-[#818cf8] hover:scale-105 transition-all cursor-pointer flex items-center justify-center p-1"
            title={soundEnabled && mounted ? "Mute Cluster Audio" : "Unmute Cluster Audio"}
          >
            {soundEnabled && mounted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
        
        <div className="flex flex-col gap-6">
          {deployments.map(dep => (
            <div key={dep.name} className="flex flex-col gap-3 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-tight text-white">{dep.name}</span>
                  <span className="text-[10px] font-mono text-gray-500 mt-0.5">NAMESPACE: devopswithlakshay</span>
                </div>
                
                {/* Scale buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => scaleDeployment(dep.name, "down")}
                    disabled={dep.replicas <= 1}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center font-bold text-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95 transition-all"
                  >
                    -
                  </button>
                  <span className="text-xs font-mono text-gray-300 font-semibold min-w-[32px] text-center">
                    REPS: {dep.replicas}
                  </span>
                  <button
                    onClick={() => scaleDeployment(dep.name, "up")}
                    disabled={dep.replicas >= dep.maxReplicas}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center font-bold text-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer active:scale-95 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Pod Grid */}
              <div className="flex flex-wrap gap-2.5 mt-2">
                <AnimatePresence initial={false}>
                  {dep.pods.map(pod => {
                    const isRunning = pod.status === "Running";
                    const isPending = pod.status === "Pending";

                    return (
                      <motion.div
                        key={pod.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono flex items-center gap-2 ${
                          isRunning
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : isPending
                            ? "bg-amber-500/10 border-amber-500/20 text-amber-400 animate-pulse"
                            : "bg-red-500/10 border-red-500/20 text-red-400"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isRunning ? "bg-emerald-400" : isPending ? "bg-amber-400" : "bg-red-400"
                        }`} />
                        <span>{pod.id}</span>
                        <span className="opacity-50 text-[8px] uppercase">
                          ({pod.status.substring(0, 4)})
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics, Graph and Diagnostic Logs Panel */}
      <div className="w-full lg:w-80 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-8">
        
        {/* Live Gauges */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">Cluster Resources</h4>
          <div className="grid grid-cols-2 gap-4">
            
            {/* CPU */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
              <div className="flex justify-between items-center text-gray-500">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-mono">CPU LOAD</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold tracking-tight text-white">{metrics.cpu}</span>
                <span className="text-xs text-gray-500 font-mono">%</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${metrics.cpu}%` }} />
              </div>
            </div>

            {/* RAM */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
              <div className="flex justify-between items-center text-gray-500">
                <HardDrive className="w-4 h-4 text-fuchsia-400" />
                <span className="text-[10px] font-mono">RAM UTIL</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold tracking-tight text-white">{metrics.ram}</span>
                <span className="text-xs text-gray-500 font-mono">%</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-fuchsia-500 transition-all duration-500" style={{ width: `${metrics.ram}%` }} />
              </div>
            </div>

          </div>
        </div>

        {/* Real-time Cluster Logs */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold tracking-widest text-indigo-400 uppercase flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> DIAGNOSTIC LOGS
            </h4>
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          </div>
          <div className="flex-1 min-h-[140px] max-h-[220px] lg:max-h-none p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-gray-500 flex flex-col gap-2 overflow-y-auto leading-relaxed text-left">
            {logs.map((log, idx) => {
              const isPodMsg = log.startsWith("pod:");
              const isError = log.includes("error");
              return (

                <div key={idx} className="transition-all duration-300">
                  {mounted && <span className="text-gray-700">[{new Date().toLocaleTimeString()}]</span>}{" "}
                  <span className={isError ? "text-red-400" : isPodMsg ? "text-emerald-400" : "text-gray-400"}>
                    {log}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
