export default function FooterSection() {
  return (
    <footer className="py-12 md:py-20 px-6 md:px-20 border-t border-white/10 bg-[var(--bg-color)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12">
        
        {/* ГЛАВНЫЙ CTA */}
        <div className="w-full md:w-auto">
          <a 
            href="https://t.me/slepta" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-[clamp(3.5rem,10vw,8rem)] leading-[0.85] font-black tracking-tighter text-white/10 hover:text-white transition-colors duration-500 cursor-pointer break-words"
          >
            LET'S TALK
          </a>
        </div>

        {/* КОНТАКТЫ */}
        <div className="flex flex-col gap-3 md:gap-4 text-left md:text-right w-full md:w-auto">
          <a href="https://t.me/slepta" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl hover:text-[var(--accent-color)] transition-colors py-1">
            Telegram
          </a>
          <a href="https://vk.ru/bymbu" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl hover:text-[var(--accent-color)] transition-colors py-1">
            ВКонтакте
          </a>
          <a href="https://github.com/BymBu" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl hover:text-[var(--accent-color)] transition-colors py-1">
            GitHub
          </a>
          <a href="mailto:slava.erof07@gmail.com" className="text-lg md:text-xl hover:text-[var(--accent-color)] transition-colors py-1 break-all">
            slava.erof07@gmail.com
          </a>
        </div>
      </div>

      {/* КОПИРАЙТ */}
      <div className="max-w-7xl mx-auto mt-12 md:mt-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] md:text-xs text-[var(--secondary-text)] uppercase tracking-widest">
        <span>© 2026 SLAVA DEV</span>
        <span>BASED IN RUSSIA</span>
      </div>
    </footer>
  );
}