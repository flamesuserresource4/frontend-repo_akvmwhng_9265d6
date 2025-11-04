import { motion } from 'framer-motion';
import RelicCard from './RelicCard';

export default function StockGrid({ items, onSelect, onBack }) {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="relative">
        {/* Top noise bar */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-30" style={{ backgroundImage: 'radial-gradient(ellipse at top, rgba(255,255,255,0.15), transparent 60%)' }} />

        <div className="mx-auto max-w-6xl px-6 pt-24 pb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Ethereal Stock Update</h2>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] opacity-60">Relics // Hoodies // Tees // Drops</p>
            </div>
            <button onClick={onBack} className="text-xs uppercase tracking-widest border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-black transition">
              Return to Vault
            </button>
          </div>

          <motion.div
            layout
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((item) => (
              <RelicCard key={item.id} item={item} onSelect={onSelect} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
