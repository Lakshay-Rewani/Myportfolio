"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, FileText, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 h-20 z-50 bg-[#121212]/30 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-12 pointer-events-auto"
    >
      <div className="flex items-center gap-3">
        <span 
          onClick={() => {window.scrollTo({ top: 0, behavior: "smooth" }); setMobileMenuOpen(false);}}
          className="text-white font-bold tracking-wider text-lg md:text-xl cursor-pointer hover:opacity-85 transition-opacity"
        >
          LAKSHAY REWANI
        </span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-white transition-colors cursor-pointer"
        >
          Home
        </button>
        <button
          onClick={() => handleScroll("about")}
          className="hover:text-white transition-colors cursor-pointer"
        >
          About
        </button>
        <button
          onClick={() => handleScroll("projects")}
          className="hover:text-white transition-colors cursor-pointer"
        >
          Projects
        </button>
        <button
          onClick={() => handleScroll("iac")}
          className="hover:text-white transition-colors cursor-pointer"
        >
          IaC
        </button>
        <button
          onClick={() => handleScroll("architecture")}
          className="hover:text-white transition-colors cursor-pointer"
        >
          Architecture
        </button>
        <button
          onClick={() => handleScroll("contact")}
          className="hover:text-white transition-colors cursor-pointer"
        >
          Contact
        </button>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <a
          href="https://github.com/lakshay-rewani"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/lakshay-rewani-89924233b/?skipRedirect=true"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="/LAKSHAY!.pdf"
          download="Lakshay_Rewani_Resume.pdf"
          className="glass-card flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white hover:bg-white/10 transition-colors border border-white/10"
        >
          <FileText className="w-4 h-4" />
          <span>Resume</span>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-white p-2 cursor-pointer"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 right-0 bg-[#121212]/95 backdrop-blur-md border-b border-white/5 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-left text-lg font-medium text-white hover:text-indigo-400 transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => handleScroll("about")}
                className="text-left text-lg font-medium text-white hover:text-indigo-400 transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => handleScroll("projects")}
                className="text-left text-lg font-medium text-white hover:text-indigo-400 transition-colors cursor-pointer"
              >
                Projects
              </button>
              <button
                onClick={() => handleScroll("iac")}
                className="text-left text-lg font-medium text-white hover:text-indigo-400 transition-colors cursor-pointer"
              >
                IaC Showcase
              </button>
              <button
                onClick={() => handleScroll("architecture")}
                className="text-left text-lg font-medium text-white hover:text-indigo-400 transition-colors cursor-pointer"
              >
                Cloud Architecture
              </button>
              <button
                onClick={() => handleScroll("github")}
                className="text-left text-lg font-medium text-white hover:text-indigo-400 transition-colors cursor-pointer"
              >
                GitHub Activity
              </button>
              <button
                onClick={() => handleScroll("quiz")}
                className="text-left text-lg font-medium text-white hover:text-indigo-400 transition-colors cursor-pointer"
              >
                DevOps Quiz
              </button>
              <button
                onClick={() => handleScroll("contact")}
                className="text-left text-lg font-medium text-white hover:text-indigo-400 transition-colors cursor-pointer"
              >
                Contact
              </button>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <a
                  href="https://github.com/lakshay-rewani"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/lakshay-rewani-89924233b/?skipRedirect=true"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="/LAKSHAY!.pdf"
                  download="Lakshay_Rewani_Resume.pdf"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
