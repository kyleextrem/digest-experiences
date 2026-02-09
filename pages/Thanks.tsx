
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

const Thanks: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center space-y-12">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full glass-panel shadow-sm text-brand-charcoal mb-4 reveal-img">
          <Heart size={32} fill="currentColor" className="opacity-10" />
          <Heart size={32} className="absolute" />
        </div>

        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-serif italic text-brand-charcoal tracking-tightest">Thank you.</h1>
          <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-lg mx-auto text-balance">
            You're officially on the registry. We'll send you a private link as soon as our next table is set.
          </p>
        </div>

        <div className="pt-8 space-y-10">
          <Link
            to="/"
            className="inline-flex items-center bg-brand-charcoal text-white px-12 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/10"
          >
            <span>Return to Studio</span>
            <ArrowRight size={14} className="ml-3" />
          </Link>

          <div className="pt-10 border-t border-soft">
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-300">
              EXPLORING NEWCASTLE? <a href="https://newcastledigest.com" target="_blank" rel="noopener noreferrer" className="text-brand-charcoal underline underline-offset-4 decoration-gray-200 hover:decoration-brand-charcoal transition-all">VISIT THE DIGEST</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
