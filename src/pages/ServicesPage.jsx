import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  BadgeCheck,
} from 'lucide-react';

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

const bgBranding = 'https://picsum.photos/seed/branding/600/400';
const bgOutdoor = 'https://picsum.photos/seed/outdoor/600/400';
const bgPrint = 'https://picsum.photos/seed/print/600/400';
const bgDigital = 'https://picsum.photos/seed/digital/600/400';
const bgSocial = 'https://picsum.photos/seed/social/600/400';
const bgWeb = 'https://picsum.photos/seed/web/600/400';
const bgProduction = 'https://picsum.photos/seed/production/600/400';
const bgRealestate = 'https://picsum.photos/seed/realestate/600/400';
const bgEvents = 'https://picsum.photos/seed/events/600/400';
const bgCorporate = 'https://picsum.photos/seed/corporate/600/400';
const bgStrategy = 'https://picsum.photos/seed/strategy/600/400';
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

/* ─── WorkflowBuilderCard adapted to KANT CSS ─── */
function ServiceCard({ service, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const touchDevice = isTouchLike();
  const { bg, title, kicker, description, tags, services, expertise } = service;

  // Pick up to 6 items to show inside the expanded panel
  const detailItems = expertise
    ? [...services.slice(0, 4), ...expertise.slice(0, 2)]
    : services.slice(0, 6);

  const toggleOpen = () => setIsOpen((p) => !p);
  const openOnHover = () => { if (!touchDevice) setIsOpen(true); };
  const closeOnHover = () => { if (!touchDevice) setIsOpen(false); };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleOpen();
    }
  };

  return (
    <motion.article
      className={`wf-card${isOpen ? ' wf-card--open' : ''}`}
      role="button"
      onHoverStart={openOnHover}
      onHoverEnd={closeOnHover}
      onClick={() => { if (touchDevice) toggleOpen(); }}
      onFocus={openOnHover}
      onBlur={closeOnHover}
      onKeyDown={handleKeyDown}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`${title} service card`}
    >
      {/* ── Card image area (icon + grid pattern) ── */}
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
        {/* Always-visible header */}
        <div className="wf-card__header">
          <h3 className="wf-card__title">{title}</h3>
          <p className="wf-card__kicker">{kicker}</p>
        </div>

        {/* Animated expand: description + service list */}
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

/* ─── Page ─── */
export default function ServicesPage() {
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
            <p>Hover a card to explore the details. On mobile, tap to expand.</p>
          </div>
          <div className="wf-grid">
            {SERVICES.map((service, i) => (
              <Reveal key={service.title} custom={i % 4}>
                <ServiceCard service={service} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
