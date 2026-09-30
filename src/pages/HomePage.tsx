import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/home/Hero';
import { ThePassStrip } from '../components/home/ThePassStrip';
import { OffTheGrillCarousel } from '../components/home/OffTheGrillCarousel';
import { ScrollScrubVideo } from '../components/motion/ScrollScrubVideo';
import { VerifiedTestimonials } from '../components/home/VerifiedTestimonials';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { AppShowcase } from '../components/home/AppShowcase';
import { ZahrionSalesCTA } from '../components/home/ZahrionSalesCTA';
import { MenuItem } from '../types';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { INITIAL_EVENTS } from '../data/seedData';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onSelectItem: (item: MenuItem) => void;
}

// Subtle motion easing curves
const easeOutQuart = [0.25, 1, 0.5, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOutQuart,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutQuart,
    },
  },
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectItem }) => {
  return (
    <div className="min-h-screen bg-[#15100C] text-[#F3ECDD]">
      {/* 1. Cinematic Video Hero */}
      <Hero onNavigate={onNavigate} />

      {/* 2. The Pass Quick-Action Strip */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <ThePassStrip onNavigate={onNavigate} />
      </motion.div>

      {/* 3. Off The Grill Carousel */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUp}
      >
        <OffTheGrillCarousel onSelectItem={onSelectItem} onNavigate={onNavigate} />
      </motion.div>

      {/* 4. Slogan & Brand Kinetic Statement */}
      <section className="py-20 sm:py-24 bg-[#15100C] border-t border-white/10 text-center relative overflow-hidden">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div
            variants={cardFadeUp}
            className="text-xs uppercase font-bold tracking-[0.3em] text-[var(--smoke)] mb-4"
          >
            FORT ERIE'S NEIGHBOURHOOD KITCHEN
          </motion.div>

          <motion.h2
            variants={cardFadeUp}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)] leading-[1.05] mb-6"
          >
            “THE FLAT-TOP DOESN’T LIE. <br />
            <span className="text-[var(--ember)]">FRESH BEEF. CRISPY WINGS. UNMATCHED VALUE.”</span>
          </motion.h2>

          <motion.p
            variants={cardFadeUp}
            className="font-serif-accent text-lg sm:text-xl text-[var(--flour)]/80 italic max-w-2xl mx-auto"
          >
            Grounded in genuine Canadian hospitality at 1267 Garrison Road. Open daily from noon to 10:00 PM.
          </motion.p>
        </motion.div>
      </section>

      {/* 5. In The Kitchen (Scroll-Scrubbed Video Story) */}
      <ScrollScrubVideo />

      {/* 6. Upcoming Events Strip (DEMO EVENT) */}
      <section className="py-20 bg-[#2B1D14] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--gold-line)] font-bold mb-2">
                <Calendar className="w-4 h-4" />
                <span>COMMUNITY HAPPENINGS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase font-display tracking-tight text-[var(--flour)]">
                UPCOMING GATHERINGS
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/events')}
              className="text-xs font-bold uppercase tracking-wider text-[var(--flour)] hover:text-[var(--ember)] transition-colors flex items-center gap-1.5"
            >
              <span>VIEW ALL EVENTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Staggered Event Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {INITIAL_EVENTS.map((evt) => (
              <motion.div
                key={evt.id}
                variants={cardFadeUp}
                onClick={() => onNavigate('/events')}
                className="bg-[#15100C] border border-white/10 p-6 flex flex-col justify-between hover:border-[var(--ember)] transition-colors cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-[var(--smoke)] mb-3">
                    <span className="text-[var(--ember)]">{evt.category}</span>
                    <span className="text-[var(--smoke)]">[DEMO EVENT]</span>
                  </div>

                  <h3 className="text-lg font-bold uppercase font-display text-[var(--flour)] group-hover:text-[var(--ember)] transition-colors mb-2 leading-snug">
                    {evt.title.replace(' [DEMO EVENT]', '')}
                  </h3>

                  <p className="text-xs text-[var(--smoke)] leading-relaxed line-clamp-2 mb-4">
                    {evt.description.replace('DEMO EVENT — ', '')}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-[var(--flour)]/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[var(--gold-line)]" />
                    <span>{evt.time}</span>
                  </div>
                  <span className="text-[var(--ember)] font-bold text-[11px] uppercase group-hover:translate-x-1 transition-transform">
                    Details →
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Verified Patron Testimonials */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUp}
      >
        <VerifiedTestimonials />
      </motion.div>

      {/* 8. Gallery & Reels Preview */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUp}
      >
        <GalleryGrid />
      </motion.div>

      {/* 9. Mobile App Showcase */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUp}
      >
        <AppShowcase onNavigate={onNavigate} />
      </motion.div>

      {/* 10. ZahrionTech Agency Sales CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <ZahrionSalesCTA />
      </motion.div>
    </div>
  );
};
