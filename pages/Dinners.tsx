
import React, { useEffect, useState } from 'react';
import { ArrowRight, Lock, Plus } from 'lucide-react';
import { FAQ_DATA } from '../constants';

const DINNER_CLUB_FAQS = FAQ_DATA.filter((item) => item.category === 'dinner-club');

const Dinners: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    // Inject HubSpot script
    const script = document.createElement('script');
    script.src = 'https://js-ap1.hsforms.net/forms/embed/442301086.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="pt-20 md:pt-32 mb-24">
          <div className="grid md:grid-cols-12 gap-12 items-end mb-16">
            <div className="md:col-span-7">
              <div className="flex items-center space-x-3 mb-8 overflow-hidden">
                <span className="h-[1px] w-12 bg-gray-200" />
                <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Experiences</span>
              </div>
              <h1 className="text-7xl md:text-[120px] font-serif tracking-tightest leading-[0.85] mb-8 text-brand-charcoal">
                The <br /><span className="serif-display text-gray-300 italic">Dinner Club</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 leading-tight font-light max-w-lg text-balance">
                Nothing locked in yet. Be the first to know when we announce the next one.
              </p>
              <p className="text-base text-gray-500 font-light max-w-lg text-balance mt-6">
                We are between event drops right now. Join the notify list below and we will send details as soon as the next Dinner Club or experience is announced.
              </p>
              <a
                href="#notify-list"
                className="inline-flex items-center mt-8 bg-brand-charcoal text-white px-8 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-black/5"
              >
                Get notified
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
                  <span className="text-[9px] uppercase tracking-widest font-black text-brand-charcoal">No Upcoming Dates</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mb-24">
          <div className="border-t border-soft pt-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400">Past Events</span>
              <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Archive</span>
            </div>
            <div className="p-8 md:p-10 bg-brand-charcoal text-white rounded-2xl shadow-xl shadow-black/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-white/60 mb-2 block">Dinner Club #1</span>
                  <h2 className="text-3xl md:text-4xl font-serif tracking-tight italic mb-2">9 April · Parry Street Garage</h2>
                  <p className="text-white/80 font-light text-sm md:text-base">
                    A curated 30-person dinner for local connection, conversation, and community.
                  </p>
                </div>
                <span className="inline-flex items-center justify-center bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-black">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-24 items-start mb-32">
          <div className="md:col-span-5 space-y-20">
            <div className="space-y-12">
              <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400 block border-b border-soft pb-4">What Happens Next</span>
              <div className="space-y-12">
                {[
                  { title: 'Join The Notify List', text: 'Add your email once and we will alert you when the next Dinner Club date is locked in.' },
                  { title: 'Get Early Notice', text: 'You will be first to hear about new experiences before broader promotion.' },
                  { title: 'Book When Announced', text: 'Once details are confirmed, we will share timing and booking instructions directly.' }
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

            <div className="space-y-6 pt-8 border-t border-soft">
              <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400 block pb-4">Dinner Club FAQ</span>
              {DINNER_CLUB_FAQS.map((item, index) => (
                <div
                  key={index}
                  className={`border-b border-soft transition-all duration-500 overflow-hidden ${openFaqIndex === index ? 'pb-6' : 'pb-4'}`}
                >
                  <button
                    type="button"
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

          <div id="notify-list" className="md:col-span-7 sticky top-32 scroll-mt-32">
            <div className="bg-brand-paper border border-soft p-10 md:p-16 shadow-xl shadow-brand-charcoal/[0.03] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-charcoal" />

              <div className="mb-10 flex items-baseline justify-between">
                <div>
                  <h3 className="text-4xl font-serif mb-2 italic text-brand-charcoal">Be First To Know</h3>
                  <p className="text-gray-400 font-light text-sm">Nothing locked in yet. Join for next-event announcements.</p>
                </div>
                <Lock size={24} className="text-gray-200" />
              </div>

              <div className="hs-form-frame w-full min-h-[400px]" data-region="ap1" data-form-id="49d841f3-2eaa-4e92-acf5-77c66c64ec93" data-portal-id="442301086" />

              <div className="mt-12 pt-8 border-t border-soft">
                <p className="text-[9px] uppercase tracking-widest font-bold text-gray-300 leading-relaxed">
                  Privacy is paramount. We will only email you about newly announced Dinner Club events and experiences.
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
