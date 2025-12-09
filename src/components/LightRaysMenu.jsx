import React from 'react';
import { motion } from 'framer-motion';

export default function LightRaysMenu() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Light Rays from top */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Ray 1 */}
        <motion.div
          className="absolute top-20 left-1/4 w-px bg-gradient-to-b from-white/60 via-blue-200/40 to-transparent"
          style={{ height: '80vh' }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Ray 2 */}
        <motion.div
          className="absolute top-20 left-1/2 w-px bg-gradient-to-b from-white/50 via-cyan-200/35 to-transparent"
          style={{ height: '75vh' }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleY: [1, 0.9, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Ray 3 */}
        <motion.div
          className="absolute top-20 right-1/4 w-px bg-gradient-to-b from-white/55 via-blue-300/45 to-transparent"
          style={{ height: '85vh' }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scaleY: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />

        {/* Ray 4 */}
        <motion.div
          className="absolute top-20 left-1/6 w-px bg-gradient-to-b from-white/45 via-teal-200/30 to-transparent"
          style={{ height: '70vh' }}
          animate={{
            opacity: [0.25, 0.55, 0.25],
            scaleY: [1.1, 0.8, 1.1],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Ray 5 */}
        <motion.div
          className="absolute top-20 right-1/6 w-px bg-gradient-to-b from-white/50 via-cyan-300/40 to-transparent"
          style={{ height: '78vh' }}
          animate={{
            opacity: [0.35, 0.75, 0.35],
            scaleY: [0.85, 1.15, 0.85],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />

        {/* Ray 6 */}
        <motion.div
          className="absolute top-20 left-1/3 w-px bg-gradient-to-b from-white/40 via-blue-100/25 to-transparent"
          style={{ height: '82vh' }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleY: [1.05, 0.95, 1.05],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        />

        {/* Ray 7 */}
        <motion.div
          className="absolute top-20 right-1/3 w-px bg-gradient-to-b from-white/52 via-teal-300/42 to-transparent"
          style={{ height: '76vh' }}
          animate={{
            opacity: [0.3, 0.65, 0.3],
            scaleY: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />

        {/* Ray 8 */}
        <motion.div
          className="absolute top-20 left-1/5 w-px bg-gradient-to-b from-white/48 via-indigo-200/35 to-transparent"
          style={{ height: '72vh' }}
          animate={{
            opacity: [0.28, 0.58, 0.28],
            scaleY: [1.02, 0.98, 1.02],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.2
          }}
        />

        {/* Ray 9 */}
        <motion.div
          className="absolute top-20 right-1/5 w-px bg-gradient-to-b from-white/55 via-sky-300/45 to-transparent"
          style={{ height: '80vh' }}
          animate={{
            opacity: [0.35, 0.75, 0.35],
            scaleY: [0.92, 1.08, 0.92],
          }}
          transition={{
            duration: 3.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        />

        {/* Ray 10 */}
        <motion.div
          className="absolute top-20 left-2/5 w-px bg-gradient-to-b from-white/42 via-emerald-200/32 to-transparent"
          style={{ height: '74vh' }}
          animate={{
            opacity: [0.22, 0.52, 0.22],
            scaleY: [1.08, 0.92, 1.08],
          }}
          transition={{
            duration: 5.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8
          }}
        />

        {/* Ray 11 */}
        <motion.div
          className="absolute top-20 right-2/5 w-px bg-gradient-to-b from-white/47 via-violet-200/38 to-transparent"
          style={{ height: '77vh' }}
          animate={{
            opacity: [0.27, 0.57, 0.27],
            scaleY: [0.97, 1.03, 0.97],
          }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.8
          }}
        />

        {/* Ray 12 */}
        <motion.div
          className="absolute top-20 left-1/8 w-px bg-gradient-to-b from-white/38 via-slate-200/28 to-transparent"
          style={{ height: '68vh' }}
          animate={{
            opacity: [0.18, 0.48, 0.18],
            scaleY: [1.12, 0.88, 1.12],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.9
          }}
        />

        {/* Ray 13 */}
        <motion.div
          className="absolute top-20 right-1/8 w-px bg-gradient-to-b from-white/51 via-rose-200/41 to-transparent"
          style={{ height: '79vh' }}
          animate={{
            opacity: [0.31, 0.61, 0.31],
            scaleY: [0.89, 1.11, 0.89],
          }}
          transition={{
            duration: 4.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.5
          }}
        />

        {/* Ray 14 */}
        <motion.div
          className="absolute top-20 left-3/4 w-px bg-gradient-to-b from-white/44 via-amber-200/34 to-transparent"
          style={{ height: '73vh' }}
          animate={{
            opacity: [0.24, 0.54, 0.24],
            scaleY: [1.06, 0.94, 1.06],
          }}
          transition={{
            duration: 4.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
        />

        {/* Ray 15 */}
        <motion.div
          className="absolute top-20 right-3/4 w-px bg-gradient-to-b from-white/49 via-lime-200/39 to-transparent"
          style={{ height: '81vh' }}
          animate={{
            opacity: [0.29, 0.59, 0.29],
            scaleY: [0.94, 1.06, 0.94],
          }}
          transition={{
            duration: 4.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.1
          }}
        />
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 via-blue-50/3 to-transparent" />
    </div>
  );
}