import { motion } from 'framer-motion';

export default function RelicCard({ item, onSelect }) {
  const isAvailable = item.status === 'available';

  return (
    <motion.button
      onClick={() => onSelect(item)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group relative w-full overflow-hidden rounded-xl border border-white/15 bg-black/60 p-0 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset]"
    >
      {/* Pulsing border for available */}
      {isAvailable && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.12) inset' }}
          animate={{ boxShadow: ['0 0 0 1px rgba(255,255,255,0.12) inset', '0 0 0 2px rgba(255,255,255,0.28) inset', '0 0 0 1px rgba(255,255,255,0.12) inset'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Glitch/static layer */}
      <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)' }} />

      {/* Ash fall layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(16)].map((_, i) => {
          const size = 1 + Math.random() * 2;
          const left = Math.random() * 100;
          const delay = Math.random() * 4;
          const duration = 4 + Math.random() * 4;
          return (
            <motion.span
              key={i}
              className="absolute top-[-12%] bg-white/60 rounded-full"
              style={{ left: `${left}%`, width: size, height: size }}
              animate={{ y: ['-12%', '112%'], x: [0, Math.random() * 16 - 8], opacity: [0, 0.7, 0] }}
              transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-medium tracking-tight">{item.title}</h3>
            <p className="text-xs uppercase tracking-[0.25em] opacity-60 mt-1">{item.type}</p>
          </div>
          <div className="text-right">
            <StatusBadge status={item.status} />
          </div>
        </div>

        {/* Distressed symbol */}
        <div className="mt-6 relative h-36">
          <motion.div
            className="absolute inset-0"
            initial={{ rotate: 0, scale: 0.95, opacity: 0.8 }}
            whileHover={{ rotate: 6, scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          >
            <DistressedRing />
          </motion.div>
        </div>
      </div>

      {/* Sold out distortion overlay */}
      {!isAvailable && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.2, 0.45] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.25)_0px,rgba(255,255,255,0.25)_2px,transparent_2px,transparent_4px)]"
        />
      )}
    </motion.button>
  );
}

function StatusBadge({ status }) {
  if (status === 'available') {
    return (
      <div className="flex items-center gap-2">
        <motion.span
          className="block w-2.5 h-2.5 rounded-full bg-white"
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-xs opacity-80">Available</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs opacity-70">Sold Out</span>
    </div>
  );
}

function DistressedRing() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <filter id="grunge">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
          <feDisplacementMap in="SourceGraphic" scale="4" />
        </filter>
        <mask id="ringMask">
          <rect width="100%" height="100%" fill="black" />
          <circle cx="100" cy="100" r="58" fill="white" />
          <circle cx="100" cy="100" r="42" fill="black" />
        </mask>
      </defs>
      <g mask="url(#ringMask)" filter="url(#grunge)">
        <rect width="100%" height="100%" fill="white" />
      </g>
      {/* cracks */}
      <g stroke="white" strokeWidth="1" opacity="0.6">
        <path d="M100 20 L100 180" />
        <path d="M30 60 L170 140" />
        <path d="M170 60 L30 140" />
      </g>
    </svg>
  );
}
