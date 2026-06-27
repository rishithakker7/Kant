import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  BadgeCheck,
  X,
} from 'lucide-react';

import bgBranding from '../assets/servicesPage/bg-branding.png';
import bgOutdoor from '../assets/servicesPage/bg-outdoor.png';
import bgPrint from '../assets/servicesPage/bg-print.png';
import bgDigital from '../assets/servicesPage/bg-digital.png';
import bgSocial from '../assets/servicesPage/bg-social.png';
import bgWeb from '../assets/servicesPage/bg-web.png';
import bgProduction from '../assets/servicesPage/bg-production.png';
import bgRealestate from '../assets/servicesPage/bg-realestate.png';
import bgEvents from '../assets/servicesPage/bg-events.png';
import bgCorporate from '../assets/servicesPage/bg-corporate.png';
import bgStrategy from '../assets/servicesPage/bg-strategy.png';

/* ─── Fade-up variant for scroll reveals ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function Reveal({ children, custom = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      custom={custom}
    >
      {children}
    </motion.div>
  );
}

// No local asset yet for Political & Public Campaigns — swap this for the
// real image once you have one (and import it the same way as the others above).
const bgPolitical = 'https://picsum.photos/seed/political/600/400';

/* ─── Services data ─── */
const SERVICES = [
  {
    bg: bgBranding,
    title: 'Branding & Identity',
    kicker: 'Memorable. Differentiated. Built for growth.',
    description:
      'From strategy to visual identity, we create brands that leave lasting impressions and build meaningful connections with audiences.',
    tags: ['Strategy', 'Identity', 'Packaging'],
    services: [
      'Brand Strategy & Positioning',
      'Logo & Identity Design',
      'Rebranding & Brand Refresh',
      'Packaging Design',
      'Brand Communication',
      'Corporate Identity Systems',
    ],
  },
  {
    bg: bgOutdoor,
    title: 'Outdoor Advertising',
    kicker: 'High-impact OOH media for reach and recall.',
    description:
      'Strategically placed outdoor campaigns that put your brand in front of millions, creating visibility where it matters most.',
    tags: ['OOH', 'Transit', 'Signage'],
    services: [
      'Hoardings & Billboards',
      'Unipole & Gantry Advertising',
      'Bus Shelter & Transit Media',
      'Railway & Metro Advertising',
      'Auto & Taxi Branding',
      'Mall & Airport Advertising',
      'Retail Facade Branding',
      'LED Screen Advertising',
      'Signage & Wayfinding',
    ],
  },
  {
    bg: bgPrint,
    title: 'Print Advertising',
    kicker: 'Four decades of print media expertise.',
    description:
      'Print advertising is not just a medium for us — it is a discipline we understand deeply. Our nationwide media relationships help deliver impactful, cost-efficient campaigns.',
    tags: ['Newspapers', 'Magazines', 'Pan-India'],
    services: [
      'Newspaper & Magazine Advertising',
      'Full Page & Jacket Ads',
      'Classified Advertising',
      'Brochures & Catalogues',
      'Flyers, Posters & Leaflets',
      'Corporate Profiles & Annual Reports',
      'Public Notices & Legal Ads',
    ],
    expertise: [
      'National & Regional Publication Networks',
      'English, Hindi & Vernacular Media Planning',
      'Newspaper Advertising Strategy',
      'Cost-Effective Print Campaigns',
      'Pan-India Media Coordination',
    ],
  },
  {
    bg: bgDigital,
    title: 'Digital Marketing',
    kicker: 'Performance-led growth across digital channels.',
    description:
      'Data-driven digital strategies designed to generate leads, increase brand visibility, and deliver measurable business results.',
    tags: ['Performance', 'SEO', 'Leads'],
    services: [
      'Social Media Marketing',
      'Google, Meta & YouTube Ads',
      'SEO & SEM',
      'Performance Marketing',
      'Content Marketing',
      'Email & WhatsApp Marketing',
      'Lead Generation Campaigns',
      'Analytics & Reporting',
    ],
  },
  {
    bg: bgSocial,
    title: 'Social Media & Content',
    kicker: 'Content that builds communities and relevance.',
    description:
      'We create engaging content and social experiences that help brands stay relevant and connect with their audiences.',
    tags: ['Content', 'Reels', 'Community'],
    services: [
      'Social Media Management',
      'Content Creation',
      'Reels & Short Videos',
      'Copywriting',
      'Community Management',
      'Trend Marketing',
      'Photography & Product Shoots',
    ],
  },
  {
    bg: bgWeb,
    title: 'Website & UI/UX',
    kicker: 'Digital experiences built for conversion.',
    description:
      'Beautiful, intuitive, and high-performing websites designed to elevate your digital presence and drive business growth.',
    tags: ['Websites', 'UI/UX', 'SEO-ready'],
    services: [
      'Website Design & Development',
      'E-Commerce Websites',
      'Landing Pages',
      'UI/UX Design',
      'Responsive & SEO-Ready Websites',
      'Website Maintenance',
    ],
  },
  {
    bg: bgProduction,
    title: 'Production & Media',
    kicker: 'Visual stories from concept to final production.',
    description:
      'From concept to final production, we create compelling visual experiences that inspire, engage, and convert.',
    tags: ['Film', 'Motion', 'CGI'],
    services: [
      'Ad Film Production',
      'Corporate & Brand Videos',
      'Drone Shoots',
      'Animation & Motion Graphics',
      'CGI Advertising',
      'Video Editing',
      'Scriptwriting & Voiceovers',
    ],
  },
  {
    bg: bgRealestate,
    title: 'Real Estate & Retail',
    kicker: 'Launch, visibility, footfall, and enquiries.',
    description:
      'Integrated campaigns that drive awareness, footfall, and enquiries for real estate and retail businesses.',
    tags: ['Launches', 'Retail', 'Leads'],
    services: [
      'Project Branding',
      'Launch Campaigns',
      'Site & Store Branding',
      'Hoardings for Projects',
      'Retail Graphics & POSM',
      'Walkthrough Videos',
      'Mall Activations',
      'Lead Generation Campaigns',
    ],
  },
  {
    bg: bgEvents,
    title: 'Events & Activations',
    kicker: 'Experiences that bring brands closer to people.',
    description:
      'We design immersive experiences that bring brands closer to people and create lasting impressions.',
    tags: ['Events', 'Stalls', 'Roadshows'],
    services: [
      'Event Branding',
      'Exhibition Stall Design',
      'Launch Events',
      'Experiential Marketing',
      'Roadshows',
      'Concert Branding',
      'Stage & Backdrop Design',
    ],
  },
  {
    bg: bgCorporate,
    title: 'Corporate Communication & PR',
    kicker: 'Communication that builds trust and credibility.',
    description:
      'Professional communication strategies that help businesses build trust, manage perception, and communicate effectively.',
    tags: ['PR', 'Profiles', 'Reputation'],
    services: [
      'Pitch Decks & Presentations',
      'Company Profiles',
      'Employer Branding',
      'Public Relations',
      'Media Planning & Buying',
      'Press Releases',
      'Crisis Communication',
    ],
  },
  {
    bg: bgStrategy,
    title: 'Strategy & Research',
    kicker: 'Insight-driven planning for better decisions.',
    description:
      'Deep research and strategic thinking that empower brands to make informed decisions and achieve sustainable growth.',
    tags: ['Research', 'Audits', 'GTM'],
    services: [
      'Market & Consumer Research',
      'UX Research',
      'Competitor Analysis',
      'Campaign Strategy',
      'Brand Audits',
      'Go-to-Market Strategy',
      'Customer Journey Mapping',
    ],
  },
  {
    bg: bgPolitical,
    title: 'Political & Public Campaigns',
    kicker: 'Public communication with clarity and reach.',
    description:
      'Powerful communication campaigns designed to engage communities, amplify messages, and create meaningful impact.',
    tags: ['Political', 'Public', 'Awareness'],
    services: [
      'Election Campaign Branding',
      'Political Hoardings',
      'Rally Branding',
      'Public Awareness Campaigns',
      'Government Campaigns',
      'Manifesto & Candidate Branding',
    ],
  },
];

