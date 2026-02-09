
import React from 'react';
import { ArrowUpRight, Users, Calendar } from 'lucide-react';

const Events: React.FC = () => {
  return (
    <div className="pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="pt-20 md:pt-32 mb-20">
          <div className="flex items-center space-x-3 mb-8 overflow-hidden">
            <span className="h-[1px] w-12 bg-gray-200"></span>
            <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Social Calendar</span>
          </div>
          <div className="grid md:grid-cols-12 gap-16 items-end">
            <div className="md:col-span-8">
              <h1 className="text-7xl md:text-[120px] font-serif tracking-tightest leading-[0.85] mb-8 text-brand-charcoal">
                Social <br /><span className="serif-display text-gray-300 italic">Activities</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 leading-tight font-light max-w-lg text-balance">
                A mixture of free community catch-ups and curated hosted sessions. Relaxed, local, and intentional.
              </p>
            </div>
            <div className="md:col-span-4 hidden md:block">
              <div className="flex justify-end">
                <div className="w-32 h-32 bg-brand-clay rounded-full flex items-center justify-center p-6 text-center shadow-inner">
                  <span className="text-[9px] uppercase tracking-widest font-black text-brand-charcoal leading-tight">Monthly <br />Release</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid md:grid-cols-12 gap-12 lg:gap-24 items-center mb-32 border-y border-soft py-20">
          <div className="md:col-span-6 space-y-12 order-2 md:order-1">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-brand-charcoal text-white px-4 py-2 rounded-full">
                <Calendar size={12} />
                <span className="text-[9px] uppercase tracking-widest font-black">Release Cycle</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif leading-tight text-brand-charcoal">Simple formats, <br />high connection.</h2>
              <p className="text-gray-500 font-light text-xl leading-relaxed max-w-md">
                From free Saturday morning meetups in the park to boutique Friday happy hours at our favorite local spots.
              </p>
              <p className="text-gray-400 font-serif italic text-lg leading-relaxed">
                "No high-production stress, just local people meeting up."
              </p>
            </div>
            <div className="pt-4">
              <a
                href="https://events.humanitix.com/host/newcastle-digest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between bg-brand-charcoal text-white py-6 px-10 rounded-full group hover:scale-105 transition-all shadow-xl shadow-black/10"
              >
                <span className="font-bold text-xs uppercase tracking-widest mr-6">View on Humanitix</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="md:col-span-6 order-1 md:order-2">
            <div className="aspect-[4/5] bg-brand-paper overflow-hidden relative glass-panel border border-soft shadow-2xl shadow-black/[0.03]">
              <img
                src="./social-group.jpg"
                alt="Community group"
                className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10">
                <div className="bg-white/95 backdrop-blur-md p-8 border border-soft shadow-xl max-w-[280px]">
                  <div className="flex items-center space-x-3 mb-2">
                    <Users size={14} className="text-gray-300" />
                    <span className="text-[9px] uppercase tracking-widest font-black text-gray-300">Digest Hosted</span>
                  </div>
                  <h4 className="text-2xl font-serif italic text-brand-charcoal mb-4 text-balance">Intentional Gatherings</h4>
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed">WE HANDLE THE HOSTING SO IT NEVER FEELS AWKWARD TO ARRIVE SOLO.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-brand-clay/[0.15] border border-soft text-center px-6 relative overflow-hidden">
          <div className="absolute -top-24 -left-20 w-64 h-64 bg-brand-paper rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-20 w-64 h-64 bg-brand-paper rounded-full opacity-50 blur-3xl"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-10">
            <h3 className="text-5xl md:text-6xl font-serif italic text-brand-charcoal tracking-tightest">Stay in the loop.</h3>
            <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
              New dates are released first via our weekly newsletter. Don't miss the next lock-in.
            </p>
            <div className="w-full max-w-md mx-auto pt-4">
              <div className="bg-white p-2 rounded-full border border-soft shadow-sm flex items-center">
                <iframe
                  src="https://embeds.beehiiv.com/e1030bd0-e867-42b4-b64e-c3b75defc0d9?slim=true"
                  data-test-id="beehiiv-embed"
                  height="52"
                  frameBorder="0"
                  scrolling="no"
                  style={{ margin: 0, borderRadius: 0, backgroundColor: 'transparent', width: '100%' }}
                  title="Newsletter Subscription"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;
