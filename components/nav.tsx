"use client";

import Link from "next/link";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect, useState } from "react";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed pointer-events-none top-0 mt-4 left-1/2 -translate-x-1/2 flex w-fit items-center gap-8 z-50 rounded-full transition-all duration-300 ${isScrolled
          ? "bg-transparent border-2 border-transparent shadow-none py-3 px-4"
          : "bg-whiteout border-2 border-black shadow-neobrutalism py-3 pl-3 pr-5"
        }`}
    >
      <svg
        className={`hidden md:block absolute right-0 top-0 -scale-x-100 z-50 transition-opacity duration-300 ${isScrolled ? "opacity-0" : "opacity-100"
          }`}
        width="53"
        height="52"
        viewBox="0 0 53 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-blackout"
          d="M0 -5.35442e-05H52.1C52.1 -5.35442e-05 24.8947 -0.434101 12.4473 12.7519C2.67029e-05 25.938 0 51.8759 0 51.8759V-5.35442e-05Z"
        />
      </svg>

      <svg
        className={`hidden md:block absolute left-0 top-0 z-50 transition-opacity duration-300 ${isScrolled ? "opacity-0" : "opacity-100"
          }`}
        width="53"
        height="52"
        viewBox="0 0 53 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-blackout"
          d="M0 -5.35442e-05H52.1C52.1 -5.35442e-05 24.8947 -0.434101 12.4473 12.7519C2.67029e-05 25.938 0 51.8759 0 51.8759V-5.35442e-05Z"
        />
      </svg>
      <Link
        href="/"
        className="relative pointer-events-auto flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blackout/20 focus:ring-offset-2 focus:ring-offset-transparent"
      >
        <Image
          priority
          src="/logo-anim.gif"
          fill
          sizes="48px"
          alt="Home"
          className="object-cover"
        />
      </Link>
      <Popover>
        <PopoverTrigger
          className="pointer-events-auto text-sm font-medium tracking-tight text-blackout underline decoration-blackout/30 underline-offset-4 hover:decoration-blackout transition-colors py-1.5"
        >
          Contact
        </PopoverTrigger>
        <PopoverContent>
          <ul className="flex pointer-events-auto font-medium flex-col gap-4 font-base">
            <li>
              <Link href="mailto:mirza.devs@gmail.com">email</Link>
            </li>
            <li>
              <Link href="tel:+919121776155">phone</Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/mirza-baig-590b1826b/">
                linkedin
              </Link>
            </li>
            <li>
              <Link href="https://x.com/Miirzabaig">x.com</Link>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </nav>
  );
};

export default Nav;
