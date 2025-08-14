import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-4"
        >
          <Dumbbell className="h-16 w-16 text-red-500" />
        </motion.div>
        <motion.h1
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-2xl font-bold text-white"
        >
          POWERLIFT
        </motion.h1>
      </div>
    </div>
  );
}