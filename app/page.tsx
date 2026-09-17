// app/page.tsx
import HeroSection from "./components/sections/HeroSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import PhysicsCardScene from "./components/sections/PhysicsCard";
import SkillsMarquee from "./components/sections/SkillsMarquee";
import FooterSection from "./components/sections/FooterSection";

export default function Home() {
  return (

    <main className="min-h-screen w-full overflow-y-auto bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-[var(--accent-color)] selection:text-black">
      
      {/* СЛАЙД 1 */}
      <section data-snap className="h-screen w-full relative shrink-0">
        <HeroSection />
      </section>

      {/* СЛАЙД 2: ПРОЕКТЫ */}
      <section data-snap >
        <ProjectsSection />
      </section>

      {/* СЛАЙД 3 */} 
      <section data-snap className="h-screen w-full relative shrink-0">
        <PhysicsCardScene />
      </section>

      {/* СЛАЙД 4: НАВЫКИ + ФУТЕР */}
      <section data-snap>
        <div className="flex-1 flex items-center justify-center">
          <SkillsMarquee />
        </div>
        <FooterSection />
      </section>

    </main>
  );
}