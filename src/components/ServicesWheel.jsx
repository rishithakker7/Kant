import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  animate,
  AnimatePresence,
} from "framer-motion";
import {
  Newspaper,
  Radio,
  Monitor,
  MapPin,
  Tv,
  Lightbulb,
  Megaphone,
  ArrowRight,
} from "lucide-react";

/* ───────────────── DATA ───────────────── */

const services = [
  {
    id: 1,
    number: "01",
    Icon: Newspaper,
    title: "Print Advertising",
    desc: "Newspapers, magazines, classifieds, and display ads with pan-India reach across every major publication.",
  },
  {
    id: 2,
    number: "02",
    Icon: Radio,
    title: "Radio Advertising",
    desc: "Regional and national radio campaigns crafted to connect, communicate, and convert audiences at scale.",
  },
  {
    id: 3,
    number: "03",
    Icon: Monitor,
    title: "Digital Advertising",
    desc: "Online campaigns, performance marketing, SEO, and brand visibility built for modern audiences.",
  },
  {
    id: 4,
    number: "04",
    Icon: MapPin,
    title: "Outdoor Advertising",
    desc: "Hoardings, transit media, and outdoor formats that command attention across key locations.",
  },
  {
    id: 5,
    number: "05",
    Icon: Tv,
    title: "Television Advertising",
    desc: "Strategic TV media planning and execution that puts your brand in front of millions.",
  },
  {
    id: 6,
    number: "06",
    Icon: Lightbulb,
    title: "Creative & Strategy",
    desc: "Campaign concepts, messaging, and brand positioning that cut through the noise.",
  },
  {
    id: 7,
    number: "07",
    Icon: Megaphone,
    title: "Brand Promotions",
    desc: "Activation campaigns and visibility initiatives that build lasting brand equity on the ground.",
  },
];

/* ───────────────── CONFIG ───────────────── */

const TOTAL = services.length;
const SLICE_ANGLE = 360 / TOTAL; // 51.428...°
const AUTOPLAY_MS = 3400;
const ROTATE_DURATION = 0.8;
// The "focus" position on the wheel — top-right, at 45° from 12 o'clock
const FOCUS_ANGLE = 45;

