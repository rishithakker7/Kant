import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import heroVideo from "../assets/hero-video.mp4";
import heroPoster from "../assets/keyframe.jpg";
import {
  Calendar,
  RefreshCw,
  Map,
  Zap,
  Star,
  Megaphone,
} from "lucide-react";
import ServicesWheel from "../components/ServicesWheel.jsx";

/* ───────────────── ANIMATIONS ───────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/* ───────────────── REVEAL ───────────────── */

function Reveal({ children, variants = fadeUp, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────── COUNTER ───────────────── */

function Counter({ to, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, parseInt(to), {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) { setCount(Math.floor(value)); },
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ───────────────── DATA ───────────────── */

const highlights = [
  { Icon: Calendar,  label: "Established\nin 1982" },
  { Icon: RefreshCw, label: "44 Years of\nExperience" },
  { Icon: Map,       label: "Pan-India Print\nExpertise" },
  { is360: true,     label: "Advertising\nSolutions" },
  { Icon: Zap,       label: "Prompt Service,\nEvery Time" },
  { Icon: Star,      label: "High Client\nRetention" },
];

const stats = [
  { to: "1000", suffix: "+",  label: "Happy\nClients" },
  { to: "44",   suffix: "+",  label: "Years of\nExperience" },
  { to: "90",   suffix: "%+", label: "Client\nRetention" },
];

/* ───────────────── COMPONENT ───────────────── */

export default function Home() {
  const videoRef = useRef(null);

  // Some browsers (notably iOS Safari) ignore the React `muted` prop for
  // autoplay purposes, so set it on the element directly and nudge play().
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  return (
    <div className="home">

      {/* HERO — looping background video */}
      <section className="hero">
        <video
          ref={videoRef}
          className="hero__video"
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="hero__overlay" aria-hidden="true" />

        <div className="container hero__inner">
          <div className="hero__content">
            <h1 className="visually-hidden">
              KANT Advertising: Advertising Agency in Mulund, Thane &amp; Mumbai
            </h1>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="highlights">
        <div className="container highlights__inner">
          {highlights.map((item, index) => (
            <Reveal key={index} variants={fadeIn}>
              <motion.div
                className="highlights__item"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="highlights__icon">
                  {item.is360 ? (
                    <span className="highlights__360">360°</span>
                  ) : (
                    <item.Icon size={48} strokeWidth={1.6} />
                  )}
                </span>
                <span className="highlights__label">{item.label}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

<ServicesWheel />

      {/* STATS */}
      <section className="stats-banner">
        <div className="container stats-banner__inner">
          <Reveal className="stats-banner__left">
            <p className="stats-banner__line1">CLIENTS DON'T STAY FOR YEARS.</p>
            <p className="stats-banner__line2">THEY STAY FOR RESULTS.</p>
          </Reveal>
          <div className="stats-banner__numbers">
            {stats.map((stat, index) => (
              <Reveal key={index} variants={fadeUp}>
                <div className="stat">
                  <span className="stat__num"><Counter to={stat.to} suffix={stat.suffix} /></span>
                  <span className="stat__label" style={{ whiteSpace: "pre-line" }}>{stat.label}</span>
                </div>
              </Reveal>
            ))}
            <Reveal variants={fadeUp}>
              <div className="stat stat--panindia">
                <span className="stat__num stat__num--accent">Pan-India</span>
                <span className="stat__label" style={{ whiteSpace: "pre-line" }}>{"Media\nNetwork"}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
