import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

  // Measure the active nav item and place the glow exactly on top of it.
  // Re-measures whenever the layout can change (not just on route change),
  // otherwise the glow keeps a stale width — e.g. the wide "HOME" label
  // size after the labels collapse to icons on mobile, or before the
  // font has loaded.
  useLayoutEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;

    const measure = () => {
      const activeEl = pill.querySelector('.tubelight-nav__item--active');
      if (!activeEl) return;

      // offset* values are relative to the pill and ignore transforms,
      // so they match the glow's absolute positioning exactly.
      const next = {
        left: activeEl.offsetLeft,
        top: activeEl.offsetTop,
        width: activeEl.offsetWidth,
        height: activeEl.offsetHeight,
      };

      setGlowStyle((prev) =>
        prev &&
        prev.left === next.left &&
        prev.top === next.top &&
        prev.width === next.width &&
        prev.height === next.height
          ? prev
          : next
      );
    };

    measure();

    // Any size change of the pill or of an item inside it (breakpoint
    // switch, font swap, icon/label toggle) triggers a re-measure.
    let observer;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure);
      observer.observe(pill);
      pill.querySelectorAll('.tubelight-nav__item').forEach((el) => observer.observe(el));
    }

    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
    };
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
            initial={false}
            animate={{
              left: glowStyle.left,
              top: glowStyle.top,
              width: glowStyle.width,
              height: glowStyle.height,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
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