/* ───────────────── HELPERS ───────────────── */

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcSegmentPath(cx, cy, outerR, innerR, startAngle, endAngle) {
  const o1 = polarToCartesian(cx, cy, outerR, startAngle);
  const o2 = polarToCartesian(cx, cy, outerR, endAngle);
  const i1 = polarToCartesian(cx, cy, innerR, endAngle);
  const i2 = polarToCartesian(cx, cy, innerR, startAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${i2.x} ${i2.y}`,
    "Z",
  ].join(" ");
}

/* ───────────────── CONTENT PANEL ───────────────── */

const panelVariants = {
  enter: { opacity: 0, y: 24 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

function ContentPanel({ service }) {
  const { Icon, number, title, desc } = service;
  return (
    <motion.div
      key={service.id}
      className="sw-panel"
      variants={panelVariants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <span className="sw-panel__number">{number}</span>
      <div className="sw-panel__icon-wrap">
        <Icon size={40} strokeWidth={1.4} />
      </div>
      <h3 className="sw-panel__title">{title}</h3>
      <p className="sw-panel__desc">{desc}</p>
      <motion.button
        className="sw-panel__cta"
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
      >
        Learn More
        <ArrowRight size={16} strokeWidth={2} />
      </motion.button>
    </motion.div>
  );
}

/* ───────────────── WHEEL NAV ───────────────── */

function WheelNav({ activeIndex, onSelect }) {
  // Track cumulative rotation to avoid wrap-around jumps
  const totalRotation = useRef(0);
  const wheelRotation = useMotionValue(0);
  const isAnimating = useRef(false);
  const isPaused = useRef(false);

  const SIZE = 560;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const OUTER_R = 240;
  const INNER_R = 96;
  const GAP = 3; // gap between slices in degrees

  // Rotation so that slice[activeIndex] midpoint lands at FOCUS_ANGLE
  const targetRotation = useCallback(
    (index) => {
      const midAngle = index * SLICE_ANGLE + SLICE_ANGLE / 2;
      return FOCUS_ANGLE - midAngle;
    },
    []
  );

  const goTo = useCallback(
    (next) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const currentTarget = targetRotation(activeIndex);
      const nextTarget = targetRotation(next);

      // Calculate shortest delta to avoid spinning backwards unnecessarily
      let delta = nextTarget - currentTarget;
      // Normalize to [-180, 180] so we always take the short arc
      while (delta > 180) delta -= 360;
      while (delta < -180) delta += 360;

      totalRotation.current = totalRotation.current + delta;

      onSelect(next);

      animate(wheelRotation, totalRotation.current, {
        duration: ROTATE_DURATION,
        ease: [0.32, 0, 0.18, 1],
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    },
    [activeIndex, targetRotation, wheelRotation, onSelect]
  );

  // Init rotation on mount so active=0 is at focus
  useEffect(() => {
    const init = targetRotation(0);
    totalRotation.current = init;
    wheelRotation.set(init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autoplay
  useEffect(() => {
    const id = setInterval(() => {
      if (!isPaused.current) {
        goTo((activeIndex + 1) % TOTAL);
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [activeIndex, goTo]);

  return (
    <div
      className="sw-wheel"
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      {/* Static center hub — NOT inside the rotating SVG */}
      <div className="sw-wheel__hub">
        <span className="sw-wheel__hub-degrees">360°</span>
        <span className="sw-wheel__hub-label">Integrated<br />Solutions</span>
      </div>

      <motion.svg
        className="sw-wheel__svg"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ rotate: wheelRotation }}
      >
        {services.map((svc, index) => {
          const isActive = index === activeIndex;
          const startAngle = index * SLICE_ANGLE + GAP / 2;
          const endAngle = (index + 1) * SLICE_ANGLE - GAP / 2;
          const midAngle = index * SLICE_ANGLE + SLICE_ANGLE / 2;
          const d = arcSegmentPath(CX, CY, OUTER_R, INNER_R, startAngle, endAngle);

          // Label position — midway radially
          const labelR = (OUTER_R + INNER_R) / 2 + (isActive ? 4 : 0);
          const labelPos = polarToCartesian(CX, CY, labelR, midAngle);

          // Counter-rotation on the label group to keep text upright
          // The label group rotates by -(wheelRotation) around the label center
          // We express this as a CSS transform: rotate(-Xdeg) around the label origin

          return (
            <g key={svc.id} onClick={() => goTo(index)} style={{ cursor: "pointer" }}>
              <motion.path
                d={d}
                fill={isActive ? "#E5000F" : "#e8e8e8"}
                stroke={isActive ? "#E5000F" : "#d0d0d0"}
                strokeWidth={isActive ? 0 : 1}
                animate={{
                  scale: isActive ? 1.045 : 1,
                  opacity: isActive ? 1 : 0.72,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />

              {/* Counter-rotating label group */}
              <motion.g
                style={{
                  transformOrigin: `${labelPos.x}px ${labelPos.y}px`,
                }}
                animate={{
                  // counter-rotate by the total wheel rotation so labels stay upright
                  // We read wheelRotation via a spring-synced value
                }}
              >
                <CounterLabel
                  svc={svc}
                  isActive={isActive}
                  cx={labelPos.x}
                  cy={labelPos.y}
                  wheelRotation={wheelRotation}
                />
              </motion.g>
            </g>
          );
        })}
      </motion.svg>

      {/* Dot nav */}
      <div className="sw-wheel__dots">
        {services.map((_, i) => (
          <button
            key={i}
            className={`sw-dot${i === activeIndex ? " sw-dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={services[i].title}
          />
        ))}
      </div>
    </div>
  );
}

/* Counter-rotating label — subscribes to wheelRotation motion value */
function CounterLabel({ svc, isActive, cx, cy, wheelRotation }) {
  const [rotation, setRotation] = useState(() => wheelRotation.get());

  useEffect(() => {
    return wheelRotation.on("change", (v) => setRotation(v));
  }, [wheelRotation]);

  const { Icon } = svc;

  return (
    <g
      transform={`translate(${cx}, ${cy}) rotate(${-rotation}) translate(${-cx}, ${-cy})`}
      style={{ pointerEvents: "none" }}
    >
      {/* Icon via foreignObject for Lucide React */}
      <foreignObject
        x={cx - 36}
        y={cy - 46}
        width={72}
        height={92}
        style={{ overflow: "visible" }}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            color: isActive ? "#ffffff" : "rgba(0,0,0,0.55)",
            textAlign: "center",
          }}
        >
          <Icon
            size={isActive ? 26 : 20}
            strokeWidth={1.6}
            style={{ flexShrink: 0 }}
          />
          <div
            style={{
              fontSize: isActive ? "11.5px" : "10px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              lineHeight: 1.15,
              maxWidth: "68px",
              transition: "font-size 0.3s ease, color 0.3s ease",
            }}
          >
            {svc.title}
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

/* ───────────────── ROOT ───────────────── */

export default function ServicesWheel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="sw-section">
      <div className="sw-section__inner">
        <div className="sw-section__heading">
          <span className="section-label accent center">Our Services</span>
          <h2 className="sw-section__title">360° Advertising Solutions</h2>
          <p className="sw-section__sub">One agency. Every medium. Complete solutions.</p>
        </div>

        <div className="sw-layout">
          <WheelNav activeIndex={activeIndex} onSelect={setActiveIndex} />

          <div className="sw-panel-wrap">
            <AnimatePresence mode="wait">
              <ContentPanel key={activeIndex} service={services[activeIndex]} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
