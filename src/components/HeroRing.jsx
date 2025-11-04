import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroRing({ onEnter }) {
  const [shatter, setShatter] = useState(false);

  const handleEnter = () => {
    setShatter(true);
    // Wait for shatter animation before entering grid
    setTimeout(() => onEnter(), 900);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Grain / static overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06), transparent 60%)' }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 2px)' }} />

      <div className="relative z-10 flex flex-col items-center select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <div className="text-center mb-10">
            <p className="tracking-[0.35em] text-xs uppercase opacity-70">A mythic vault of relics</p>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-2">Ethereal Stock Update</h1>
          </div>

          {/* Rotating cracked ring */}
          <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px]">
            {/* Outer glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ opacity: [0.25, 0.5, 0.25] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              style={{ boxShadow: '0 0 120px 20px rgba(255,255,255,0.08) inset, 0 0 80px rgba(255,255,255,0.12)' }}
            />

            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              className="absolute inset-0"
              initial={{ rotate: 0, opacity: 1, scale: 1 }}
              animate={shatter ? { scale: 1.4, opacity: 0 } : { rotate: 360 }}
              transition={shatter ? { duration: 0.8, ease: [0.16, 1, 0.3, 1] } : { repeat: Infinity, duration: 16, ease: 'linear' }}
            >
              <defs>
                {/* Grunge stroke via mask */}
                <filter id="noise" x="-50%" y="-50%" width="200%" height="200%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
                  <feComponentTransfer>
                    <feFuncA type="table" tableValues="0 0.4 0.9 1" />
                  </feComponentTransfer>
                </filter>
                <mask id="crackMask">
                  <rect width="100%" height="100%" fill="black" />
                  <circle cx="200" cy="200" r="150" fill="white" />
                </mask>
              </defs>
              <g mask="url(#crackMask)">
                <circle cx="200" cy="200" r="150" fill="none" stroke="white" strokeWidth="6" strokeOpacity="0.9" />
                {/* Cracks */}
                <g filter="url(#noise)" stroke="white" strokeWidth="2" strokeOpacity="0.7">
                  <path d="M200 50 L200 350" />
                  <path d="M80 120 L320 280" />
                  <path d="M320 120 L80 280" />
                </g>
              </g>
            </motion.svg>

            {/* Shards that fling outward on enter */}
            <AnimatePresence>
              {shatter && (
                [...Array(12)].map((_, i) => {
                  const angle = (i / 12) * Math.PI * 2;
                  const dx = Math.cos(angle) * 220;
                  const dy = Math.sin(angle) * 220;
                  return (
                    <motion.div
                      key={i}
                      initial={{ x: 0, y: 0, scale: 0.9, opacity: 1 }}
                      animate={{ x: dx, y: dy, scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-1/2 w-6 h-10 -ml-3 -mt-5 bg-white/80"
                      style={{ clipPath: 'polygon(50% 0%, 90% 30%, 70% 100%, 30% 100%, 10% 30%)' }}
                    />
                  );
                })
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={handleEnter}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 border border-white/30 px-6 py-3 rounded-full uppercase tracking-widest text-xs backdrop-blur-sm hover:bg-white hover:text-black transition"
          >
            Enter Vault
          </motion.button>
        </motion.div>
      </div>

      {/* Subtle drifting ash */}
      <AshField />
    </div>
  );
}

function AshField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(40)].map((_, i) => {
        const delay = Math.random() * 4;
        const duration = 6 + Math.random() * 6;
        const left = Math.random() * 100;
        const size = 1 + Math.random() * 3;
        return (
          <motion.span
            key={i}
            className="absolute top-[-10%] bg-white/50 rounded-full"
            style={{ left: `${left}%`, width: size, height: size }}
            animate={{ y: ['-10%', '110%'], x: [0, Math.random() * 20 - 10], opacity: [0, 0.8, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
          />
        );
      })}
    </div>
  );
}
