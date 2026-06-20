"use client";

import { motion } from "framer-motion";
import { Globe, Cloud, Server, Database, Shield, ArrowRight, Wifi } from "lucide-react";

export default function CloudArchitectureDiagram() {
  return (
    <section id="architecture" className="bg-[#0a0a0a] text-white py-32 px-4 md:px-12 relative z-20 border-b border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">Cloud Architecture</span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">AWS Topology</h2>
          <p className="text-gray-400 text-lg md:text-2xl max-w-2xl font-light">
            Visual representation of a highly available cloud infrastructure design.
          </p>
        </div>

        <div className="glass-card rounded-3xl border border-white/5 p-8 md:p-12 overflow-hidden relative">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `linear-gradient(rgba(129, 140, 248, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 140, 248, 0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />

          <div className="relative z-10">
            {/* Architecture Diagram */}
            <div className="flex flex-col items-center gap-8">
              {/* User/Internet Layer */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20"
              >
                <Globe className="w-6 h-6 text-indigo-400" />
                <span className="font-mono text-sm text-indigo-300">Internet / Users</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ArrowRight className="w-6 h-6 text-gray-500 rotate-90 mx-auto" />
              </motion.div>

              {/* VPC / Cloud Layer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full max-w-4xl rounded-3xl border-2 border-dashed border-emerald-500/30 p-8 bg-emerald-500/5 relative"
              >
                <div className="absolute -top-3 left-8 px-3 py-1 bg-[#0a0a0a] rounded-full border border-emerald-500/30">
                  <span className="text-xs font-mono text-emerald-400">VPC (10.0.0.0/16)</span>
                </div>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
                  {/* Public Subnet 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="flex-1 p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono text-cyan-300">Public Subnet (AZ A)</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <Cloud className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-mono text-gray-300">ALB</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-mono text-gray-300">NAT Gateway</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Private Subnets */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="flex-1 p-6 rounded-2xl bg-fuchsia-500/5 border border-fuchsia-500/20"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Server className="w-4 h-4 text-fuchsia-400" />
                      <span className="text-xs font-mono text-fuchsia-300">Private Subnets</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <Server className="w-4 h-4 text-fuchsia-400" />
                        <span className="text-xs font-mono text-gray-300">App Servers (ASG)</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <Database className="w-4 h-4 text-fuchsia-400" />
                        <span className="text-xs font-mono text-gray-300">RDS Primary</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Public Subnet 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="flex-1 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Wifi className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-mono text-amber-300">Public Subnet (AZ B)</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <Server className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-mono text-gray-300">Bastion Host</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
