'use client';

import { motion } from 'framer-motion';

const shapes = [
  { size: 300, x: '10%', y: '20%', color: 'bg-blue-400/10', duration: 8, delay: 0 },
  { size: 200, x: '75%', y: '15%', color: 'bg-indigo-300/10', duration: 10, delay: 1 },
  { size: 250, x: '85%', y: '60%', color: 'bg-blue-500/10', duration: 7, delay: 0.5 },
  { size: 180, x: '5%', y: '70%', color: 'bg-cyan-300/10', duration: 9, delay: 2 },
  { size: 150, x: '50%', y: '80%', color: 'bg-blue-300/10', duration: 11, delay: 1.5 },
];

export default function AnimatedShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${shape.color}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 30, -10, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
