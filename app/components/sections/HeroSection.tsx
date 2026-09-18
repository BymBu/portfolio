"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTypewriter } from "@/app/hooks/useTypewriter";

export default function HeroSection() {
  const { displayText } = useTypewriter(
    "Full-stack developer.\nBuilding complex systems from chaos.",
    40,
  );

  const containerRef = useRef(null);
  
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768);
    checkWidth(); // Запуск при монтировании
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yMobile = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[var(--bg-color)] h-[100dvh]"
    >
      {/* ФОН С ПАРАЛЛАКСОМ */}
      <motion.div
        style={{ y: yMobile }}
        className="absolute inset-0 z-0 w-full h-[120vh] -top-[20vh] md:-top-[70vh] will-change-transform md:will-change-auto"
      >
        <motion.div
          className="absolute inset-0 parallax-bg"
          style={{ y: isDesktop ? y : undefined }}
        >
          <Image
            src="/me.png"
            alt="Slava Developer"
            fill
            className="object-cover grayscale contrast-125 brightness-75"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* ОСТАЛЬНОЙ КОНТЕНТ БЕЗ ИЗМЕНЕНИЙ */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 md:px-20 py-6 md:py-12 flex justify-between items-start">
        <span className="text-white font-mono text-[10px] md:text-xs tracking-widest opacity-70">PORTFOLIO 2026</span>
        <span className="text-white font-mono text-[10px] md:text-xs tracking-widest opacity-50 hidden md:block animate-pulse">SCROLL ↓</span>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full flex flex-col items-center justify-center pointer-events-none select-none gap-2 md:gap-4 px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[60%] h-[30%] md:h-[40%] bg-white/10 blur-[60px] md:blur-[90px] rounded-full pointer-events-none" />
        <p className="text-white/60 text-xs md:text-lg lg:text-xl font-mono tracking-widest uppercase absolute -top-8 md:-top-12 lg:-top-16 whitespace-nowrap">Разработчик сайтов</p>
        
        <motion.h1 style={{ fontFamily: "'Clash Display', sans-serif" }} className="text-[18vw] sm:text-[20vw] md:text-[20vw] font-[700] leading-[0.85] w-full text-center whitespace-nowrap flex justify-center items-center text-white/30 max-w-none">
          <motion.span className="inline-block mr-[-0.02em]" animate={{ x: [0, -2, 2, -1, 0], opacity: [1, 0.8, 1, 0.9, 1] }} transition={{ duration: 0.3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}>S</motion.span>
          <motion.span className="inline-block mx-[-0.01em]" animate={{ y: [0, 10, -2, 0], skewX: [0, 2, -1, 0], rotate: [0, 1, -1, 0.5, 0] }} transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.1 }}>L</motion.span>
          <motion.span className="inline-block ml-[-0.0001em] mr-[-0.07em]" animate={{ x: [0, 4, 0, -2, 0], opacity: [1, 0.6, 1, 0.8, 1] }} transition={{ duration: 0.25, repeat: Infinity, repeatType: "loop", ease: [0, 0, 1, 1], delay: 0.2 }}>A</motion.span>
          <motion.span className="inline-block ml-[-0.15em] mr-[-0.08em]" animate={{ y: [0, 10, -2, 0], filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"] }} transition={{ duration: 0.35, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0.3 }}>V</motion.span>
          <motion.span className="inline-block ml-[-0.14em]" animate={{ x: [0, -3, 2, 0], y: [0, 2, -1, 0], opacity: [1, 0.7, 1, 0.9, 1] }} transition={{ duration: 0.28, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.4 }}>A</motion.span>
        </motion.h1>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 md:px-20 pb-6 md:pb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 md:gap-8">
          <div className="w-full md:max-w-md">
            <div className="flex items-start gap-2 mb-4 md:mb-8 min-h-[3rem] md:min-h-[3.5rem]">
              <div className="border-l border-white/50 pl-3 md:pl-4 flex-1">
                <span className="inline-block whitespace-pre">
                  {displayText}
                  <span className="inline-block w-[2px] h-[1.2em] bg-white align-middle ml-[1px] animate-pulse" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-white/40 text-[10px] font-mono tracking-widest leading-relaxed">BASED IN RUSSIA<br />AVAILABLE FOR WORK</p>
          </div>
        </div>
      </div>
    </section>
  );
}