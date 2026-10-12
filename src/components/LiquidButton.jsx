import { useState } from 'react';

/* ============================================
   LIQUID GLASS BUTTON
   Plain JSX + CSS port of the 21st.dev component
   (styles live in animations.css under
   "LIQUID GLASS BUTTON").

   Usage:
     <LiquidButton as={Link} to="/services" variant="primary">TEXT</LiquidButton>
     <LiquidButton variant="glass" onClick={...}>TEXT</LiquidButton>

   variant: "primary" (red-tinted glass) | "glass" (clear glass)
   as:      any element/component — defaults to <button>
   ============================================ */

/* The SVG displacement filter inside backdrop-filter only works in
   Chromium browsers (Chrome, Edge, Android Chrome, Opera). Safari and
   Firefox fall back to a normal frosted blur, set in the CSS. */
const supportsSvgBackdrop = () =>
  typeof navigator !== 'undefined' && /Chrome|Chromium|Edg\//.test(navigator.userAgent);

/* Render this ONCE on any page that uses LiquidButton. */
export function LiquidGlassFilter() {
  return (
    <svg className="liquid-filter" aria-hidden="true" focusable="false">
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export default function LiquidButton({
  as: Component = 'button',
  variant = 'glass',
  className = '',
  children,
  ...props
}) {
  const [useSvgGlass] = useState(supportsSvgBackdrop);

  return (
    <Component
      className={`liquid-btn liquid-btn--${variant}${className ? ` ${className}` : ''}`}
      {...props}
    >
      <span
        className={`liquid-btn__glass${useSvgGlass ? ' liquid-btn__glass--svg' : ''}`}
        aria-hidden="true"
      />
      <span className="liquid-btn__rim" aria-hidden="true" />
      <span className="liquid-btn__label">{children}</span>
    </Component>
  );
}
