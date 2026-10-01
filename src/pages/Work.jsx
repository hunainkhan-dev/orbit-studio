import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { work } from '../data.js';

const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
const ease = [0.33, 1, 0.68, 1];

export default function Work() {
  const [active, setActive] = useState(null);

  return (
    <motion.div {...page} className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:pt-44">
      <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blush">Selected work</p>
      <h1 className="max-w-4xl font-display text-6xl font-bold leading-[0.95] md:text-8xl">
        Work we&apos;re proud to <span className="italic text-blush">sign.</span>
      </h1>

      <div className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {work.map((w, i) => (
          <motion.button
            key={w.slug}
            onClick={() => setActive(w)}
            data-cursor="Open"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease }}
            className={`group block text-left ${i % 2 === 1 ? 'md:mt-24' : ''}`}
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-plum">
              <img src={w.img} alt={w.title} loading="lazy" className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute right-4 top-4 rounded-full bg-ink/60 px-3 py-1 text-xs backdrop-blur">{w.year}</span>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <h3 className="font-display text-3xl font-bold transition-colors group-hover:text-blush">{w.title}</h3>
                <p className="text-sm text-paper/40">{w.tag}</p>
              </div>
              <ArrowUpRight className="h-7 w-7 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox / case detail */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 z-50 bg-ink/80 backdrop-blur"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.4, ease }}
              className="fixed inset-x-4 top-1/2 z-50 mx-auto max-h-[85vh] max-w-3xl -translate-y-1/2 overflow-y-auto rounded-3xl border border-paper/10 bg-plum"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={active.img} alt={active.title} className="h-full w-full object-cover" />
                <button onClick={() => setActive(null)} data-cursor="Close" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 backdrop-blur">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-4xl font-bold">{active.title}</h2>
                  <span className="text-sm text-paper/40">{active.year}</span>
                </div>
                <p className="mt-1 text-sm text-blush">{active.discipline}</p>
                <p className="mt-6 text-lg leading-relaxed text-paper/70">{active.blurb}</p>
                <Link to="/studio" data-cursor="Enquire" className="mt-8 inline-flex items-center gap-2 rounded-full bg-blush px-6 py-3 font-medium text-ink transition-transform hover:scale-105">
                  Enquire about a project like this <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
