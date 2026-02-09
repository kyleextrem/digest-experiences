
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MoveUpRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="pb-32 overflow-x-hidden">
      {/* Editorial Hero */}
      <section className="pt-20 md:pt-32 px-6 max-w-7xl mx-auto pb-20">
        <div className="grid md:grid-cols-12 gap-16 md:gap-8 items-start">
          <div className="md:col-span-9 leading-none">
            <div className="flex items-center space-x-3 mb-10 overflow-hidden">
              <span className="h-[1px] w-12 bg-gray-200"></span>
              <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Curated Experiences</span>
            </div>
            <h1 className="text-7xl sm:text-8xl md:text-[140px] font-serif leading-[0.85] tracking-tightest mb-12 text-brand-charcoal">
              A better way <br />
              <span className="serif-display text-gray-300">to connect.</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-500 max-w-2xl leading-tight font-light text-balance mb-12">
              Simple community gatherings hosted by Newcastle Digest. Intentional moments built for our local community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/dinners"
                className="bg-brand-charcoal text-white px-8 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform active:scale-95 flex items-center shadow-lg shadow-black/5"
              >
                Join Dinner Club
                <ArrowRight size={14} className="ml-3" />
              </Link>
              <Link
                to="/events"
                className="border border-soft px-8 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-brand-clay transition-colors flex items-center"
              >
                Social Events
              </Link>
            </div>
          </div>

          <div className="md:col-span-3 pt-12 md:pt-0 hidden md:block">
            <div className="sticky top-40 space-y-12">
              <div className="space-y-4">
                <h4 className="text-[9px] uppercase tracking-[0.2em] font-black text-gray-400">Next Table</h4>
                <p className="text-sm font-serif italic text-gray-500 max-w-[150px]">Waitlist members notified monthly.</p>
              </div>
              <div className="space-y-4 border-t border-soft pt-8">
                <h4 className="text-[9px] uppercase tracking-[0.2em] font-black text-gray-400">Location</h4>
                <p className="text-sm font-serif italic text-gray-500">Newcastle, NSW</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 px-6 md:px-0 bg-brand-clay/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="md:col-span-6 order-2 md:order-1">
            <div className="p-8 md:p-20 bg-brand-paper shadow-2xl shadow-black/5 border border-soft relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <MoveUpRight size={24} className="text-gray-200 group-hover:text-brand-charcoal transition-colors" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight text-brand-charcoal mb-8 italic">
                "No pressure to be anyone other than yourself."
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed font-light mb-8 max-w-sm">
                We host casual gatherings that actually feel like Newcastle. Small groups, local spots, and genuine interaction.
              </p>
              <div className="flex space-x-12 pt-8 border-t border-soft">
                <div className="space-y-1">
                  <span className="text-2xl font-serif text-brand-charcoal">01</span>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Curation</p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-serif text-brand-charcoal">02</span>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Community</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-6 space-y-12 order-1 md:order-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400 block mb-4">The Philosophy</span>
            <h2 className="text-5xl md:text-7xl font-serif tracking-tightest leading-[0.9] text-brand-charcoal">
              Meet locals, <br />
              <span className="serif-display text-gray-300">beyond the feed.</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-tight">Intentionality</h3>
                <p className="text-gray-500 leading-relaxed font-light text-sm">
                  Everything from the venue selection to the seating plan is thought through so you don't have to.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-tight">Accessibility</h3>
                <p className="text-gray-500 leading-relaxed font-light text-sm">
                  A mix of free and paid sessions. We believe connection shouldn't always have a paywall.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-4 block">Select Experiences</span>
            <h2 className="text-5xl md:text-6xl font-serif tracking-tightest leading-none text-brand-charcoal">Choose your path.</h2>
          </div>
          <p className="text-gray-400 font-serif italic max-w-xs text-right hidden md:block">
            Limited capacity gatherings. Recommended for those new to town or looking for more depth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* Card 1: Dinner Club */}
          <Link to="/dinners" className="group block space-y-10">
            <div className="overflow-hidden aspect-[4/5] relative glass-panel border border-soft shadow-xl shadow-black/[0.02]">
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200"
                alt="Dinner table setting"
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              />
              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div className="bg-brand-paper/95 backdrop-blur px-5 py-3 border border-soft">
                  <span className="text-[10px] uppercase tracking-widest font-black text-brand-charcoal">Waitlist Only</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-5xl font-serif text-brand-charcoal group-hover:italic transition-all">Dinner Club</h3>
                <span className="h-[1px] flex-grow mx-8 bg-gray-100 hidden sm:block"></span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">01</span>
              </div>
              <p className="text-gray-500 max-w-sm text-lg font-light leading-relaxed">Small group curated dinners at Newcastle's premier local venues.</p>
            </div>
          </Link>

          {/* Card 2: Events */}
          <Link to="/events" className="group block space-y-10 md:mt-32">
            <div className="overflow-hidden aspect-[4/5] relative glass-panel border border-soft shadow-xl shadow-black/[0.02]">
              <img
                src="./social-group.jpg"
                alt="Social gathering"
                className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="bg-brand-charcoal px-5 py-3 text-white inline-block">
                  <span className="text-[10px] uppercase tracking-widest font-black">Free & Paid Sessions</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <h3 className="text-5xl font-serif text-brand-charcoal group-hover:italic transition-all">Social Events</h3>
                <span className="h-[1px] flex-grow mx-8 bg-gray-100 hidden sm:block"></span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">02</span>
              </div>
              <p className="text-gray-500 max-w-sm text-lg font-light leading-relaxed">Casual catch-ups, park sessions, and boutique social activities.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 border-t border-soft mt-32">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-6xl md:text-8xl font-serif tracking-tightest leading-none text-brand-charcoal">
            See you at <br />
            <span className="serif-display text-gray-300">the next one.</span>
          </h2>
          <div className="flex justify-center flex-wrap gap-6 pt-8">
            <Link
              to="/dinners"
              className="bg-brand-charcoal text-white px-10 py-6 rounded-full text-xs uppercase tracking-widest font-black shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all"
            >
              Join Dinner Club Waitlist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
