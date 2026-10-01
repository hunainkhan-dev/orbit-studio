import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { stats, team } from '../data.js';

const page = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Magnetic({ children }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.2}px, ${(e.clientY - (r.top + r.height / 2)) * 0.2}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={reset} className="inline-block transition-transform duration-300">
      {children}
    </span>
  );
}

export default function Studio() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = 'Please enter your name.';
    if (!EMAIL_RE.test(form.email.trim())) er.email = 'Enter a valid email.';
    if (form.message.trim().length < 10) er.message = 'Tell us a little more (10+ characters).';
    setErrors(er);
    if (Object.keys(er).length) return;
    setSent(true);
  };

  return (
    <motion.div {...page} className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:pt-44">
      <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blush">The studio</p>
      <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.02] md:text-7xl">
        Two people. One standard. A handful of projects a year.
      </h1>

      <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div className="aspect-square overflow-hidden rounded-3xl">
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80" alt="The Orbit studio" className="h-full w-full object-cover grayscale" />
        </div>
        <div>
          <p className="font-display text-2xl font-bold leading-tight md:text-3xl">
            We take on a handful of projects a year so each one gets the attention it deserves — no
            juniors, no filler, no work we wouldn&apos;t sign.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {stats.map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-4xl font-bold text-blush">{v}</div>
                <div className="text-sm text-paper/50">{l}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex gap-8">
            {team.map((m) => (
              <div key={m.name}>
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-paper/40">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <section className="mt-28 grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-blush">Start a project</p>
          <Magnetic>
            <span className="font-display text-6xl font-bold leading-none tracking-tight md:text-7xl">Say hello</span>
          </Magnetic>
          <p className="mt-8 max-w-sm text-paper/60">
            Tell us what you&apos;re making and roughly when. We reply to every real enquiry within
            two working days.
          </p>
        </div>

        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border border-blush/30 bg-plum/40 p-10">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blush text-ink">
              <Check className="h-7 w-7" />
            </div>
            <h3 className="font-display text-3xl font-bold">Thanks, {form.name.trim().split(' ')[0]}.</h3>
            <p className="mt-3 text-paper/60">
              Your message is in. In a real build this would reach the studio inbox — here it&apos;s a
              working demonstration of the flow, validated and ready to wire up.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-5">
            <div>
              <input className="o-input" value={form.name} onChange={set('name')} maxLength={80} placeholder="Your name" />
              {errors.name && <p className="mt-1.5 text-sm text-blush">{errors.name}</p>}
            </div>
            <div>
              <input className="o-input" value={form.email} onChange={set('email')} maxLength={120} placeholder="you@email.com" />
              {errors.email && <p className="mt-1.5 text-sm text-blush">{errors.email}</p>}
            </div>
            <div>
              <textarea className="o-input resize-none" rows={4} value={form.message} onChange={set('message')} maxLength={1200} placeholder="What are you making?" />
              {errors.message && <p className="mt-1.5 text-sm text-blush">{errors.message}</p>}
            </div>
            <button data-cursor="Send" className="rounded-full bg-blush px-8 py-3.5 font-medium text-ink transition-transform hover:scale-[1.03]">
              Send enquiry
            </button>
          </form>
        )}
      </section>
    </motion.div>
  );
}
