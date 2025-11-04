import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ItemView({ item, onClose }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 bg-black/95 text-white"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-5xl h-full px-6 py-10"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl md:text-4xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] opacity-60">{item.type}</p>
            </div>
            <button onClick={onClose} className="text-xs uppercase tracking-widest border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-black transition">Close</button>
          </div>

          <div className="mt-10 relative rounded-xl border border-white/10 overflow-hidden min-h-[420px]">
            {/* Static flicker */}
            <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 1px, transparent 1px, transparent 3px)' }} />

            {/* Cinematic reveal content */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2">
              <div className="relative p-8 md:p-10 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.15]" style={{ background: 'radial-gradient(circle at 30% 20%, white, transparent 35%)' }} />
                <motion.div
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <Halo />
                  <div className="mt-6">
                    <p className="text-sm leading-relaxed opacity-80">{item.description}</p>
                  </div>
                </motion.div>
              </div>

              <div className="relative p-8 md:p-10">
                <div className="relative h-80">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <RelicSymbol status={item.status} />
                  </motion.div>

                  {/* drifting ash */}
                  <AshParticles count={40} />
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <StatusDetail status={item.status} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function StatusDetail({ status }) {
  if (status === 'available') {
    return (
      <div className="flex items-center gap-2">
        <motion.span className="w-2.5 h-2.5 rounded-full bg-white" animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 1.6, repeat: Infinity }} />
        <span className="text-sm opacity-80">Available — the relic hums with a faint heartbeat.</span>
      </div>
    );
  }
  return <span className="text-sm opacity-70">Sold Out — the relic fades into static and distortion.</span>;
}

function AshParticles({ count = 30 }) {
  const particles = useMemo(() => new Array(count).fill(0).map(() => ({
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    delay: Math.random() * 4,
    drift: Math.random() * 24 - 12,
    duration: 6 + Math.random() * 6,
  })), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-[-8%] bg-white/60 rounded-full"
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          animate={{ y: ['-8%', '108%'], x: [0, p.drift], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

function Halo() {
  return (
    <div className="relative">
      <motion.div
        className="mx-auto w-56 h-56 md:w-72 md:h-72 rounded-full"
        style={{ boxShadow: '0 0 120px 20px rgba(255,255,255,0.12) inset, 0 0 80px rgba(255,255,255,0.12)' }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
      >
        <svg viewBox="0 0 200 200" className="w-56 h-56 md:w-72 md:h-72">
          <defs>
            <filter id="haloNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" />
              <feDisplacementMap in="SourceGraphic" scale="3" />
            </filter>
          </defs>
          <g filter="url(#haloNoise)">
            <circle cx="100" cy="100" r="78" stroke="white" strokeWidth="2" fill="none" opacity="0.9" />
            <circle cx="100" cy="100" r="52" stroke="white" strokeWidth="1" fill="none" opacity="0.6" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

function RelicSymbol({ status }) {
  const soldOut = status !== 'available';
  return (
    <div className="relative w-64 h-64">
      <motion.svg viewBox="0 0 220 220" className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="rnoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" />
            <feDisplacementMap in="SourceGraphic" scale="soldOut ? 6 : 2" />
          </filter>
        </defs>
        <g filter="url(#rnoise)">
          <circle cx="110" cy="110" r="82" stroke="white" strokeWidth="3" fill="none" />
          <path d="M110 20 L110 200" stroke="white" strokeWidth="2" />
          <path d="M40 70 L180 150" stroke="white" strokeWidth="1.5" />
          <path d="M180 70 L40 150" stroke="white" strokeWidth="1.5" />
        </g>
      </motion.svg>
      {soldOut && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.2, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.25)_0px,rgba(255,255,255,0.25)_2px,transparent_2px,transparent_4px)]"
        />
      )}
    </div>
  );
}
