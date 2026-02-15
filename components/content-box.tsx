import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { useMotionValueEvent } from "framer-motion";
import RiveAnimation from "./rive-animation";

interface ContentBoxProps {
  children?: React.ReactNode;
  riveSource: string;
  riveStateMachine: string;
  index: number;
  activeIndex: number;
  artboard: string;
  setActiveIndex: (index: number) => void;
  keywords?: string[];
}

const ContentBox = ({
  children,
  riveSource,
  riveStateMachine,
  activeIndex,
  keywords,
  setActiveIndex,
  index,
  artboard,
}: ContentBoxProps) => {
  const ref = useRef(null);


  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", `${index === 0 ? "0" : "-0.1"} center`], //at index 0 start is already above center -> no negative offset, or the text box is opaque by default
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0 && latest !== 1) {
      setActiveIndex(index);
    }
  });

  return (
    <motion.li
      key={index}
      ref={ref}
      className={`transition-all relative   ${activeIndex !== index ? "blur-[1px] opacity-50" : ""
        }`}
    >
      <div className="relative z-0">
        <AnimatePresence>
          {activeIndex === index && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={` z-0 relative`}
            >
              <RiveAnimation
                isActive={activeIndex === index}
                stateMachine={riveStateMachine}
                src={riveSource}
                artboard={artboard}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        className={`w-full border-2 border-black relative z-10 ${activeIndex === index
            ? "bg-whiteout shadow-neobrutalism translate-x-[-4px] translate-y-[-4px] transition-all"
            : "bg-whiteout opacity-50 grayscale"
          }  ${index === 0 ? "" : "border-t-0"} p-[36px]`}
        style={activeIndex !== index ? undefined : { opacity: Math.max(scrollYProgress.get(), 1) }}
      >
        {children}
        <ul className="flex gap-8 text-sm text-blackout/25 mt-4 font-mono">
          {keywords?.map((keyword, i) => (
            <li key={keyword + i}>{keyword}</li>
          ))}
        </ul>
      </motion.div>
      <motion.div className="w-full h-[200px] border border-blackout/5 border-t-0 " />
    </motion.li>
  );
};

export default ContentBox;