/* ─── Touch detection ─── */
function isTouchLike() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: none), (pointer: coarse)').matches
  );
}

/* ─── ServiceCard — hover preview + click to open full modal ─── */
function ServiceCard({ service, onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const touchDevice = isTouchLike();
  const { bg, title, kicker, description, tags, services, expertise } = service;

  const detailItems = expertise
    ? [...services.slice(0, 4), ...expertise.slice(0, 2)]
    : services.slice(0, 6);

  const openOnHover = () => { if (!touchDevice) setIsOpen(true); };
  const closeOnHover = () => { if (!touchDevice) setIsOpen(false); };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(service);
    }
  };

  return (
    <motion.article
      className={`wf-card${isOpen ? ' wf-card--open' : ''}`}
      role="button"
      onHoverStart={openOnHover}
      onHoverEnd={closeOnHover}
      onClick={() => onOpen(service)}
      onFocus={openOnHover}
      onBlur={closeOnHover}
      onKeyDown={handleKeyDown}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`Open ${title} details`}
    >
      {/* ── Card image area ── */}
      <div
        className="wf-card__media"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="wf-card__media-overlay" />
      </div>

      {/* ── Card body ── */}
      <div className="wf-card__body">
        <div className="wf-card__header">
          <h3 className="wf-card__title">{title}</h3>
          <p className="wf-card__kicker">{kicker}</p>
        </div>

        {/* Animated expand: description + service list (hover preview) */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className="wf-card__details"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.32, ease: 'easeInOut' }}
            >
              <p className="wf-card__desc">{description}</p>
              <ul className="wf-card__list">
                {detailItems.map((item) => (
                  <li key={item}>
                    <BadgeCheck size={13} strokeWidth={2.2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Card footer ── */}
      <div className="wf-card__footer">
        <div className="wf-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="wf-card__tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── ServiceModal — full-screen detail view, opened on card click ─── */
function ServiceModal({ service, onClose }) {
  const panelRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!service) return null;

  const { bg, title, kicker, description, tags, services, expertise } = service;
  const allItems = expertise ? [...services, ...expertise] : services;

  const handleBackdropClick = (e) => {
    if (panelRef.current && !panelRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <motion.div
      className="svc-modal__backdrop"
      onMouseDown={handleBackdropClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <motion.div
        className="svc-modal__panel"
        ref={panelRef}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
      >
        <button
          type="button"
          className="svc-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={22} strokeWidth={2.4} />
        </button>

        <div
          className="svc-modal__media"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="svc-modal__media-overlay" />
          <div className="svc-modal__media-content">
            <span className="svc-modal__kicker">{kicker}</span>
            <h2 className="svc-modal__title">{title}</h2>
          </div>
        </div>

        <div className="svc-modal__body">
          <p className="svc-modal__desc">{description}</p>

          <div className="svc-modal__tags">
            {tags.map((tag) => (
              <span key={tag} className="svc-modal__tag">{tag}</span>
            ))}
          </div>

          {expertise ? (
            <div className="svc-modal__columns">
              <div>
                <h4 className="svc-modal__subhead">What We Offer</h4>
                <ul className="svc-modal__list">
                  {services.map((item) => (
                    <li key={item}>
                      <BadgeCheck size={15} strokeWidth={2.2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="svc-modal__subhead">Our Expertise</h4>
                <ul className="svc-modal__list">
                  {expertise.map((item) => (
                    <li key={item}>
                      <BadgeCheck size={15} strokeWidth={2.2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <ul className="svc-modal__list svc-modal__list--single">
              {allItems.map((item) => (
                <li key={item}>
                  <BadgeCheck size={15} strokeWidth={2.2} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function ServicesPage() {
  const [activeService, setActiveService] = useState(null);

  // Lock background scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = activeService ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeService]);

  return (
    <div className="services-page">

      {/* ── PAGE BANNER ── */}
      <section className="page-banner--dark">
        <div className="container page-banner__inner--center">
          <motion.h1
            className="page-banner__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            360° ADVERTISING SOLUTIONS
          </motion.h1>
          <motion.p
            className="page-banner__subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
          >
            Integrated advertising, branding, marketing, media, and communication solutions.
          </motion.p>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="section services-flow-section">
        <div className="container">
          <div className="services-flow-head">
            <span className="section-label accent center">Capabilities</span>
            <p>Hover a card to preview. Click any card to see it in full.</p>
          </div>
          <div className="wf-grid">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title} custom={i % 4}>
                <ServiceCard service={service} onOpen={setActiveService} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-SCREEN SERVICE MODAL ── */}
      <AnimatePresence>
        {activeService && (
          <ServiceModal
            service={activeService}
            onClose={() => setActiveService(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
