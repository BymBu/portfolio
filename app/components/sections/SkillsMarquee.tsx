const SKILLS = ["NEXT.JS", "REACT", "VUE", "TYPESCRIPT", "NODE.JS", "TAILWIND", "LARAVEL", "POSTGRESQL", "DOCKER", "FIGMA", "STRAPI", "GRAPHQL", "1C BITRIX"];

export default function SkillsMarquee() {
  return (
    <section className="relative py-16 bg-[var(--bg-color)] border-y border-white/10 overflow-hidden group">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        <div className="flex items-center gap-12 px-8">
          {SKILLS.map((skill, i) => (
            <span key={i} className="text-4xl md:text-6xl font-black text-white/10 hover:text-white transition-colors duration-300 cursor-default select-none flex items-center gap-12">
              {skill}
              <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full opacity-50 shrink-0" />
            </span>
          ))}
        </div>
        <div className="flex items-center gap-12 px-8" aria-hidden="true">
          {SKILLS.map((skill, i) => (
            <span key={`dup-${i}`} className="text-4xl md:text-6xl font-black text-white/10 hover:text-white transition-colors duration-300 cursor-default select-none flex items-center gap-12">
              {skill}
              <span className="w-3 h-3 bg-[var(--accent-color)] rounded-full opacity-50 shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}