import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-10 text-sm text-paper/40 md:flex-row">
        <span>© {new Date().getFullYear()} Orbit Studio — a portfolio case study</span>
        <Link to="/studio" className="hover:text-paper">Start a project</Link>
        <div className="flex gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-paper">Instagram</a>
          <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:text-paper">Behance</a>
        </div>
      </div>
    </footer>
  );
}
