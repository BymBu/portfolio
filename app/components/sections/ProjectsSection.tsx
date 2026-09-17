"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const projects = [
  {
    id: "01",
    title: "ПРИБАЙКАЛЕЦ",
    subtitle: "Информационный портал",
    tech: ["NEXT.JS", "STRAPI", "DOCKER"],
    desc: "Редизайн регионального медиа. Рост вовлеченности на 40%. Сложная архитектура контента.",
    img: "/projects/pribaikalec.png",
    link: "https://pribaikalec.ru/",
  },
  {
    id: "02",
    title: "ЗЫРЯНСК",
    subtitle: "Карта памяти",
    tech: ["LEAFLET", "PANELLUM", "CDN"],
    desc: "Интерактивная карта с архивными метками. 80+ точек, 13+ панорам. Цифровой архив села.",
    img: "/projects/ziryansk.png",
    link: "https://map-of-ziryansk.vercel.app/",
  },
  {
    id: "03",
    title: "ENGPULSE",
    subtitle: "Интернет-магазин",
    tech: ["1C BITRIX", "MOODLE API"],
    desc: "Магазин курсов английского с интеграцией Moodle. Платежка, личный кабинет.",
    img: "/projects/EngPulse.png",
    link: "https://engpulse.ru/",
  },
  {
    id: "04",
    title: "MELIORBEAUTY",
    subtitle: "Салон красоты",
    tech: ["1C BITRIX", "UI/UX"],
    desc: "Премиальный дизайн для салона в Питере. Онлайн-запись и каталог услуг.",
    img: "/projects/melior.png",
    link: "https://meliorbeauty.ru/",
  },
];

// ВАРИАНТЫ АНИМАЦИИ
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Чуть быстрее для динамики
      delayChildren: 0.1,
    },
  },
};

const rowVariants = {
  hidden: { y: 40, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 70, damping: 22 },
  },
};

export default function ProjectsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const yTrees = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 px-4 md:px-12 lg:px-20 bg-[var(--bg-color)] overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* ФОН И ДЕРЕВЬЯ */}
      <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
        <Image
          src="/me2.png"
          alt=""
          fill
          className="object-cover object-bottom grayscale contrast-125 brightness-50 blur-sm"
        />
      </div>

      <motion.div
        className="absolute top-[-10%] bottom-[-25%] pointer-events-none z-0 opacity-40 overflow-hidden"
        style={{ left: "-150px", width: "900px", y: yTrees }}
      >
        <Image
          src="/tree-left.png"
          alt=""
          fill
          className="object-cover object-top grayscale contrast-155 brightness-25 scale-x-[0.7] -rotate-2"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/30 to-[var(--bg-color)]" />
      </motion.div>

      <motion.div
        className="absolute right-[-260px] top-[-10%] bottom-[-10%] scale-x-[1.1] w-[1500px] rotate-3 pointer-events-none z-0 opacity-40"
        style={{ y: yTrees }}
      >
        <Image
          src="/tree-right.png"
          alt=""
          fill
          className="object-cover object-top grayscale contrast-155 brightness-25"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/20 to-[var(--bg-color)]" />
      </motion.div>

      {/* КОНТЕНТ */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* ЗАГОЛОВОК + GITHUB LINK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-16 border-b border-white/10 pb-4 gap-4"
        >
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter text-white uppercase leading-none">
            Избранное<span className="text-white/20">.</span>
          </h2>
          
          <div className="flex items-center gap-6 text-xs font-mono tracking-widest">
            <span className="text-white/40 hidden sm:inline">2024 — 2026</span>
            <a 
              href="https://github.com/BymBu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors duration-300 group/link flex items-center gap-2"
            >
              ДРУГИЕ ПРОЕКТЫ
              <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">↗</span>
            </a>
          </div>
        </motion.div>

        {/* СПИСОК ПРОЕКТОВ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col gap-8 md:gap-12"
        >
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectRow({ project }: { project: (typeof projects)[0] }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={rowVariants}
      className="group relative block w-full cursor-pointer"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 group-hover:bg-white/30 transition-colors duration-500" />

      {/* АДАПТИВНАЯ СЕТКА */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-6 md:py-8 items-start md:items-center">
        
        {/* ЛЕВАЯ ЧАСТЬ: ТЕКСТ */}
        <div className="md:col-span-5 flex flex-col gap-3 md:gap-4 order-2 md:order-1">
          <span className="font-mono text-[10px] md:text-xs text-white/20 group-hover:text-white/50 transition-colors uppercase">
            {project.id} / {project.subtitle}
          </span>

          <h3 className="text-2xl md:text-5xl font-bold text-white uppercase tracking-tight leading-[0.9] md:leading-none">
            <span className="inline-block transition-transform duration-100 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-80">
              {project.title}
            </span>
          </h3>

          <p className="text-xs md:text-sm text-white/40 font-mono max-w-md leading-relaxed group-hover:text-white/60 transition-colors line-clamp-3 md:line-clamp-none">
            {project.desc}
          </p>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: КАРТИНКА И ТЕХНОЛОГИИ */}
        <div className="md:col-span-7 flex flex-col md:flex-row gap-4 md:gap-6 items-start order-1 md:order-2">
          <div className="w-full md:w-[280px] aspect-video md:h-[180px] relative overflow-hidden bg-gray-900 border border-white/10 group-hover:border-white/40 transition-all duration-500 shrink-0 rounded-sm">
            <Image
              src={project.img}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 280px"
              className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* ТЕХНОЛОГИИ */}
          <div className="flex flex-col justify-between h-full w-full md:w-auto pt-1 md:pt-2">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 border border-white/10 text-[10px] font-mono text-white/30 group-hover:border-white/30 group-hover:text-white/70 transition-all duration-300"
                >
                  {t}
                </span>
              ))}
            </div>
            
            <div className="mt-auto">
              <span className="text-[10px] md:text-xs font-mono text-white/20 group-hover:text-white group-hover:underline underline-offset-4 transition-all flex items-center gap-1">
                ОТКРЫТЬ ПРОЕКТ <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}