"use client";

import { Download, Mail, Github, Phone } from "lucide-react";

export default function QuickActions() {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Lakshay_Resume.pdf';
    link.download = 'Lakshay_Rewani_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3" suppressHydrationWarning>
      <button
        onClick={handleDownloadResume}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-lg shadow-black/20 transition-all hover:scale-110 cursor-pointer"
        title="Download Resume"
        suppressHydrationWarning
      >
        <Download className="w-6 h-6" />
      </button>
      <a
        href="mailto:lakshayrewani7@gmail.com"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-lg shadow-black/20 transition-all hover:scale-110"
        title="Send Email"
        suppressHydrationWarning
      >
        <Mail className="w-6 h-6" />
      </a>
      <a
        href="https://github.com/Lakshay-Rewani"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-lg shadow-black/20 transition-all hover:scale-110"
        title="GitHub Profile"
        suppressHydrationWarning
      >
        <Github className="w-6 h-6" />
      </a>
      <a
        href="tel:+919571407840"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-lg shadow-black/20 transition-all hover:scale-110"
        title="Call Me"
        suppressHydrationWarning
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
