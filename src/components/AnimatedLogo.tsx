import { motion } from 'framer-motion';

// ─── Brand colours ────────────────────────────────────────────────────────────
const BLUE  = '#1E6BB0';
const GREEN = '#3a8f3a';
const DARK  = '#040404';

// ─── Road oval paths (ellipse cx=260 cy=235 rx=196 ry=86) ────────────────────
// Two arcs make a closed ellipse; Framer Motion animates pathLength 0→1
const ROAD_PATH  = 'M 64,235 a 196,86 0 1 1 392,0 a 196,86 0 1 1 -392,0';
const RING_PATH  = 'M 58,235 a 202,92 0 1 1 404,0 a 202,92 0 1 1 -404,0';

// ─── Vehicle silhouettes (local coords, centred ~55,24) ───────────────────────

function AirplaneShape() {
  return (
    <g fill={DARK}>
      {/* Fuselage */}
      <ellipse cx="55" cy="22" rx="43" ry="7.5" />
      {/* Main swept-back wings */}
      <polygon points="38,20 57,2 65,19" />
      <polygon points="38,24 57,44 65,25" />
      {/* Horizontal stabilisers */}
      <polygon points="14,21 6,14 20,20" />
      <polygon points="14,23 6,30 20,24" />
      {/* Vertical tail fin */}
      <polygon points="11,22 20,8 24,22" />
    </g>
  );
}

function ShipShape() {
  return (
    <g fill={DARK}>
      {/* Hull */}
      <path d="M4,42 Q65,53 126,42 L118,30 L12,30 Z" />
      {/* Cargo containers */}
      <rect x="13" y="18" width="16" height="12" rx="1" />
      <rect x="32" y="18" width="16" height="12" rx="1" />
      <rect x="51" y="18" width="16" height="12" rx="1" />
      <rect x="70" y="18" width="14" height="12" rx="1" />
      {/* Bridge / superstructure */}
      <rect x="88" y="4"  width="24" height="26" rx="2" />
      <rect x="92" y="0"  width="16" height="6"  rx="1" />
      {/* Funnel */}
      <rect x="97" y="-4" width="6"  height="6"  rx="1" />
      {/* Mast */}
      <line x1="60" y1="30" x2="60" y2="10" stroke={DARK} strokeWidth="1.5" />
      <line x1="60" y1="10" x2="80" y2="10" stroke={DARK} strokeWidth="1.5" />
    </g>
  );
}

function TruckShape() {
  return (
    <g fill={DARK}>
      {/* Trailer box */}
      <rect x="2" y="8" width="70" height="28" rx="3" />
      {/* Cab */}
      <path d="M72,10 L105,13 Q115,18 115,30 L115,36 L72,36 Z" />
      {/* Windshield highlight */}
      <path
        d="M76,14 L101,17 Q110,22 110,28 L76,28 Z"
        fill="white"
        fillOpacity="0.18"
      />
      {/* Cab door line */}
      <line x1="90" y1="15" x2="90" y2="36" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
      {/* Wheels */}
      <circle cx="18"  cy="40" r="7" />
      <circle cx="52"  cy="40" r="7" />
      <circle cx="93"  cy="40" r="7" />
      <circle cx="108" cy="40" r="7" />
      {/* Wheel hubs */}
      <circle cx="18"  cy="40" r="2.5" fill="white" fillOpacity="0.35" />
      <circle cx="52"  cy="40" r="2.5" fill="white" fillOpacity="0.35" />
      <circle cx="93"  cy="40" r="2.5" fill="white" fillOpacity="0.35" />
      <circle cx="108" cy="40" r="2.5" fill="white" fillOpacity="0.35" />
    </g>
  );
}

function TrainShape() {
  return (
    <g fill={DARK}>
      {/* Body */}
      <rect x="4" y="10" width="88" height="26" rx="6" />
      {/* Bullet nose */}
      <path d="M92,10 Q118,23 92,36 Z" />
      {/* Windows */}
      <rect x="16" y="16" width="13" height="9" rx="2" fill="white" fillOpacity="0.22" />
      <rect x="35" y="16" width="13" height="9" rx="2" fill="white" fillOpacity="0.22" />
      <rect x="54" y="16" width="13" height="9" rx="2" fill="white" fillOpacity="0.22" />
      {/* Rail */}
      <rect x="0" y="37" width="124" height="3" rx="1.5" />
      {/* Rail sleepers */}
      {[8, 28, 50, 72, 95, 114].map(x => (
        <rect key={x} x={x} y="38" width="4" height="6" fill={DARK} />
      ))}
    </g>
  );
}

// ─── Spring transition used for vehicle / letter pop-ins ─────────────────────
const popIn = {
  type: 'spring' as const,
  stiffness: 190,
  damping: 13,
};

