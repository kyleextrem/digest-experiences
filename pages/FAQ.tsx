
import React, { useState } from 'react';
import { FAQ_DATA } from '../constants';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="pt-24 md:pt-40 mb-32 text-center">
          <div className="flex justify-center items-center space-x-3 mb-10 overflow-hidden">
            <span className="h-[1px] w-12 bg-gray-200"></span>
            <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Assistance</span>
            <span className="h-[1px] w-12 bg-gray-200"></span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif tracking-tightest leading-none mb-10 text-brand-charcoal">
            Frequently <br /><span className="serif-display text-gray-300 italic">Asked</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 leading-snug font-light max-w-xl mx-auto text-balance">
            Everything you need to know about our hosted experiences and the membership process.
          </p>
        </header>

        <div className="space-y-6 max-w-3xl mx-auto">
          {FAQ_DATA.map((item, index) => (
            <div
              key={index}
              className={`border-b border-soft transition-all duration-500 overflow-hidden ${openIndex === index ? 'pb-10' : 'pb-6'
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left py-4 flex items-center justify-between group"
              >
                <span className={`text-xl md:text-2xl font-serif transition-all duration-500 ${openIndex === index ? 'text-brand-charcoal italic' : 'text-gray-400 group-hover:text-brand-charcoal'}`}>
                  {item.question}
                </span>
                <div className={`transition-transform duration-500 ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                  <Plus size={20} className={openIndex === index ? 'text-brand-charcoal' : 'text-gray-300'} />
                </div>
              </button>
              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'
                  }`}
              >
                <p className="text-gray-500 leading-relaxed text-lg font-light max-w-2xl">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-40 p-12 md:p-24 bg-brand-charcoal rounded-[40px] text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
          <div className="relative z-10 space-y-8">
            <h3 className="text-4xl md:text-6xl font-serif italic tracking-tightest">Still curious?</h3>
            <p className="text-white/40 text-lg md:text-xl font-light max-w-lg mx-auto leading-relaxed">
              If you have a specific question about an upcoming event, our team is here to help.
            </p>
            <div className="pt-8">
              <a href="mailto:events@newcastledigest.com" className="inline-block border border-white/20 px-12 py-5 rounded-full hover:bg-white hover:text-brand-charcoal transition-all font-bold text-xs uppercase tracking-widest shadow-2xl">
                Email the team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
