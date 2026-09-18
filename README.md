# Slava | Full-stack Developer Portfolio

Персональное портфолио с интерактивными 3D-элементами, кастомной физикой скролла и бруталистской типографикой. Проект демонстрирует навыки работы со сложным фронтендом, производительностью и адаптивностью под мобильные устройства.

🔗 **Live Demo:** [https://slava-portfolio.vercel.app](https://slava-portfolio.vercel.app)

## 🛠 Стек технологий

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (строгая типизация)
- **Styling:** Tailwind CSS + CSS Modules
- **Animations:** Framer Motion, GSAP ScrollTrigger
- **3D & Physics:** React Three Fiber, Rapier, MeshLine
- **Smooth Scroll:** Lenis (@studio-freight/lenis)
- **Analytics:** Vercel Analytics, Speed Insights, Yandex.Metrika
- **Deployment:** Vercel (Edge Functions, Automatic Image Optimization)

## ✨ Ключевые особенности

### Интерактивность и 3D
- Физически корректная симуляция бейджа на веревке (Rapier Physics). Возможность перетаскивания объекта мышью с инерцией.
- Параллакс-эффект фона и декоративных элементов, синхронизированный с плавным скроллом через Lenis.
- Глитч-анимации типографики (Clash Display) с индивидуальной траекторией для каждой буквы.

### Производительность и Адаптив
- **Mobile-first оптимизация:** Полное отключение WebGL и физических движков на экранах <1024px для предотвращения перезагрузок вкладок на iOS Safari.
- Оптимизация изображений через `next/image` с форматами AVIF/WebP и приоритетной загрузкой LCP.
- Кастомный дискретный скролл (PowerPoint-style) с нулевой задержкой реакции на колесо мыши.

### Архитектура
- Строгая типизация всех компонентов, включая кастомные элементы R3F (`declare module`).
- Разделение логики SSR/CSR для безопасного доступа к `window` и DOM API.
- Модульная структура секций с изолированными хуками анимаций.

## 🚀 Локальный запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки (Turbopack)
npm run dev

# Сборка production-версии
npm run build

# Анализ размера бандла
ANALYZE=true npm run build
```