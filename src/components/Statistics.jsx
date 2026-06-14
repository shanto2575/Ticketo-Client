"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

function Counter({ value }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString());
  const isInView = useInView(ref, { once: false, amount: 0.5 }); 

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    } else {
      motionValue.set(0);
    }
  }, [isInView, value, motionValue]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Statistics({ stats }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-r from-pink-900/10 via-indigo-900/10 to-transparent border-t border-white/5 w-full overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} 
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
      >
        {/* STAT 1: EVENTS */}
        <motion.div variants={itemVariants} className="space-y-2 group cursor-default">
          <div className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text transition-transform duration-300 group-hover:scale-105 inline-block">
            <Counter value={stats.totalEvents} />+
          </div>
          <p className="text-slate-300 font-semibold text-sm uppercase tracking-wider group-hover:text-pink-400 transition-colors duration-300">
            Premium Events Held
          </p>
        </motion.div>

        {/* STAT 2: ATTENDEES */}
        <motion.div variants={itemVariants} className="space-y-2 group cursor-default">
          <div className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text transition-transform duration-300 group-hover:scale-105 inline-block">
            <Counter value={stats.totalAttendees} />+
          </div>
          <p className="text-slate-300 font-semibold text-sm uppercase tracking-wider group-hover:text-indigo-400 transition-colors duration-300">
            Happy Attendees
          </p>
        </motion.div>

        {/* STAT 3: ORGANIZATIONS */}
        <motion.div variants={itemVariants} className="space-y-2 group cursor-default">
          <div className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text transition-transform duration-300 group-hover:scale-105 inline-block">
            <Counter value={stats.totalOrgs} />+
          </div>
          <p className="text-slate-300 font-semibold text-sm uppercase tracking-wider group-hover:text-purple-400 transition-colors duration-300">
            Vetted Organizations
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}