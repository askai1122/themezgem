import React from 'react';
import { Flame, Users, Heart, MapPin, Award, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--gold-line)] font-bold mb-3">
            <Flame className="w-3.5 h-3.5 text-[var(--ember)]" />
            <span>FORT ERIE NEIGHBOURHOOD HOSPITALITY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)] leading-[0.98]">
            THE STORY OF <br />
            <span className="text-[var(--ember)]">THE MEZ BAR & GRILL</span>
          </h1>
          <p className="font-serif-accent text-lg sm:text-xl text-[var(--flour)]/80 italic mt-6 leading-relaxed">
            Good Food. Good People. Good Times. Cooked live, served fast, felt good.
          </p>
        </div>

        {/* Section 1: The Beginning & Fort Erie Rooted */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/images/gallery/gallery-01.jpg"
              alt="The Mez Entrance & Bar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-xs uppercase font-bold tracking-widest text-[var(--ember)]">
                ESTABLISHED IN FORT ERIE
              </span>
              <span className="text-lg font-bold uppercase text-[var(--flour)] font-display">
                1267 Garrison Road
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs uppercase font-bold tracking-widest text-[var(--smoke)]">
              CHAPTER 01 · THE BEGINNING
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase font-display text-[var(--flour)] leading-tight">
              A LOCAL ANCHOR FOR THE COMMUNITY
            </h2>
            <p className="text-sm text-[var(--flour)]/80 leading-relaxed">
              The Mez Bar & Grill was created with a clear, honest vision: bring Fort Erie a vibrant gathering place where friends, neighbours, and families could enjoy outstanding scratch cooking, icy cold drinks, and genuine warmth.
            </p>
            <p className="text-sm text-[var(--smoke)] leading-relaxed">
              No quiet velvet ropes or pretentious fine dining — just high-heat flat-top smashing, crispy wings tossed in bold sauces, and welcoming tables where everyone feels like a regular on their very first visit.
            </p>
          </div>
        </div>

        {/* Section 2: Meet The Team (Real Verified Team Photo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 lg:order-2 relative aspect-[4/3] overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="/images/restaurant/team-photo.jpg"
              alt="The Mez Team"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-xs uppercase font-bold tracking-widest text-[var(--gold-line)]">
                VERIFIED TEAM PHOTO
              </span>
              <span className="text-lg font-bold uppercase text-[var(--flour)] font-display">
                The Hands Behind The Pass
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 lg:order-1 space-y-5">
            <div className="text-xs uppercase font-bold tracking-widest text-[var(--smoke)]">
              CHAPTER 02 · MEET THE TEAM
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase font-display text-[var(--flour)] leading-tight">
              HEART & HUSTLE IN EVERY DISH
            </h2>
            <p className="text-sm text-[var(--flour)]/80 leading-relaxed">
              Our kitchen crew and front-of-house staff are the pulse of The Mez. Every burger pattie smashed on the grill, every order of beer-battered cod, and every cold Niagara draft poured reflects genuine team dedication.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 bg-[#2B1D14] border border-white/10">
                <Users className="w-5 h-5 text-[var(--ember)] mb-2" />
                <div className="font-bold text-[var(--flour)] uppercase">Locally Staffed</div>
                <div className="text-[11px] text-[var(--smoke)] mt-0.5">Proud Fort Erie hospitality pros</div>
              </div>
              <div className="p-4 bg-[#2B1D14] border border-white/10">
                <Heart className="w-5 h-5 text-[var(--gold-line)] mb-2" />
                <div className="font-bold text-[var(--flour)] uppercase">Family Welcoming</div>
                <div className="text-[11px] text-[var(--smoke)] mt-0.5">Kids menu, patio seating & group booths</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: The Food Philosophy */}
        <div className="bg-[#2B1D14] border border-white/10 p-8 sm:p-14">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="text-xs uppercase font-bold tracking-widest text-[var(--ember)]">
              CHAPTER 03 · THE FOOD PHILOSOPHY
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase font-display text-[var(--flour)]">
              “HONEST INGREDIENTS. LIVE FIRE.”
            </h2>
            <p className="text-sm sm:text-base text-[var(--flour)]/85 leading-relaxed">
              We smash 100% fresh Canadian beef patties with blistering heat to lock in maximum juiciness and crispy lace edges. We serve tender 8oz and 12oz steaks sizzling directly over golden fries, and partner with The Cheesecake Factory to deliver world-class desserts.
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs font-bold uppercase tracking-wider text-[var(--gold-line)]">
              <span>· 100% Fresh Beef</span>
              <span>· Beer-Battered Seafood</span>
              <span>· The Cheesecake Factory Slices</span>
              <span>· Daily Hours 12PM–10PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
