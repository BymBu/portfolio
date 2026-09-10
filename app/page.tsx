"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTypewriter } from "./hooks/useTypewriter";

export default function Home() {
  const { displayText } = useTypewriter(
    "Fuull-stack developer.\nBuilding complex systems from chaos.",
    30, // Скорость печати (мс на символ)
  );

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Параллакс эффект для фона
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const yTrees = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-[var(--accent-color)] selection:text-white"
    >
      {/* HERO SECTION - ФИНАЛЬНАЯ ВЕРСИЯ */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between py-12 md:py-20">
        {/* 1. ФОНОВОЕ ФОТО С ПАРАЛЛАКСОМ */}
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image
            src="/me.png"
            alt="Slava Developer"
            fill
            className="object-cover grayscale contrast-125 brightness-75 scale-110"
            priority
            quality={90}
          />
          {/* Градиент теперь мягче, чтобы не убивать низ фото */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </motion.div>

        {/* 2. ВЕРХНЯЯ ЧАСТЬ */}
        <div className="relative z-10 px-6 md:px-20 flex justify-between items-start">
          <span className="text-white font-mono text-xs tracking-widest opacity-70">
            PORTFOLIO 2026
          </span>
          <span className="text-white font-mono text-xs tracking-widest opacity-50 hidden md:block animate-pulse">
            SCROLL ↓
          </span>
        </div>

        {/* 3. ЦЕНТРАЛЬНЫЙ ТЕКСТ - НАСТОЯЩЕЕ СТЕКЛО */}
        <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none select-none gap-4">
          {/* 1. РАЗМАЗАННЫЙ МАЗОК ПОД ТЕКСТОМ */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-white/5 blur-[80px] rounded-full pointer-events-none" />

          {/* 2. КОНТЕЙНЕР ДЛЯ БУКВ (ГОРИЗОНТАЛЬНЫЙ) */}
          <motion.h1
            style={{ fontFamily: "'Clash Display', sans-serif" }}
            className="
      text-[20vw] 
      font-[700] leading-[0.85] 
      w-full text-center whitespace-nowrap flex justify-center items-center
      
      /* Стили стекла */
      text-white/30           
      backdrop-blur-sm        
      [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] 
      [filter:drop-shadow(0_10px_30px_rgba(0,0,0,0.6))]
    "
          >
            {/* S */}
            <motion.span
              className="inline-block mr-[-0.02em]"
              animate={{
                x: [0, -2, 2, -1, 0],
                opacity: [1, 0.8, 1, 0.9, 1],
                filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: 0,
              }}
            >
              S
            </motion.span>

            {/* L */}
            <motion.span
              className="inline-block mx-[-0.01em]"
              animate={{
                y: [0, 10, -2, 0],
                skewX: [0, 2, -1, 0],
                rotate: [0, 1, -1, 0.5, 0],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.1,
              }}
            >
              L
            </motion.span>

            {/* A */}
            <motion.span
              className="inline-block ml-[-0.0001em] mr-[-0.07em]"
              animate={{ x: [0, 4, 0, -2, 0], opacity: [1, 0.6, 1, 0.8, 1] }}
              transition={{
                duration: 0.25,
                repeat: Infinity,
                repeatType: "loop",
                ease: [0, 0, 1, 1],
                delay: 0.2,
              }}
            >
              A
            </motion.span>

            {/* V */}
            <motion.span
              className="inline-block ml-[-0.15em] mr-[-0.08em]"
              animate={{
                y: [0, 10, -2, 0],
                filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"],
              }}
              transition={{
                duration: 0.35,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: 0.3,
              }}
            >
              V
            </motion.span>

            {/* A */}
            <motion.span
              className="inline-block ml-[-0.14em]"
              animate={{
                x: [0, -3, 2, 0],
                y: [0, 2, -1, 0],
                opacity: [1, 0.7, 1, 0.9, 1],
              }}
              transition={{
                duration: 0.28,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              A
            </motion.span>
          </motion.h1>

          {/* 3. ПОДПИСЬ ПОД ТЕКСТОМ (ВЕРТИКАЛЬНО) */}
          <p className="text-white/60 text-lg md:text-xl font-mono tracking-widest uppercase absolute top-[-20px] ">
            Разработчик сайтов
          </p>

          {/* Блик поверх всего блока */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none mix-blend-overlay" />
        </div>

        {/* 4. НИЖНЯЯ ЧАСТЬ: ТЕКСТ + КНОПКА */}
        <div className="relative z-10 px-6 md:px-20 flex flex-col md:flex-row justify-between items-end gap-8 pb-8">
          {/* Левый блок */}
          <div className="max-w-md">
            {/* Левый блок с эффектом печати */}
            <div className="max-w-md">
              {/* Контейнер для печатающегося текста */}
              <div className="flex items-center gap-2 mb-8">
                <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed border-l border-white/50 pl-4 font-mono h-[3.5rem]">
                  {displayText}
                  {/* Мигающий курсор */}
                  <span
                    className={`inline-block w-[2px] h-[1.2em] bg-white ml-1 align-middle ${"animate-blink"}`}
                  />
                </p>
              </div>

              {/* Кнопка появляется ПОСЛЕ завершения печати */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] overflow-hidden rounded-none border border-white/20"
              >
                <span className="relative z-10">Смотреть проекты</span>
              </motion.button>
            </div>
          </div>

          {/* Правый блок */}
          <div className="hidden md:block text-right">
            <p className="text-white/40 text-[10px] font-mono tracking-widest leading-relaxed">
              BASED IN RUSSIA
              <br />
              AVAILABLE FOR WORK
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION - С ДЕРЕВЬЯМИ ПО БОКАМ */}
      <section className="relative py-32 px-6 md:px-20 bg-[var(--bg-color)] overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Левое дерево - УЗКОЕ ЧЕРЕЗ МАСШТАБ */}

        <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
          <Image 
            src="/me.png" 
            alt="" 
            fill 
            className="object-cover object-bottom grayscale contrast-125 brightness-50 blur-sm" 
      
          />
          {/* Градиент: сверху видно лес, снизу чистый черный */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-color)]/80 to-[var(--bg-color)]" />
        </div>
        <motion.div
          className="absolute top-[-10%] bottom-[-10%] pointer-events-none z-0 opacity-40 overflow-hidden"
          style={{ left: "-190px", width: "900px", y: yTrees }} // Контейнер задает зону видимости
        >
          <Image
            src="/tree-left.png"
            alt=""
            fill
            className="object-cover object-top grayscale contrast-155 brightness-25 scale-x-[0.7] -rotate-2"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/30 to-[var(--bg-color)]" />
        </motion.div>

        {/* Правое дерево - зеркально */}
        <motion.div className="absolute right-[-270px] top-[-10%] bottom-[-10%] scale-x-[1.1] w-[1500px] rotate-3 pointer-events-none z-0 opacity-40"
         style={{  y: yTrees }} >
          <Image
            src="/tree-right.png"
            alt=""
            fill
            className="object-cover object-top grayscale contrast-155 brightness-25"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/20 to-[var(--bg-color)]" />
        </motion.div>
        {/* КОНТЕНТ СЕКЦИИ (поверх деревьев) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-8">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
              ИЗБРАННОЕ
            </h2>
            <span className="text-[#ff3c00] font-mono text-sm">
              2024 — 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {/* Проект 1 */}
            <article className="group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-900 overflow-hidden mb-6 relative rounded-sm">
                <div className="w-full h-full bg-gray-800 group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 text-xs font-bold uppercase">
                  Case Study
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-2 text-white group-hover:text-[#ff3c00] transition-colors">
                Pribaikalec Portal
              </h3>
              <p className="text-gray-400 max-w-md">
                Редизайн регионального медиа. Рост вовлеченности на 40%.
                Next.js, Strapi.
              </p>
            </article>

            {/* Проект 2 (со сдвигом) */}
            <article className="group cursor-pointer md:mt-32">
              <div className="aspect-[4/3] bg-gray-900 overflow-hidden mb-6 relative rounded-sm">
                <div className="w-full h-full bg-gray-800 group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 right-4 bg-white text-black px-3 py-1 text-xs font-bold uppercase">
                  Web App
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-2 text-white group-hover:text-[#ff3c00] transition-colors">
                Interactive Map System
              </h3>
              <p className="text-gray-400 max-w-md">
                Геосервис для туризма. Оптимизация рендера 10k+ маркеров.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FOOTER - МИНИМАЛИЗМ */}
      <footer className="py-20 px-6 md:px-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <h2 className="text-[10vw] md:text-[8vw] leading-none font-black tracking-tighter text-white/10 hover:text-white transition-colors duration-500 cursor-pointer">
              LET'S TALK
            </h2>
          </div>
          <div className="flex flex-col gap-4 text-right">
            <a
              href="#"
              className="text-xl hover:text-[var(--accent-color)] transition-colors"
            >
              Telegram
            </a>
            <a
              href="#"
              className="text-xl hover:text-[var(--accent-color)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:slava@example.com"
              className="text-xl hover:text-[var(--accent-color)] transition-colors"
            >
              slava@example.com
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 flex justify-between text-xs text-[var(--secondary-text)] uppercase tracking-widest">
          <span>© 2026 SLAVA DEV</span>
          <span>BASED IN RUSSIA</span>
        </div>
      </footer>
    </main>
  );
}
