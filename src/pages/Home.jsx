import { lazy, Suspense, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { work, services } from '../data.js';

const Sculpture = lazy(() => import('../three/Sculpture.jsx'));
const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
const ease = [0.33, 1, 0.68, 1];

export default function Home() {
  const reduced = useReducedMotion();
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const id = requestAnimationFrame(() => setShow3D(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  return (
    <motion.div {...page}>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-6">
        {show3D && !reduced && (
          <div className="pointer-events-none absolute right-0 top-0 z-0 h-full w-full opacity-90 md:w-1/2">
            <Suspense fallback={null}>
              <Sculpture />
            </Suspense>
          </div>
        )}
        <div className="pointer-events-none absolute left-1/4 top-1/3 z-0 h-72 w-72 rounded-full bg-blush/20 blur-[130px]" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <p className="mb-8 text-sm uppercase tracking-[0.3em] text-blush">Design studio · Berlin</p>
          <h1 className="font-display text-[13vw] font-bold leading-[0.9] tracking-tight md:text-[8.5vw]">
            {['We design', 'with intent,'].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.12, ease }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.34, ease }}
                className="block italic text-blush"
              >
                never by default.
              </motion.span>
            </span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-10 max-w-md text-lg text-paper/50">
            Orbit is a two-person studio crafting brands, websites, and products for people who care
            about the details as much as we do.
          </motion.p>
        </div>
      </section>

      {/* Work teaser */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mb-16 flex items-end justify-between">
          <h2 className="font-display text-5xl font-bold md:text-6xl">Selected work</h2>
          <Link to="/work" data-cursor="All" className="text-sm text-paper/40 hover:text-blush">
            All projects →
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {work.slice(0, 4).map((w, i) => (
            <motion.div
              key={w.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease }}
            >
              <Link to="/work" data-cursor="View" className={`group block ${i % 2 === 1 ? 'md:mt-24' : ''}`}>
                <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-plum">
                  <img src={w.img} alt={w.title} loading="lazy" className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-3xl font-bold transition-colors group-hover:text-blush">{w.title}</h3>
                    <p className="text-sm text-paper/40">{w.tag}</p>
                  </div>
                  <ArrowUpRight className="h-7 w-7 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-paper/10 bg-plum/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <h3 className="font-display text-2xl font-bold text-blush">{s.title}</h3>
              <ul className="mt-4 space-y-2 text-paper/60">
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