// ─── Main exported component ──────────────────────────────────────────────────
export function AnimatedLogo({ stage }: { stage: number }) {
  const s = (n: number) => stage >= n; // shorthand: "has stage n been reached?"

  return (
    <svg
      viewBox="0 0 520 430"
      width="100%"
      style={{ overflow: 'visible', display: 'block' }}
      aria-label="TSLC animated logo"
    >
      {/* ================================================================
          1. ROAD OVAL
          ================================================================ */}

      {/* Outer thin decorative ring */}
      <motion.path
        d={RING_PATH}
        fill="none"
        stroke={DARK}
        strokeWidth="1.4"
        strokeOpacity="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={s(1) ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.7, ease: 'easeInOut' }}
      />

      {/* Road body — thick dark stroke */}
      <motion.path
        d={ROAD_PATH}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="22"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={s(1) ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />

      {/* Centre dashed white line (road markings) */}
      <motion.path
        d={ROAD_PATH}
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeDasharray="13 9"
        initial={{ opacity: 0 }}
        animate={s(1) ? { opacity: 0.85 } : {}}
        transition={{ duration: 0.5, delay: 1.05 }}
      />

      {/* ================================================================
          2. VEHICLES  (positioned along the top arc of the oval)
          Each vehicle: static <g> for position/rotation,
          motion.g inside for animated entrance.
          ================================================================ */}

      {/* ── AIRPLANE  (upper-left, ~95,152, rotated -18°) ── */}
      <g transform="translate(95,152) rotate(-18) scale(0.57) translate(-55,-22)">
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={s(2) ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55, ...popIn }}
        >
          <AirplaneShape />
        </motion.g>
      </g>

      {/* ── SHIP  (top-centre, ~258,116) ── */}
      <g transform="translate(208,116) scale(0.54) translate(-65,-25)">
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={s(3) ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55, ...popIn }}
        >
          <ShipShape />
        </motion.g>
      </g>

      {/* ── TRUCK  (upper-right, ~378,158) ── */}
      <g transform="translate(318,116) scale(0.50) translate(-58,-22)">
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={s(4) ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55, ...popIn }}
        >
          <TruckShape />
        </motion.g>
      </g>

      {/* ── TRAIN  (right side, ~432,184, slight tilt) ── */}
      <g transform="translate(432,152) rotate(6) scale(0.48) translate(-62,-23)">
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={s(5) ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55, ...popIn }}
        >
          <TrainShape />
        </motion.g>
      </g>

      {/* ================================================================
          3. TSLC LETTERS  (inside the oval)
          T & S appear at stage 6 · L & C at stage 7
          ================================================================ */}

      {/* T — blue */}
      <motion.text
        x="170" y="285"
        textAnchor="middle"
        fontSize="110"
        fontFamily="'Barlow Condensed', 'Arial Black', sans-serif"
        fontWeight="800"
        fill={BLUE}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={s(6) ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0, ...popIn }}
      >T</motion.text>

      {/* S — blue */}
      <motion.text
        x="221" y="285"
        textAnchor="middle"
        fontSize="110"
        fontFamily="'Barlow Condensed', 'Arial Black', sans-serif"
        fontWeight="800"
        fill={BLUE}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={s(6) ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ...popIn }}
      >S</motion.text>

      {/* L — green */}
      <motion.text
        x="271" y="285"
        textAnchor="middle"
        fontSize="110"
        fontFamily="'Barlow Condensed', 'Arial Black', sans-serif"
        fontWeight="800"
        fill={GREEN}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={s(7) ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0, ...popIn }}
      >L</motion.text>

      {/* C — green */}
      <motion.text
        x="325" y="285"
        textAnchor="middle"
        fontSize="110"
        fontFamily="'Barlow Condensed', 'Arial Black', sans-serif"
        fontWeight="800"
        fill={GREEN}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={s(7) ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ...popIn }}
      >C</motion.text>

      {/* ================================================================
          4. TAGLINE  (below the oval)
          ================================================================ */}
      <motion.g
        initial={{ opacity: 0, y: 12 }}
        animate={s(8) ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <text
          x="260" y="356"
          textAnchor="middle"
          fontSize="21"
          fontFamily="'Barlow', Arial, sans-serif"
          fontWeight="700"
          fill={BLUE}
          letterSpacing="0.8"
        >
          Transportation Science
        </text>
      </motion.g>

      <motion.g
        initial={{ opacity: 0, y: 12 }}
        animate={s(8) ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.18, ease: 'easeOut' }}
      >
        <text
          x="260" y="385"
          textAnchor="middle"
          fontSize="21"
          fontFamily="'Barlow', Arial, sans-serif"
          fontWeight="600"
          fill={GREEN}
          letterSpacing="0.5"
        >
          Learning Community
        </text>
      </motion.g>
    </svg>
  );
}
