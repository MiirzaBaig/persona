import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { href: "https://github.com/MiirzaBaig", label: "GitHub" },
    { href: "https://www.linkedin.com/in/mirza-baig-590b1826b/", label: "LinkedIn" },
    { href: "https://x.com/Miirzabaig", label: "X" },
    { href: "mailto:mirza.devs@gmail.com", label: "Email" },
  ];

  return (
    <footer id="contact" className="border-t border-zinc-200 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-zinc-600 text-sm">
              © {currentYear} Mirza Baig. Built with Next.js.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;