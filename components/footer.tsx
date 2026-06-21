import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/MiirzaBaig", label: "GitHub", icon: Github },
  {
    href: "https://www.linkedin.com/in/mirza-baig-590b1826b/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  { href: "https://x.com/Miirzabaig", label: "X", icon: Twitter },
  { href: "mailto:mirza.devs@gmail.com", label: "Email", icon: Mail },
];

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#08090b]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-display text-sm font-medium tracking-[-0.03em] text-zinc-500 dark:text-zinc-400">
            still shipping.
          </span>

          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="inline-flex size-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
              >
                <link.icon size={17} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
