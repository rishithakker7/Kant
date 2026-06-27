import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Globe, MapPin, Send, CheckCircle2 } from 'lucide-react';

/* ─── Scroll reveal wrapper ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function Reveal({ children, custom = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
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

const CONTACT_DETAILS = [
  { Icon: Phone, value: '96190 26661', href: 'tel:+919619026661' },
  { Icon: Mail, value: 'manish@kantadvertising.com', href: 'mailto:manish@kantadvertising.com' },
  { Icon: Globe, value: 'kantadvertising.com', href: 'https://kantadvertising.com' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="contact-page">

      {/* ── PAGE BANNER ──────────────────────────── */}
      <section className="page-banner page-banner--dark">
        <div className="container page-banner__inner page-banner__inner--center">
          <motion.h1
            className="page-banner__title center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            GET IN TOUCH
          </motion.h1>
          <motion.p
            className="page-banner__subtitle center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55 }}
          >
            We're here to listen, plan and deliver.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT BODY ─────────────────────────── */}
      <section className="section">
        <div className="container contact-body">

          {/* LEFT — FORM */}
          <Reveal className="contact-form-col">
            <span className="contact-eyebrow">Let's Talk</span>
            <h3 className="section-label accent">SEND US A MESSAGE</h3>

            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input
                className="form-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Your Email *</label>
              <input
                className="form-input"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                className="form-input"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Your Message *</label>
              <textarea
                className="form-input form-textarea"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
              />
            </div>

            <motion.button
              className="btn btn--accent"
              onClick={handleSubmit}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              SEND MESSAGE <Send size={15} strokeWidth={2.4} />
            </motion.button>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  className="form-success"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <CheckCircle2 size={17} strokeWidth={2.3} />
                  <span>Message sent! We'll get back to you shortly.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>

          {/* RIGHT — INFO */}
          <Reveal className="contact-info-col" custom={1}>
            <span className="contact-eyebrow">Reach Us</span>
            <h3 className="section-label accent">CONTACT INFORMATION</h3>

            <div className="contact-info-list">
              {CONTACT_DETAILS.map(({ Icon, value, href }) => (
                <a key={value} href={href} className="contact-info-item">
                  <span className="contact-info-icon">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <span>{value}</span>
                </a>
              ))}

              <div className="contact-info-item contact-info-item--static">
                <span className="contact-info-icon">
                  <MapPin size={18} strokeWidth={2} />
                </span>
                <span>
                  819, 8th floor, Ecstasy Business Park,<br />
                  JSD Road, Near City of Joy,<br />
                  Mulund (West), Mumbai – 400080. INDIA.
                </span>
              </div>
            </div>

            <h3 className="section-label accent find-us">FIND US</h3>

            {/* Embedded map */}
            <div className="map-placeholder">
              <iframe
                title="KANT Advertising location on Google Maps"
                src="https://www.google.com/maps?q=19.1763238,72.9600502&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/a6y8JTgq9kwxCoxx9"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-map-link"
            >
              Open in Google Maps →
            </a>
          </Reveal>

        </div>
      </section>

    </div>
  );
}
