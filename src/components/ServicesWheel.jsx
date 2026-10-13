import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
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
import LiquidButton, { LiquidGlassFilter } from "./LiquidButton.jsx";

/* ───────────────── DATA ───────────────── */

const RAW_SERVICES = [
  {
    id: 1,
    Icon: Newspaper,
    title: "Print Advertising",
    desc: "Newspapers, magazines, classifieds and display ads with pan-India reach across every major publication.",
  },
  {
    id: 2,
    Icon: Radio,
    title: "Radio Advertising",
    desc: "Regional and national radio campaigns crafted to connect, communicate, and convert audiences at scale.",
  },
  {
    id: 3,
    Icon: Monitor,
    title: "Digital Advertising",
    desc: "Online campaigns, performance marketing, SEO and brand visibility built for modern audiences.",
  },
  {
    id: 4,
    Icon: MapPin,
    title: "Outdoor Advertising",
    desc: "Hoardings, transit media and outdoor formats that command attention across key locations.",
  },
  {
    id: 5,
    Icon: Tv,
    title: "Television Advertising",
    desc: "Strategic TV media planning and execution that puts your brand in front of millions.",
  },
  {
    id: 6,
    Icon: Lightbulb,
    title: "Creative & Strategy",
    desc: "Campaign concepts, messaging and brand positioning that cut through the noise.",
  },
  {
    id: 7,
    Icon: Megaphone,
    title: "Brand Promotions",
    desc: "Activation campaigns and visibility initiatives that build lasting brand equity on the ground.",
  },
];

/* ───────────────── CONFIG ───────────────── */

const TOTAL = RAW_SERVICES.length;

const services = RAW_SERVICES.map((svc, index) => ({
  ...svc,
  number: String(((TOTAL - index) % TOTAL) + 1).padStart(2, "0"),
}));
const SLICE_ANGLE = 360 / TOTAL; // 51.428...°
const ROTATE_DURATION = 0.8;

// The "focus" slot is a single fixed screen position — whichever service
// is active always gets rotated into this exact spot, and nothing else
// is ever highlighted. 90° = due east / the rightmost point of the wheel
// in this file's angle convention (0 = top, clockwise-positive).
const FOCUS_ANGLE = 90;

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

// Panel transition: the old content leaves first (quick, gentle lift + fade),
// and only then the new content arrives, with each piece (number → icon →
// title → description) rising in one after another. AnimatePresence runs in
// mode="wait" below, so the two panels never overlap on screen — that overlap
// was what made the old crossfade look like the text was melting together.
const EASE_OUT = [0.22, 1, 0.36, 1];

