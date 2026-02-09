
import React from 'react';
import { Mail, MessageCircle, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="pt-24 md:pt-40 mb-32">
          <div className="flex items-center space-x-3 mb-10 overflow-hidden">
            <span className="h-[1px] w-12 bg-gray-200"></span>
            <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Communication</span>
          </div>
          <h1 className="text-7xl md:text-[140px] font-serif tracking-tightest leading-[0.8] mb-12 text-brand-charcoal">
            Get in <br /><span className="serif-display text-gray-300 italic">touch.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-500 leading-tight font-light max-w-xl text-balance">
            Have a question about a specific event or interested in a collaboration? Our studio is open for local conversation.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div className="group bg-brand-clay/[0.15] border border-soft p-12 md:p-16 space-y-8 hover:bg-brand-clay/30 transition-all duration-500">
            <div className="w-16 h-16 glass-panel rounded-full flex items-center justify-center text-brand-charcoal mb-8 shadow-sm">
              <Mail size={24} />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-serif italic text-brand-charcoal tracking-tight">General Enquiries</h2>
              <p className="text-gray-500 text-lg font-light leading-relaxed">For questions regarding waitlists, ticketing, or upcoming hosted dates.</p>
            </div>
            <a
              href="mailto:info@newcastledigest.com"
              className="inline-flex items-center text-brand-charcoal font-bold text-xs uppercase tracking-widest border-b border-brand-charcoal pb-1 group-hover:pr-4 transition-all"
            >
              Email Experience Team
              <ArrowRight size={14} className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          <div className="group bg-brand-paper border border-soft p-12 md:p-16 space-y-8 hover:border-brand-charcoal transition-all duration-500 shadow-2xl shadow-black/[0.01]">
            <div className="w-16 h-16 glass-panel rounded-full flex items-center justify-center text-brand-charcoal mb-8 shadow-sm">
              <MessageCircle size={24} />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-serif italic text-brand-charcoal tracking-tight">Partnerships</h2>
              <p className="text-gray-500 text-lg font-light leading-relaxed">Own a local venue or business? Let’s talk about building something for the community.</p>
            </div>
            <a
              href="mailto:info@newcastledigest.com"
              className="inline-flex items-center text-brand-charcoal font-bold text-xs uppercase tracking-widest border-b border-brand-charcoal pb-1 group-hover:pr-4 transition-all"
            >
              Email Partnership Team
              <ArrowRight size={14} className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
