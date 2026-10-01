import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/studio', label: 'Studio' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 mix-blend-difference">
        <Link to="/" data-cursor="Home" className="font-display text-2xl font-bold">
          Orbit
        </Link>
        <nav className="hidden gap-7 text-sm md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={pathname === l.to ? 'text-blush' : 'hover:text-blush'}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link to="/studio" data-cursor="Say hi" className="hidden rounded-full border border-paper/40 px-5 py-2 text-sm hover:bg-paper hover:text-ink md:inline-block">
          Start a project
        </Link>
        <button onClick={() => setMenu((v) => !v)} className="md:hidden" aria-label="Menu">
          {menu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-6 rounded-2xl border border-paper/10 bg-plum/90 p-5 backdrop-blur md:hidden"
          >
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="block py-3 font-display text-2xl font-bold">
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
