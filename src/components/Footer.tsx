"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#070707] text-gray-500 py-12 px-6 md:px-12 relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm font-medium text-gray-400">
            © {new Date().getFullYear()} Lakshay Rewani. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 font-light">
            Designed and built for high-availability cloud & AI systems.
          </p>
        </div>

        {/* Middle quick socials */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/lakshay-rewani"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/lakshay-rewani-89924233b/?skipRedirect=true"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:lakshayrewani7@gmail.com"
            className="hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Right back to top button */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/30 transition-all text-gray-400 hover:text-white active:scale-95 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>

      </div>
    </footer>
  );
}
