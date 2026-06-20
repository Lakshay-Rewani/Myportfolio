"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate sending, then trigger mailto
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:lakshayrewani7@gmail.com?subject=${subject}&body=${body}`;
      
      // Reset form status after a delay
      setTimeout(() => setIsSent(false), 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="bg-[#0a0a0a] text-white py-32 px-4 md:px-12 relative z-20 border-b border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* Title */}
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">Connect</span>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">Get In Touch</h2>
          <p className="text-gray-400 text-lg md:text-2xl max-w-2xl font-light">
            Let&apos;s build something secure, scalable, and automated together. Reach out for opportunities or collaborations.
          </p>
        </div>

        {/* Form and Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Cards (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            <div className="flex flex-col gap-6">
              
              {/* Email Card */}
              <motion.a
                href="mailto:lakshayrewani7@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card group p-8 rounded-[2rem] border border-white/5 hover:border-indigo-500/30 transition-all flex items-center gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-indigo-300" />
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-500 block mb-1">EMAIL ME</span>
                  <span className="text-base md:text-lg font-medium group-hover:text-indigo-300 transition-colors">
                    lakshayrewani7@gmail.com
                  </span>
                </div>
              </motion.a>

              {/* Phone Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card p-8 rounded-[2rem] border border-white/5 flex items-center gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-fuchsia-300" />
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-500 block mb-1">CALL ME</span>
                  <div className="flex flex-col text-base md:text-lg font-medium text-gray-200">
                    <span>+91 9571407840</span>
                    <span className="text-gray-400 text-sm font-light">+91 9571409840</span>
                  </div>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card p-8 rounded-[2rem] border border-white/5 flex items-center gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-500 block mb-1">LOCATION</span>
                  <span className="text-base md:text-lg font-medium text-gray-200">
                    Jaipur, Rajasthan, India
                  </span>
                </div>
              </motion.div>
              
            </div>

            {/* Social profiles row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center sm:justify-start gap-4 mt-6 lg:mt-0"
            >
              <a
                href="https://github.com/lakshay-rewani"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/30 transition-all text-gray-400 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/lakshay-rewani-89924233b/?skipRedirect=true"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/30 transition-all text-gray-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://devopswithlakshay.online"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/30 transition-all text-gray-400 hover:text-white"
                aria-label="Website"
              >
                <Globe className="w-6 h-6" />
              </a>
            </motion.div>
          </div>

          {/* Form Card (7 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-card p-8 md:p-12 rounded-[2rem] border border-white/5 flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold tracking-tight mb-8">Send a Quick Message</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-name" className="text-xs font-mono text-gray-500">YOUR NAME</label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="bg-white/[0.02] border border-white/5 focus:border-indigo-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-email" className="text-xs font-mono text-gray-500">EMAIL ADDRESS</label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="bg-white/[0.02] border border-white/5 focus:border-indigo-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="form-message" className="text-xs font-mono text-gray-500">YOUR MESSAGE</label>
                <textarea
                  id="form-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hey Lakshay, I'd love to chat about..."
                  className="bg-white/[0.02] border border-white/5 focus:border-indigo-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending || isSent}
                className="glass-card flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition-colors border border-white/10 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <span>Preparing Draft...</span>
                ) : isSent ? (
                  <span>Opening Mail Client!</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 text-indigo-400" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
