import React, { useState, useEffect } from 'react';

type QuestionSingle = { id: string; type: 'single'; text: string; hint?: string; options: string[] };
type QuestionMulti = { id: string; type: 'multi'; text: string; hint?: string; options: string[] };
type QuestionEmoji = { id: string; type: 'emoji'; text: string };
type QuestionYear = { id: string; type: 'year'; text: string; hint?: string };
type Question = QuestionSingle | QuestionMulti | QuestionEmoji | QuestionYear;

const QUESTIONS: Question[] = [
  { id: 'goals', type: 'multi', text: 'What are you hoping for out of this experience?', hint: 'Select all that apply', options: ['Make new friends', 'Looking for someone special', 'Build professional network'] },
  { id: 'vibe', type: 'single', text: 'I hope my dinner experience is:', options: ['Playful — light, relaxed conversations', 'Intellectual — deep, engaging conversations', 'A mix of both'] },
  { id: 'gender', type: 'single', text: "What's your gender?", options: ['Woman', 'Man', 'Non-binary'] },
  { id: 'budget', type: 'single', text: "What's your ideal dinner budget?", options: ['$$ — Casual sitdown (neighborhood bistro, ramen, tapas)', '$$$ — Upscale dining (steakhouse, seafood, tasting menus)'] },
  { id: 'diet', type: 'single', text: 'Diet', options: ['Vegan', 'Vegetarian', 'Pescatarian', 'Everything / Omnivore'] },
  { id: 'allergies', type: 'multi', text: 'Allergies', hint: 'Select all that apply', options: ['None', 'Shellfish', 'Peanut', 'Gluten / Wheat', 'Dairy', 'Soy', 'Other'] },
  { id: 'currentGoals', type: 'multi', text: 'What goals are you focused on currently?', hint: 'Select all that apply', options: ['Health', 'Relationships', 'Professional', 'Financial', "Just good ol' fun"] },
  { id: 'groupStyle', type: 'single', text: 'In group settings, are you more likely to:', options: ['Listen carefully before speaking', 'Share ideas to spark conversation', 'Make sure everyone has a chance to be heard'] },
  { id: 'alcohol', type: 'single', text: 'How often do you drink alcohol?', options: ['Sober/Never', 'Sober curious/rarely drink', 'I like to have a few drinks out'] },
  { id: 'friendStyle', type: 'single', text: 'When it comes to friends, are you part of:', options: ['One tight-knit friend group', "I'm part of several diverse friend groups"] },
  { id: 'meaning', type: 'single', text: 'What makes life meaningful to you?', options: ['Pursuing big goals and creating impact', 'Enjoying the small, beautiful moments', 'Exploring and understanding different ideas and cultures'] },
  { id: 'personality', type: 'single', text: 'Which one best describes you?', options: ['Connector – I bring people together and love introducing others', 'Maven – I gather knowledge and love sharing useful info', "Captain – I'm persuasive, enthusiastic, and good at getting people on board", "Supporter – I don't often make the plans but I'm enthusiastic joining in"] },
  { id: 'introExtro', type: 'single', text: 'Which do you lean more towards?', options: ['Introverted', 'Extroverted'] },
  { id: 'emoji', type: 'emoji', text: 'How would you describe yourself with an emoji?' },
  { id: 'birthYear', type: 'year', text: 'What year were you born?', hint: "This isn't made public — your birth year won't be shared." },
];

const EMOJIS = ['😀','😄','😁','😆','😅','🤣','😂','😊','😇','🥰','😍','🤩','😘','😗','😙','😚','🙂','🤗','🤭','🤫','🤔','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','🥱','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱','🥵','🥶','😳','🤪','😵','🥴','😠','🤬','😡','🤢','🤮','🤧','😷','🤒','🤕','🤠','🥳','😎','🤓','🧐'];

type Answers = Record<string, string | string[]>;

const HUMANITIX_URL = 'https://events.humanitix.com/newcastle-digest-dinner-club-april';
const API = '/api/dinner-club';

