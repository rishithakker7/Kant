import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    alert('Message sent! We will get back to you shortly.');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-page">

      {/* ── PAGE BANNER ──────────────────────────── */}
      <section className="page-banner page-banner--dark">
        <div className="container page-banner__inner page-banner__inner--center">
          <h1 className="page-banner__title center">GET IN TOUCH</h1>
          <p className="page-banner__subtitle center">
            We're here to listen, plan and deliver.
          </p>
        </div>
      </section>

      {/* ── CONTACT BODY ─────────────────────────── */}
      <section className="section">
        <div className="container contact-body">

          {/* LEFT — FORM */}
          <div className="contact-form-col">
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

            <button className="btn btn--accent" onClick={handleSubmit}>
              SEND MESSAGE →
            </button>
          </div>

          {/* RIGHT — INFO */}
          <div className="contact-info-col">
            <h3 className="section-label accent">CONTACT INFORMATION</h3>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <span className="contact-info-icon">📞</span>
                <span>96190 26661</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">✉️</span>
                <span>manish@kantadvertising.com</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">🌐</span>
                <span>kantadvertising.com</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">📍</span>
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
              style={{
                display: 'inline-block',
                marginTop: '10px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#e5000f',
                textDecoration: 'none',
              }}
            >
              Open in Google Maps →
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
