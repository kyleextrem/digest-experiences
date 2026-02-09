
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="pb-32 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="pt-24 md:pt-40 mb-32">
          <div className="flex items-center space-x-3 mb-10 overflow-hidden">
            <span className="h-[1px] w-12 bg-gray-200"></span>
            <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Legal</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif tracking-tightest leading-[0.8] mb-12 text-brand-charcoal">
            Privacy <br /><span className="serif-display text-gray-300 italic">Policy.</span>
          </h1>
        </header>

        <div className="prose prose-gray max-w-none space-y-16 text-gray-500 font-light text-lg leading-relaxed">
          <section className="space-y-6">
            <h2 className="text-2xl font-serif italic text-brand-charcoal tracking-tight">Data Collection</h2>
            <p>
              We collect your name, email address, and (optionally) your suburb when you join our waitlist. This information is used exclusively to notify you of upcoming Newcastle Digest Experiences.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-serif italic text-brand-charcoal tracking-tight">Data Usage</h2>
            <p>
              We do not sell, rent, or trade your personal information. Your email address is stored securely via our mailing list provider (Beehiiv) and is used only for the purpose for which you provided it.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-serif italic text-brand-charcoal tracking-tight">Event Matching</h2>
            <p>
              Matching questions asked for Dinner Club events are used only to curate seating charts. This data is not stored in our general marketing database and is deleted after the event concludes.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-serif italic text-brand-charcoal tracking-tight">Third Parties</h2>
            <p>
              We use Humanitix for ticket processing. Their privacy policy applies to information provided during the checkout process.
            </p>
          </section>

          <section className="pt-16 border-t border-soft">
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-300">Last updated: May 2024</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
