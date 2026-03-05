import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Utensils, Plus } from 'lucide-react';
import DinnerClubQuiz from '../components/DinnerClubQuiz';
import { FAQ_DATA } from '../constants';

const DINNER_CLUB_FAQS = FAQ_DATA.filter((item) => item.category === 'dinner-club');

const DinnerClubApril9: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  return (
    <div className="pb-32 px-6 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <header className="pt-20 md:pt-32 mb-20">
          <div className="flex items-center space-x-3 mb-8 overflow-hidden">
            <span className="h-[1px] w-12 bg-gray-200" />
            <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">First Dinner Club</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif tracking-tightest leading-[0.9] mb-8 text-brand-charcoal">
            Parry Street <br /><span className="serif-display text-gray-300 italic">Garage</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-500 font-light leading-tight mb-10 text-balance">
            Wednesday 9 April · Newcastle
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 bg-brand-charcoal text-white px-5 py-2.5 rounded-full">
              <Users size={14} />
              <span className="text-[10px] uppercase tracking-widest font-black">Limited to first 30 people</span>
            </div>
            <a
              href="#personality-quiz"
              className="inline-flex items-center gap-2 bg-brand-charcoal text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform"
            >
              Book your seat →
            </a>
          </div>
        </header>

        {/* Event details card */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-8 p-8 md:p-10 bg-brand-paper border border-soft shadow-xl shadow-black/[0.02]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-clay/30 flex items-center justify-center flex-shrink-0">
                  <Calendar size={20} className="text-brand-charcoal" />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">Date & time</h3>
                  <p className="text-lg font-serif italic text-brand-charcoal">Wednesday 9 April 2025</p>
                  <p className="text-gray-500 font-light text-sm mt-1">Time TBC — you’ll receive details after booking.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-clay/30 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-brand-charcoal" />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">Venue</h3>
                  <p className="text-lg font-serif italic text-brand-charcoal">Parry Street Garage</p>
                  <p className="text-gray-500 font-light text-sm mt-1">Newcastle, NSW</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-clay/30 flex items-center justify-center flex-shrink-0">
                  <Utensils size={20} className="text-brand-charcoal" />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-1">What’s included</h3>
                  <p className="text-gray-500 font-light text-sm leading-relaxed">
                    Your booking secures a seat at the table, plus an optional invite to after-dinner drinks. You’ll pay for your own food and drinks at the venue. Booking fee $15 per person.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[320px] overflow-hidden bg-brand-clay/20 rounded-lg border border-soft">
              <img
                src="/venue/venue-interior.png"
                alt="Parry Street Garage — industrial space with communal tables and warm lighting"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-charcoal/80 to-transparent text-white">
                <span className="text-[10px] uppercase tracking-widest font-black">First 30 only</span>
              </div>
            </div>
          </div>
        </section>

        {/* Personality quiz – Step 1 to book */}
        <section id="personality-quiz" className="scroll-mt-32 mb-24">
          <div className="border-t border-soft pt-16">
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400 block mb-4">Step 1</span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tightest text-brand-charcoal mb-4">
              Quick <span className="serif-display italic text-gray-300">personality quiz</span>
            </h2>
            <p className="text-gray-500 font-light text-lg max-w-xl mb-10">
              So we can curate the table. Your answers won't be shared publicly.
            </p>
            <DinnerClubQuiz />
          </div>
        </section>

        {/* Venue gallery */}
        <section className="mb-24">
          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400 block mb-4">The venue</span>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tightest text-brand-charcoal mb-8">
            Parry Street <span className="serif-display italic text-gray-300">Garage</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="aspect-[4/3] overflow-hidden rounded-lg border border-soft">
              <img
                src="/venue/venue-interior.png"
                alt="Industrial-chic space with communal tables and pendant lighting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg border border-soft">
              <img
                src="/venue/venue-atmosphere.png"
                alt="Warm dining atmosphere with brick walls and intimate seating"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg border border-soft">
              <img
                src="/venue/venue-dining.png"
                alt="Shared plates and drinks at the table"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Dinner Club FAQs */}
        <section className="mb-24">
          <div className="border-t border-soft pt-16">
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400 block mb-4">Dinner Club FAQ</span>
            <div className="space-y-0">
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
        </section>

        {/* Back to Dinner Club */}
        <div className="border-t border-soft pt-12">
          <Link
            to="/dinners"
            className="inline-flex items-center text-brand-charcoal font-bold text-xs uppercase tracking-widest border-b border-brand-charcoal pb-1 hover:italic transition-all"
          >
            <ArrowRight size={14} className="mr-2 rotate-180" />
            Back to Dinner Club
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DinnerClubApril9;
