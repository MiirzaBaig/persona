"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

interface BlurFooterProps {
  children: React.ReactNode;
}

export function BlurFooter({ children }: BlurFooterProps) {
  const socialLinks = [
    { href: "https://github.com/MiirzaBaig", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/mirza-baig-590b1826b/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://x.com/Miirzabaig", icon: Twitter, label: "X" },
    { href: "mailto:mirza.devs@gmail.com", icon: Mail, label: "Email" },
  ];

  return (
    <div className="relative">
      {children}
      <div 
        className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none"
        style={{ height: '180px', maskImage: 'linear-gradient(to top, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)' }}
      />
      <footer className="relative z-40 py-8 border-t border-zinc-200">
        <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()} Mirza Baig</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}