import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from '../assets/logos/kant-blue-n-red.png';
import instagramIcon from '../assets/icons/instagram.svg';
import facebookIcon from '../assets/icons/facebook.svg';
import whatsappIcon from '../assets/icons/whatsapp.svg';

const year = new Date().getFullYear();

const EXPLORE = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Services', to: '/services' },
  { name: 'Contact', to: '/contact' },
];

const SOCIALS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/kant.advertising/',
    icon: instagramIcon,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61594662680538',
    icon: facebookIcon,
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919152833833',
    icon: whatsappIcon,
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">

        {/* Brand */}
        <div className="footer__brand">
          <img src={logo} alt="KANT Advertising" className="footer__logo" />
          <p className="footer__tagline">
            Full-service advertising agency in Mulund, Mumbai. Print, outdoor,
            digital and more since 1982.
          </p>
        </div>

        {/* Explore */}
        <nav className="footer__col" aria-label="Footer">
          <h4 className="footer__heading">Explore</h4>
          <ul className="footer__list">
            {EXPLORE.map(({ name, to }) => (
              <li key={name}>
                <Link to={to} className="footer__link">{name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials */}
        <div className="footer__col">
          <h4 className="footer__heading">Follow Us</h4>
          <div className="footer__socials">
            {SOCIALS.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social"
                aria-label={`KANT Advertising on ${name}`}
                title={name}
              >
                <img src={icon} alt="" className="footer__social-icon" />
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <address className="footer__col footer__contact">
          <h4 className="footer__heading">Contact</h4>
          <a href="tel:+919152833833" className="footer__contact-item">
            <Phone size={16} strokeWidth={2} />
            <span>+91 9152 833 833</span>
          </a>
          <a href="mailto:marketing@kantadvertising.com" className="footer__contact-item">
            <Mail size={16} strokeWidth={2} />
            <span>marketing@kantadvertising.com</span>
          </a>
          <div className="footer__contact-item">
            <MapPin size={16} strokeWidth={2} />
            <span>
              819, 8th floor, Ecstasy Business Park,<br />
              JSD Road, Near City of Joy,<br />
              Mulund (West), Mumbai – 400 080. INDIA.
            </span>
          </div>
        </address>
      </div>

      <div className="container footer__bottom">
        <p className="footer__copy">
          © {year} KANT Advertising. All rights reserved.
        </p>
        <p className="footer__copy">
          Office in Mumbai, serving all over INDIA.
        </p>
      </div>
    </footer>
  );
}
