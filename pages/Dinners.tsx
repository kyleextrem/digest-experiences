
import React, { useEffect, useState } from 'react';
import { ArrowRight, Lock, Plus } from 'lucide-react';
import { FAQ_DATA } from '../constants';

const DINNER_CLUB_FAQS = FAQ_DATA.filter((item) => item.category === 'dinner-club');

const Dinners: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    // Inject HubSpot script
    const script = document.createElement('script');
    script.src = "https://js-ap1.hsforms.net/forms/embed/442301086.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* New Header Layout with Hero Image */}
        <header className="pt-20 md:pt-32 mb-24">
          <div className="grid md:grid-cols-12 gap-12 items-end mb-16">
            <div className="md:col-span-7">
              <div className="flex items-center space-x-3 mb-8 overflow-hidden">
                <span className="h-[1px] w-12 bg-gray-200"></span>
                <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Flagship Experience</span>
              </div>
              <h1 className="text-7xl md:text-[120px] font-serif tracking-tightest leading-[0.85] mb-8 text-brand-charcoal">
                The <br /><span className="serif-display text-gray-300 italic">Dinner Club</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 leading-tight font-light max-w-lg text-balance">
                Curated evenings at Newcastle’s most interesting venues. Small group dining for the curious and the connected.
              </p>
              <p className="text-base text-gray-500 font-light max-w-lg text-balance mt-6">
                Dinner Club is in its early stages — we're building the waitlist and waiting for sign-ups and numbers before we lock in dates and venues. Join the registry below to be first in line when we launch.
              </p>
              <a
                href="#request-access"
                className="inline-flex items-center mt-8 bg-brand-charcoal text-white px-8 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-black/5"
              >
                Request access
                <ArrowRight size={14} className="ml-3" />
              </a>
            </div>
            <div className="md:col-span-5 relative">
              <div className="aspect-[4/3] overflow-hidden bg-brand-clay/20 relative glass-panel border border-soft shadow-2xl shadow-black/[0.02]">
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000"
                  alt="Dinner Club Setting"
                  className="w-full h-full object-cover grayscale-[0.2] contrast-[1.05]"
                />
                <div className="absolute bottom-6 right-6 bg-brand-paper/90 backdrop-blur px-4 py-2 border border-soft">
                  <span className="text-[9px] uppercase tracking-widest font-black text-brand-charcoal">Waitlist Only</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-24 items-start mb-32">
          {/* Left Column: Process */}
          <div className="md:col-span-5 space-y-20">
            <div className="space-y-12">
              <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400 block border-b border-soft pb-4">The Format</span>
              <div className="space-y-12">
                {[
                  { title: "The Registry", text: "Join the waitlist to receive private invitations. We release new dates monthly to early members." },
                  { title: "The Invitation", text: "Receive a direct link to book your seat. No public tickets, ever." },
                  { title: "The Curation", text: "A brief matching process ensures every table is matched for genuine connection." }
                ].map((step, idx) => (
                  <div key={idx} className="group space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-serif italic text-gray-200 group-hover:text-brand-charcoal transition-colors">0{idx + 1}</span>
                      <h3 className="font-bold text-sm tracking-tight uppercase">{step.title}</h3>
                    </div>
                    <p className="text-gray-500 font-light leading-relaxed text-base max-w-xs">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10 border-l-2 border-brand-charcoal bg-brand-clay/10 italic font-serif text-xl text-brand-ink leading-snug">
              "Providing the structure & curation, so you can just provide the presence."
            </div>

            {/* Dinner Club FAQs */}
            <div className="space-y-6 pt-8 border-t border-soft">
              <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400 block pb-4">Dinner Club FAQ</span>
              {DINNER_CLUB_FAQS.map((item, index) => (
                <div
                  key={index}
                  className={`border-b border-soft transition-all duration-500 overflow-hidden ${openFaqIndex === index ? 'pb-6' : 'pb-4'}`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full text-left py-3 flex items-center justify-between group"
                  >
                    <span className={`text-base font-serif transition-all duration-500 ${openFaqIndex === index ? 'text-brand-charcoal italic' : 'text-gray-500 group-hover:text-brand-charcoal'}`}>
                      {item.question}
                    </span>
                    <div className={`transition-transform duration-500 flex-shrink-0 ml-4 ${openFaqIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                      <Plus size={18} className={openFaqIndex === index ? 'text-brand-charcoal' : 'text-gray-300'} />
                    </div>
                  </button>
                  <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden ${openFaqIndex === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-500 leading-relaxed text-sm font-light max-w-md pt-2">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Integrated Form */}
          <div id="request-access" className="md:col-span-7 sticky top-32 scroll-mt-32">
            <div className="bg-brand-paper border border-soft p-10 md:p-16 shadow-xl shadow-brand-charcoal/[0.03] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-charcoal"></div>

              <div className="mb-10 flex items-baseline justify-between">
                <div>
                  <h3 className="text-4xl font-serif mb-2 italic text-brand-charcoal">Request Access</h3>
                  <p className="text-gray-400 font-light text-sm">Invitations are released in sequential order.</p>
                </div>
                <Lock size={24} className="text-gray-200" />
              </div>

              {/* Form Container */}
              <div className="hs-form-frame w-full min-h-[400px]" data-region="ap1" data-form-id="49d841f3-2eaa-4e92-acf5-77c66c64ec93" data-portal-id="442301086"></div>

              <div className="mt-12 pt-8 border-t border-soft">
                <p className="text-[9px] uppercase tracking-widest font-bold text-gray-300 leading-relaxed">
                  Privacy is paramount. Your registration grants you early access to private bookings across the Digest network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dinners;
