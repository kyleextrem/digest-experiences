
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Dinner Club', path: '/dinners' },
    { name: 'Social Events', path: '/events' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen font-sans text-brand-charcoal selection:bg-brand-charcoal selection:text-brand-paper">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 pt-6 ${
          scrolled ? 'translate-y-[-10px]' : 'translate-y-0'
        }`}
      >
        <div className={`max-w-5xl mx-auto transition-all duration-500 ${
          scrolled ? 'glass-panel rounded-full px-8 py-3 shadow-sm' : 'py-4'
        }`}>
          <div className="flex justify-between items-center">
            <Link to="/" className="flex flex-col group">
              <span className="text-sm font-bold tracking-tightest uppercase leading-none group-hover:italic transition-all">Newcastle Digest</span>
              <span className="serif-display text-[10px] italic text-gray-400 opacity-80">Experiences</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[10px] uppercase tracking-widest font-semibold transition-all hover:text-brand-charcoal editorial-link ${
                    isActive(link.path) ? 'text-brand-charcoal' : 'text-gray-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/dinners#request-access"
                className="bg-brand-charcoal text-white px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold hover:scale-105 transition-transform active:scale-95"
              >
                Join Waitlist
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1 hover:opacity-60 transition-opacity"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
            {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-brand-paper p-8 flex flex-col justify-center space-y-12 animate-fade-in">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-10 right-8 p-1"
            >
              <X size={24} />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-5xl font-serif tracking-tightest hover:italic text-brand-charcoal"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/dinners#request-access"
              className="inline-block w-fit bg-brand-charcoal text-brand-paper px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Waitlist
            </Link>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-32 animate-fade-in">
        <div className="reveal-container">
          <div className="reveal-item">
            {children}
          </div>
        </div>
      </main>

      {/* Studio Footer */}
      <footer className="bg-brand-paper px-6 pt-40 pb-12 border-t border-soft">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-5 space-y-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold tracking-tightest uppercase leading-none">Newcastle Digest</span>
                <span className="serif-display text-xl italic text-gray-400 mt-1">Experiences</span>
              </div>
              <p className="text-gray-500 text-lg font-light leading-relaxed max-w-sm text-balance">
                Curation of moments. Small gatherings hosted by the team behind Newcastle's local journal.
              </p>
            </div>
            
            <div className="md:col-span-2 md:col-start-7">
              <h4 className="text-[9px] uppercase tracking-widest font-black text-gray-300 mb-8">Experiences</h4>
              <ul className="space-y-4">
                <li><Link to="/dinners" className="text-sm font-medium hover:italic transition-all">Dinner Club</Link></li>
                <li><Link to="/events" className="text-sm font-medium hover:italic transition-all">Social Events</Link></li>
                <li><Link to="/faq" className="text-sm font-medium hover:italic transition-all">Help & FAQ</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[9px] uppercase tracking-widest font-black text-gray-300 mb-8">Newsletter</h4>
              <ul className="space-y-4">
                <li><a href="https://newcastledigest.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:italic transition-all">Main Feed</a></li>
                <li><Link to="/contact" className="text-sm font-medium hover:italic transition-all">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-sm font-medium hover:italic transition-all">Privacy</Link></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[9px] uppercase tracking-widest font-black text-gray-300 mb-8">Social</h4>
              <ul className="space-y-4">
                <li><a href="https://instagram.com/newcastledigest" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:italic transition-all">Instagram</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-soft flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">&copy; {new Date().getFullYear()} Newcastle Digest Experiences</span>
            <a href="https://digeststudio.com" target="_blank" rel="noopener noreferrer" className="serif-display text-sm font-normal text-gray-400 hover:text-brand-charcoal transition-colors">Built by Digest Studio</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