const panelVariants = {
  enter: {},
  center: {
    transition: { staggerChildren: 0.075, delayChildren: 0.04 },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
};

const itemVariants = {
  enter: { opacity: 0, y: 18 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

const iconVariants = {
  enter: { opacity: 0, y: 18, scale: 0.85 },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT },
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
      <motion.span className="sw-panel__number" variants={itemVariants}>
        {number}
      </motion.span>
      <motion.div className="sw-panel__icon-wrap" variants={iconVariants}>
        <Icon size={40} strokeWidth={1.4} />
      </motion.div>
      <motion.h3 className="sw-panel__title" variants={itemVariants}>
        {title}
      </motion.h3>
      <motion.p className="sw-panel__desc" variants={itemVariants}>
        {desc}
      </motion.p>
    </motion.div>
  );
}

/* Invisible copy of a panel. One of these is rendered for EVERY service
   inside the stage, stacked on top of each other, so the stage is always
   exactly as tall as the tallest panel (at whatever screen width it is).
   That keeps the button right under the text with no guessed pixel
   height, no jumping between services, and no overlap on mobile. */
function PanelSizer({ service }) {
  const { Icon, number, title, desc } = service;
  return (
    <div className="sw-panel sw-panel--sizer" aria-hidden="true">
      <span className="sw-panel__number">{number}</span>
      <div className="sw-panel__icon-wrap">
        <Icon size={40} strokeWidth={1.4} />
      </div>
      <h3 className="sw-panel__title">{title}</h3>
      <p className="sw-panel__desc">{desc}</p>
    </div>
  );
}

/* ───────────────── WHEEL NAV ───────────────── */

function WheelNav({ activeIndex, onSelect }) {
  // Track cumulative rotation to avoid wrap-around jumps
  const totalRotation = useRef(0);
  const wheelRotation = useMotionValue(0);
  const isAnimating = useRef(false);

  // Which slice is PHYSICALLY sitting at FOCUS_ANGLE right now. This is
  // derived straight from the live rotation value (updated every animation
  // frame), not from which slice was last clicked — so the red highlight
  // never jumps to a slice before the wheel has actually turned it into
  // place. The fixed spot itself never moves; only this value changes,
  // as whichever slice happens to be passing under it changes.
  const indexAtFocus = useCallback((rotation) => {
    let designAngle = FOCUS_ANGLE - rotation;
    designAngle = ((designAngle % 360) + 360) % 360;
    return Math.floor(designAngle / SLICE_ANGLE) % TOTAL;
  }, []);
  const [liveIndex, setLiveIndex] = useState(() => indexAtFocus(0));

  useEffect(() => {
    setLiveIndex(indexAtFocus(wheelRotation.get()));
    return wheelRotation.on("change", (v) => setLiveIndex(indexAtFocus(v)));
  }, [wheelRotation, indexAtFocus]);

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

  // Ref so goTo always reads the CURRENT active index, even when called
  // from a closure created long ago (like the autoplay interval below).
  // This is what was making autoplay's rotation look off after the first
  // tick — it kept computing distance from the wheel's very first
  // position instead of wherever it had actually rotated to.
  const activeIndexRef = useRef(activeIndex);
  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

  const goTo = useCallback(
    (next) => {
      if (isAnimating.current) return;

      const currentTarget = targetRotation(activeIndexRef.current);
      const nextTarget = targetRotation(next);

      // Always rotate clockwise: normalize delta to [0, 360) instead of
      // picking whichever direction (cw/ccw) is shortest. This still avoids
      // any *extra* unnecessary spinning — it's the smallest positive
      // (clockwise) rotation that lands the target slice at FOCUS_ANGLE,
      // it just never goes negative/counter-clockwise to get there.
      let delta = nextTarget - currentTarget;
      delta = ((delta % 360) + 360) % 360;

      // Clicking the slice that's already active/mid-focus: nothing to
      // rotate, so don't kick off an animation (or the isAnimating lock)
      // for a 0° spin.
      if (delta === 0) return;

      isAnimating.current = true;
      totalRotation.current = totalRotation.current + delta;

      // How many slice-boundaries this rotation crosses — a click one
      // slice over should feel snappy, but a click across half the wheel
      // needs more time to read as one continuous spin instead of a
      // rushed blur. Duration scales with distance instead of being
      // fixed, and is capped so the longest jump still feels intentional
      // rather than sluggish.
      const steps = Math.round(delta / SLICE_ANGLE);
      const duration = Math.min(1.7, ROTATE_DURATION + (steps - 1) * 0.18);

      // Update the panel immediately, in step with the click/autoplay
      // tick — not deferred to the rotation's onComplete. Deferring it
      // sounds nice in theory but races the autoplay timer (which fires
      // on a fixed interval regardless of how long the current spin
      // takes), and that race is what left the panel showing stale
      // content out of step with the wheel. Simple and immediate is correct.
      onSelect(next);

      animate(wheelRotation, totalRotation.current, {
        duration,
        ease: [0.45, 0, 0.15, 1],
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    },
    [targetRotation, wheelRotation, onSelect]
  );

  // Init rotation on mount so active=0 is at focus
  useEffect(() => {
    const init = targetRotation(0);
    totalRotation.current = init;
    wheelRotation.set(init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sw-wheel">
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
          const isActive = index === liveIndex;
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
                fill={isActive ? "#E5000F" : "#161616"}
                stroke={isActive ? "#E5000F" : "#000000"}
                strokeWidth={isActive ? 0 : 1}
                animate={{
                  scale: isActive ? 1.045 : 1,
                  opacity: isActive ? 1 : 0.9,
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
            className={`sw-dot${i === liveIndex ? " sw-dot--active" : ""}`}
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
            color: isActive ? "#ffffff" : "rgba(255,255,255,0.82)",
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
      {/* Shared SVG filter used by the liquid glass button (renders nothing visible) */}
      <LiquidGlassFilter />

      <div className="sw-section__inner">
        <div className="sw-section__heading">
          <span className="section-label accent center">Our Services</span>
          <h2 className="sw-section__title">360° Advertising Solutions</h2>
          <p className="sw-section__sub">One agency. Every medium. Complete solutions.</p>
        </div>

        <div className="sw-layout">
          <WheelNav activeIndex={activeIndex} onSelect={setActiveIndex} />

          <div className="sw-panel-wrap">
            <div className="sw-panel-stage">
              {services.map((svc) => (
                <PanelSizer key={svc.id} service={svc} />
              ))}
              <AnimatePresence mode="wait">
                <ContentPanel key={activeIndex} service={services[activeIndex]} />
              </AnimatePresence>
            </div>

            <div className="sw-cta-row">
              <LiquidButton
                as={Link}
                to="/services"
                variant="accent"
                className="sw-cta"
                onClick={() => window.scrollTo(0, 0)}
              >
                Explore All Services
                <ArrowRight size={16} strokeWidth={2.4} />
              </LiquidButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
