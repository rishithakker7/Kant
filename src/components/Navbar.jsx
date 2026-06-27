import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Info, Megaphone, PhoneCall } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home',     to: '/',         icon: Home },
  { name: 'About',    to: '/about',    icon: Info },
  { name: 'Services', to: '/services', icon: Megaphone },
  { name: 'Contact',  to: '/contact',  icon: PhoneCall },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [overHero, setOverHero] = useState(true);
  const pillRef = useRef(null);
  const [glowStyle, setGlowStyle] = useState(null);

  const activeName =
    NAV_LINKS.find((item) =>
      item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
    )?.name ?? NAV_LINKS[0].name;

  // Measure the active nav item and set glow position relative to the pill
  useEffect(() => {
    if (!pillRef.current) return;
    const activeEl = pillRef.current.querySelector('.tubelight-nav__item--active');
    if (!activeEl) return;

    const pillRect = pillRef.current.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();

    setGlowStyle({
      left: itemRect.left - pillRect.left,
      width: itemRect.width,
      height: itemRect.height,
    });
  }, [activeName]);

  useEffect(() => {
    if (!isHome) return;

    const heroEl = document.querySelector('.hero');
    if (!heroEl) { setOverHero(false); return; }

    const handleScroll = () => {
      const heroBottom = heroEl.getBoundingClientRect().bottom;
      setOverHero(heroBottom > 90);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const inverted = isHome && overHero;

  return (
    <div className={`tubelight-nav${inverted ? ' tubelight-nav--inverted' : ''}`}>
      <div className="tubelight-nav__pill" ref={pillRef}>

        {/* Single glow that slides left/right inside the pill */}
        {glowStyle && (
          <motion.span
            className="tubelight-nav__glow"
            animate={{ left: glowStyle.left, width: glowStyle.width }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            style={{ height: glowStyle.height }}
          >
            <span className="tubelight-nav__lamp">
              <span className="tubelight-nav__lamp-blur tubelight-nav__lamp-blur--wide" />
              <span className="tubelight-nav__lamp-blur tubelight-nav__lamp-blur--mid" />
              <span className="tubelight-nav__lamp-blur tubelight-nav__lamp-blur--core" />
            </span>
          </motion.span>
        )}

        {NAV_LINKS.map(({ name, to, icon: Icon }) => {
          const isActive = activeName === name;
          return (
            <NavLink
              key={name}
              to={to}
              end={to === '/'}
              className={`tubelight-nav__item${isActive ? ' tubelight-nav__item--active' : ''}`}
            >
              <span className="tubelight-nav__label">{name}</span>
              <span className="tubelight-nav__icon">
                <Icon size={18} strokeWidth={2.5} />
              </span>
            </NavLink>
          );
        })}

      </div>
    </div>
  );
}