export const DinnerClubQuiz: React.FC = () => {
  const [step, setStep] = useState<'unlock' | 'quiz'>('unlock');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [emojiSearch, setEmojiSearch] = useState('');
  const [unlockEmail, setUnlockEmail] = useState('');
  const [unlockName, setUnlockName] = useState('');
  const [unlockPhone, setUnlockPhone] = useState('');
  const [remaining, setRemaining] = useState<number | null>(null);
  const [soldOut, setSoldOut] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API}/remaining`)
      .then((res) => res.json())
      .then((data) => {
        setRemaining(data.remaining ?? null);
        setSoldOut(!!data.soldOut);
      })
      .catch(() => {});
  }, []);

  const currentQ = QUESTIONS[currentIndex];
  const progress = QUESTIONS.length > 0 ? (currentIndex / QUESTIONS.length) * 100 : 0;

  const setAnswer = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const getAnswer = (id: string): string | string[] | undefined => answers[id];

  const canProceed = (): boolean => {
    if (!currentQ || currentQ.type === 'emoji' || currentQ.type === 'year') {
      return !!getAnswer(currentQ.id);
    }
    if (currentQ.type === 'multi') {
      const v = getAnswer(currentQ.id);
      return Array.isArray(v) && v.length > 0;
    }
    return !!getAnswer(currentQ.id);
  };

  const handleNext = async () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: answers._name,
          email: answers._email,
          phone: answers._phone ?? '',
          answers,
        }),
      });
      let data: { success?: boolean; error?: string } = {};
      const contentType = res.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = await res.json().catch(() => ({}));
      }
      if (!res.ok) {
        const msg = typeof data?.error === 'string' ? data.error : res.status === 404 ? "Form API isn't available. If you're testing locally, run vercel dev so the submit API works." : 'Something went wrong. Please try again.';
        setSubmitError(msg);
        setSubmitting(false);
        return;
      }
      if (data?.success) {
        window.location.href = HUMANITIX_URL;
        return;
      }
      setSubmitError(typeof data?.error === 'string' ? data.error : "We couldn't complete your registration. You can book directly at the link below.");
    } catch {
      setSubmitError('Network error. Please try again.');
    }
    setSubmitting(false);
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleUnlock = () => {
    const name = unlockName.trim();
    const email = unlockEmail.trim();
    if (!name || !email) return;
    setAnswers((prev) => ({ ...prev, _name: name, _email: email, _phone: unlockPhone.trim() }));
    setStep('quiz');
  };

  // Step 1: Enter email to unlock questions (or sold out)
  if (step === 'unlock') {
    if (soldOut) {
      return (
        <div className="bg-brand-paper border border-soft rounded-2xl p-10 md:p-14 text-center shadow-xl shadow-black/[0.02] animate-fade-in">
          <span className="text-[10px] uppercase tracking-widest font-black text-gray-400 block mb-4">Dinner Club</span>
          <h2 className="text-3xl md:text-4xl font-serif italic text-brand-charcoal mb-4">This dinner is fully booked.</h2>
          <p className="text-gray-500 font-light text-lg max-w-sm mx-auto leading-relaxed">
            Join the waitlist on the main Dinner Club page to hear about the next one.
          </p>
        </div>
      );
    }
    return (
      <div className="bg-brand-paper border border-soft rounded-2xl p-8 md:p-12 shadow-xl shadow-black/[0.02] animate-fade-in">
        <span className="text-[10px] uppercase tracking-widest font-black text-gray-400 block mb-2">Get started</span>
        <h2 className="text-2xl md:text-3xl font-serif italic text-brand-charcoal mb-2">Unlock the questionnaire</h2>
        {remaining !== null && remaining <= 5 && (
          <p className="text-brand-charcoal font-medium text-sm mb-4">Only {remaining} spot{remaining !== 1 ? 's' : ''} left.</p>
        )}
        <p className="text-gray-500 font-light text-sm mb-8 leading-relaxed">
          Enter your details below to start. We'll use this to match you with the right table and send your booking confirmation.
        </p>
        <div className="space-y-5 mb-8">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-charcoal mb-2">Your name</label>
            <input
              type="text"
              value={unlockName}
              onChange={(e) => setUnlockName(e.target.value)}
              placeholder="Jane Smith"
              className="w-full px-4 py-3 border border-soft rounded-lg font-sans text-brand-charcoal placeholder-gray-400 focus:outline-none focus:border-brand-charcoal transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-charcoal mb-2">Email address</label>
            <input
              type="email"
              value={unlockEmail}
              onChange={(e) => setUnlockEmail(e.target.value)}
              placeholder="jane@example.com"
              className="w-full px-4 py-3 border border-soft rounded-lg font-sans text-brand-charcoal placeholder-gray-400 focus:outline-none focus:border-brand-charcoal transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">Phone (optional)</label>
            <input
              type="tel"
              value={unlockPhone}
              onChange={(e) => setUnlockPhone(e.target.value)}
              placeholder="+61 4XX XXX XXX"
              className="w-full px-4 py-3 border border-soft rounded-lg font-sans text-brand-charcoal placeholder-gray-400 focus:outline-none focus:border-brand-charcoal transition-colors"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleUnlock}
          disabled={!unlockName.trim() || !unlockEmail.trim()}
          className="w-full md:w-auto bg-brand-charcoal text-white px-10 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Start questionnaire →
        </button>
      </div>
    );
  }

  // Quiz: current question
  if (!currentQ) return null;

  const isMulti = currentQ.type === 'multi';
  const isSingle = currentQ.type === 'single';
  const isEmoji = currentQ.type === 'emoji';
  const isYear = currentQ.type === 'year';

  return (
    <div className="animate-fade-in">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Question {currentIndex + 1} of {QUESTIONS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-brand-charcoal rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="bg-brand-paper border border-soft rounded-2xl p-8 md:p-10 shadow-xl shadow-black/[0.02]">
        <span className="text-[10px] uppercase tracking-widest font-black text-gray-400 block mb-2">Question {currentIndex + 1}</span>
        <h3 className="text-xl md:text-2xl font-serif text-brand-charcoal leading-snug mb-1">{currentQ.text}</h3>
        {'hint' in currentQ && currentQ.hint && (
          <p className="text-sm text-gray-500 mb-6">{currentQ.hint}</p>
        )}
        {!('hint' in currentQ && currentQ.hint) && (currentQ.type === 'single' || currentQ.type === 'multi') && <div className="mb-6" />}

        {/* Single / Multi options */}
        {(isSingle || isMulti) && (
          <div className="space-y-2">
            {currentQ.options.map((opt) => {
              const selected = isMulti
                ? (Array.isArray(answers[currentQ.id]) && (answers[currentQ.id] as string[]).includes(opt))
                : answers[currentQ.id] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    if (isMulti) {
                      const prev = (answers[currentQ.id] as string[] | undefined) || [];
                      const next = selected ? prev.filter((x) => x !== opt) : [...prev, opt];
                      setAnswer(currentQ.id, next);
                      if (currentQ.id === 'allergies' && opt === 'Other' && !next.includes('Other')) {
                        setAnswers((a) => ({ ...a, allergiesOther: '' }));
                      }
                    } else {
                      setAnswer(currentQ.id, opt);
                    }
                  }}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    selected
                      ? 'border-brand-charcoal bg-brand-clay/20 text-brand-charcoal'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'border-brand-charcoal bg-brand-charcoal' : 'border-gray-300'}`}>
                    {selected && (isMulti ? <span className="text-white text-xs font-bold">✓</span> : <span className="w-1.5 h-1.5 rounded-full bg-white" />)}
                  </span>
                  <span className="font-sans text-sm md:text-base">{opt}</span>
                </button>
              );
            })}
            {/* Allergies: show "Other" free text when Other is selected */}
            {currentQ.id === 'allergies' && isMulti && Array.isArray(answers.allergies) && (answers.allergies as string[]).includes('Other') && (
              <div className="pt-2">
                <label className="block text-[10px] uppercase tracking-widest font-bold text-brand-charcoal mb-2">Please specify your allergy</label>
                <input
                  type="text"
                  value={(answers.allergiesOther as string) ?? ''}
                  onChange={(e) => setAnswers((a) => ({ ...a, allergiesOther: e.target.value }))}
                  placeholder="e.g. Tree nuts, sesame..."
                  className="w-full px-4 py-3 border border-soft rounded-lg font-sans text-brand-charcoal placeholder-gray-400 focus:outline-none focus:border-brand-charcoal transition-colors"
                />
              </div>
            )}
          </div>
        )}

        {/* Emoji picker */}
        {isEmoji && (
          <div>
            <div className="text-4xl text-center mb-4 min-h-[3rem]">{answers.emoji ? String(answers.emoji) : ''}</div>
            <input
              type="text"
              value={emojiSearch}
              onChange={(e) => setEmojiSearch(e.target.value)}
              placeholder="Search or scroll..."
              className="w-full px-4 py-3 border border-soft rounded-xl mb-4 font-sans text-sm focus:outline-none focus:border-brand-charcoal"
            />
            <div className="grid grid-cols-9 gap-1 max-h-52 overflow-y-auto py-2 pr-1">
              {EMOJIS.filter((e) => !emojiSearch || e.includes(emojiSearch)).map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setAnswer('emoji', e)}
                  className={`text-2xl p-1.5 rounded-lg transition-colors ${
                    answers.emoji === e ? 'bg-brand-charcoal/10 ring-2 ring-brand-charcoal' : 'hover:bg-brand-clay/30'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Year select */}
        {isYear && (
          <select
            value={answers.birthYear || ''}
            onChange={(e) => setAnswer('birthYear', e.target.value)}
            className="w-full px-4 py-4 border border-soft rounded-xl font-sans text-brand-charcoal bg-white focus:outline-none focus:border-brand-charcoal appearance-none cursor-pointer"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234A3F35' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
          >
            <option value="">Select a year</option>
            {Array.from({ length: 2007 - 1940 + 1 }, (_, i) => 2007 - i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        )}

        {submitError && (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-red-600 font-medium">{submitError}</p>
            <p className="text-sm text-gray-500">
              You can still{' '}
              <a href={HUMANITIX_URL} target="_blank" rel="noopener noreferrer" className="text-brand-charcoal font-medium underline hover:italic">
                book directly at Humanitix
              </a>
              .
            </p>
          </div>
        )}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-soft">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="text-sm text-gray-500 hover:text-brand-charcoal font-medium flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={() => handleNext()}
            disabled={!canProceed() || submitting}
            className="bg-brand-charcoal text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {submitting ? 'Saving…' : currentIndex === QUESTIONS.length - 1 ? 'Continue →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DinnerClubQuiz;
