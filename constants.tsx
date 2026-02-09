
import React from 'react';
import { HostedEvent } from './types';

export const MOCK_EVENTS: HostedEvent[] = []; // Intentionally empty for now

export type FAQCategory = 'general' | 'dinner-club';

export interface FAQItem {
  question: string;
  answer: string;
  category?: FAQCategory;
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Are these the same events listed in the weekly newsletter?',
    answer: 'No. The newsletter lists many great things happening around the city. This site is exclusively for events hosted and run by the Newcastle Digest team personally.',
    category: 'general'
  },
  {
    question: 'What do these events cost?',
    answer: 'It depends. We host a mixture of free community meetups (like park pilates) and ticketed socials (like happy hours or dinners) where we need to cover venue or food costs.',
    category: 'general'
  },
  {
    question: 'How does the Dinner Club work?',
    answer: 'Dinner Club is our flagship small-group experience. You join the waitlist, and when we confirm a venue and date, we invite waitlist members to book. We curate the seating so you sit with like-minded locals.',
    category: 'dinner-club'
  },
  {
    question: "What's included?",
    answer: "Your booking secures a seat at a curated dinner, plus an optional invite to after-dinner drinks. You'll pay for your own food and drinks at the restaurant.",
    category: 'dinner-club'
  },
  {
    question: 'How much does the dinner club cost?',
    answer: "The booking fee is $15.99 per person, per dinner. You'll cover your own food and drinks at the restaurant.",
    category: 'dinner-club'
  },
  {
    question: 'Can I come alone?',
    answer: "Absolutely. Most people do. Whether it's a free meetup or a ticketed dinner, we handle the hosting so it never feels awkward to arrive solo.",
    category: 'general'
  },
  {
    question: 'What is your refund policy?',
    answer: "Plans change — we get it. You can cancel up to 72 hours before the dinner for a full refund by using the Cancel button on your dashboard. If you cancel after that, we'll still release your seat so the table can stay balanced, but we won't be able to issue a refund.",
    category: 'dinner-club'
  }
];
