import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/black-logo.png';

const NAV_LINKS = [
  { label: 'Home',     to: '/'         },
  { label: 'About',    to: '/about'    },
  { label: 'Services', to: '/services' },
  { label: 'Contact',  to: '/contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
      animate={{ paddingBlock: scrolled ? '0.5rem' : '1rem' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__logo">
          <img src={logo} alt="KANT" className="navbar__logo-img" />
        </NavLink>

        <nav className="navbar__nav" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                isActive ? 'navbar__link active' : 'navbar__link'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
