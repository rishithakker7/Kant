import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, CheckCircle } from 'lucide-react';
import logo from '../assets/black-logo.png';
import storyVisual from '../assets/four decades.png';

const VM_CARDS = [
  {
    index: '01',
    Icon: Eye,
    title: 'Our Vision',
    status: 'North Star',
    tagline: 'Strategic. Trusted. Consistent.',
    body: 'To be a trusted advertising partner known for strategic communication, strong media understanding, and consistent delivery across platforms.',
    tags: ['Strategy', 'Media', 'Trust'],
    accent: '#E5000F',
  },
  {
    index: '02',
    Icon: Target,
    title: 'Our Mission',
    status: 'Active',
    tagline: 'One agency. Every medium.',
    body: null,
    bullets: [
      'Deliver knowledge-driven advertising solutions',
      'Provide prompt and reliable service',
      'Offer integrated advertising solutions across media',
      'Build long-term client relationships',
      'Continuously evolve with changing media and market trends',
    ],
    tags: ['Integrated', 'Results', 'Growth'],
    accent: '#E5000F',
  },
];

function VMCardFace({ card, variant = 'base' }) {
  const { Icon, title, tagline, body, bullets, tags } = card;

  return (
    <div className={`vmc-face vmc-face--${variant}`}>
      <div className="vmc-face__header">
        <div className="vmc-face__icon" aria-hidden="true">
          <Icon size={38} strokeWidth={1.7} />
        </div>
        <h3 className="vmc-face__title">{title}</h3>
      </div>

      <p className="vmc-face__tagline">{tagline}</p>

      <div className="vmc-face__content">
        {body && <p className="vmc-face__desc">{body}</p>}
        {bullets && (
          <ul className="vmc-face__bullets">
            {bullets.map((b) => (
              <li key={b}>
                <CheckCircle size={14} strokeWidth={2.5} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="vmc-face__footer">
        {tags.map((tag) => (
          <span key={tag} className="vmc-face__tag">
            {tag}
          </span>
        ))}
      </div>

    </div>
  );
}

function VMCard({ card }) {
  const [isOpen, setIsOpen] = useState(false);
  const isTouchLike = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none), (pointer: coarse)').matches;

  return (
    <motion.div
      className={`vmc-card${isOpen ? ' vmc-card--open' : ''}`}
      onHoverStart={() => {
        if (!isTouchLike()) setIsOpen(true);
      }}
      onHoverEnd={() => {
        if (!isTouchLike()) setIsOpen(false);
      }}
      onClick={() => {
        if (isTouchLike()) setIsOpen((prev) => !prev);
      }}
      onFocus={() => {
        if (!isTouchLike()) setIsOpen(true);
      }}
      onBlur={() => {
        if (!isTouchLike()) setIsOpen(false);
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
      tabIndex={0}
      aria-expanded={isOpen}
    >
      <VMCardFace card={card} />
      <div className="vmc-card__overlay">
        <VMCardFace card={card} variant="overlay" />
      </div>
    </motion.div>
  );
}

const CORE_VALUES = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'INTEGRITY',
    desc: 'Honest, transparent and ethical in everything we do.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    title: 'KNOWLEDGE',
    desc: 'Deep understanding of media and markets.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'COMMITMENT',
    desc: 'Dedicated to client success and long-term partnerships.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    title: 'SPEED',
    desc: 'Prompt service and timely execution always.',
  },
];

function VisionMissionCards() {
  return (
    <section className="section vmc-section">
      <div className="container">
        <span className="section-label accent center">Vision &amp; Mission</span>
        <div className="vmc-grid">
          {VM_CARDS.map((card) => (
            <VMCard key={card.index} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="about">

      {/* ── PAGE BANNER ──────────────────────────── */}
      <section className="page-banner--dark">
        <div className="container page-banner__inner">
          <div className="page-banner__content">
            <h1 className="page-banner__title">ABOUT KANT<br />ADVERTISING</h1>
            <p className="page-banner__subtitle">
              Established in 1982. Driven by knowledge.<br />Defined by trust.
            </p>
          </div>
          <div className="page-banner__image">
            <img src={logo} alt="KANT – The Agency That Can" className="page-banner__logo" />
          </div>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────── */}
      <section className="section section--story-dark">
        <div className="container about-story">
          <div className="about-story__left">
            <span className="section-label accent">Our Story</span>
            <h2>Four Decades<br />of Impact</h2>
            <p>
              Established in 1982, KANT Advertising is a trusted advertising agency in India with
              a strong foundation in print media and integrated communication solutions. What began
              as a print media specialist has evolved into a full-service advertising agency with a
              360 approach to communication, while staying rooted in our core strength — understanding
              media deeply.
            </p>
            <p>
              Our strength lies in our deep understanding of print across India, strong media
              relationships, strategic thinking and prompt execution. Over the years, we have
              built long-term relationships with clients who trust us to deliver, every single time.
              Our longevity reflects consistency, credibility, execution, and client trust.
            </p>
          </div>
          <div className="about-story__right">
            <div className="story-visual">
              <img
                src={storyVisual}
                alt="KANT Advertising — integrated campaign across print, outdoor, digital, radio, television and production"
                className="story-visual__img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────── */}
      <section className="section section--gray">
        <div className="container">
          <span className="section-label accent center">Our Core Values</span>
          <div className="values-grid">
            {CORE_VALUES.map((val, i) => (
              <div className="value-card" key={i}>
                <div className="value-card__icon">{val.icon}</div>
                <h4 className="value-card__title">{val.title}</h4>
                <p className="value-card__desc">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION — CARDS ─────────────── */}
      <VisionMissionCards />

    </div>
  );
}
