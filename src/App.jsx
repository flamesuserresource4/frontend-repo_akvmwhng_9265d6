import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroRing from './components/HeroRing';
import StockGrid from './components/StockGrid';
import ItemView from './components/ItemView';

export default function App() {
  const [view, setView] = useState('hero');
  const [selected, setSelected] = useState(null);

  const items = [
    {
      id: 'r1',
      title: 'Obsidian Hood — Mark I',
      type: 'Hoodie / Relic',
      status: 'available',
      description:
        'Forged from void and echo. The ring fractures but never yields. Matte black fibers with distressed weave; minimal mark hidden in the seams.',
    },
    {
      id: 'r2',
      title: 'Signal Tee — Ghost Print',
      type: 'Tee / Relic',
      status: 'soldout',
      description:
        'An omen in static. Ink like burnt film; design emerges only in certain light. The message glitched, the prophecy intact.',
    },
    {
      id: 'r3',
      title: 'Apex Hood — Ring Collapse',
      type: 'Hoodie / Drop',
      status: 'available',
      description:
        'Pressure-tempered fleece with fractured ring sigil. Built for the corridor between dusk and the unknown.',
    },
    {
      id: 'r4',
      title: 'Ashfall Tee — Mark II',
      type: 'Tee / Drop',
      status: 'soldout',
      description:
        'Softweight jersey dusted in phantom ash. Print degraded on purpose; edges surrender to noise.',
    },
    {
      id: 'r5',
      title: 'Veil Crew — Hollow Core',
      type: 'Crewneck / Relic',
      status: 'available',
      description:
        'Double-knit shell with inner hum. Subtle ring emboss, seen when you look away. Clean, cold, certain.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {view === 'hero' ? (
          <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HeroRing onEnter={() => setView('grid')} />
          </motion.div>
        ) : (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StockGrid items={items} onSelect={setSelected} onBack={() => setView('hero')} />
          </motion.div>
        )}
      </AnimatePresence>

      <ItemView item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
