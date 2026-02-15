import Link from "next/link";

interface FooterProps { }

const Footer = ({ }: FooterProps) => {
  return (
    <footer className="flex justify-center w-full flex-col items-center ">
      <div className="fixed bottom-0 w-full z-50">
        <svg
          className="hidden md:block absolute bottom-0 right-0 rotate-180 z-50 md:absolute "
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
          className="hidden md:block absolute left-0 bottom-0 -scale-x-100 rotate-180 z-50"
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
      </div>
      <div className="bg-blackout px-8 py-12 md:py-14 rounded-none border-t-2 border-black mb-0 text-whiteout flex flex-col gap-10 md:gap-12 items-center text-center">
        <div className="flex flex-col gap-6 w-full max-w-2xl">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-whiteout/70 mb-3">Find me on</h2>
            <ul className="flex flex-wrap justify-center gap-6 font-light">
              <li>
                <Link
                  className="hover:underline decoration-2 underline-offset-4"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://twitter.com/MiirzaBaig"
                >
                  x.com
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline decoration-2 underline-offset-4"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/in/mirza-baig-590b1826b/"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline decoration-2 underline-offset-4"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/MiirzaBaig"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-sm text-whiteout/70 flex flex-col gap-4">
            <p>
              built with{" "}
              <Link
                className="underline decoration-2 hover:bg-whiteout hover:text-blackout transition-colors px-1"
                href="https://nextjs.org"
                target="_blank"
              >
                next.js
              </Link>
              {", "}
              <Link
                className="underline decoration-2 hover:bg-whiteout hover:text-blackout transition-colors px-1"
                href="https://tailwindcss.com"
                target="_blank"
              >
                tailwind
              </Link>
              {", "}
              <Link
                className="underline decoration-2 hover:bg-whiteout hover:text-blackout transition-colors px-1"
                href="https://framer.com/motion"
                target="_blank"
              >
                framer motion
              </Link>
              {", and "}
              <Link
                className="underline decoration-2 hover:bg-whiteout hover:text-blackout transition-colors px-1"
                href="https://rive.app"
                target="_blank"
              >
                rive
              </Link>
            </p>
            <p>
              Questions?{" "}
              <Link
                href="mailto:mirza.devs@gmail.com"
                className="underline decoration-2 hover:bg-whiteout hover:text-blackout transition-colors px-1"
              >
                Reach out
              </Link>
              {" · "}
              <span className="text-whiteout/50">last update WINTER 2025</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
