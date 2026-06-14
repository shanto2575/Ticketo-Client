"use client";

import { FaAward, FaShieldAlt, FaUsers } from "react-icons/fa";
import { motion } from "motion/react";

export default function WhyChoose() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, 
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.95,
      filter: "blur(6px)" 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 90, 
        damping: 18 
      },
    },
  };

  return (
    <section className="relative py-28 max-w-7xl mx-auto px-6 w-full overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 70, damping: 15 }}
        className="text-center mb-20 space-y-4"
      >
        <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          Why Choose <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Eventora</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
          Delivering an elite and state-of-the-art event management system that empowers everyone.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }} 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* CARD 1: PREMIUM EVENTS */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            borderColor: "rgba(236, 72, 153, 0.3)", 
            boxShadow: "0 20px 40px -15px rgba(236, 72, 153, 0.1)"
          }}
          whileTap={{ scale: 0.98 }}
          className="glass p-8 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md transition-colors duration-300 group cursor-pointer"
        >
          <div className="bg-pink-500/10 text-pink-400 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-300">
            <FaAward size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors duration-300">
            Premium Events Only
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
            Every event created is moderated by administrators to guarantee maximum platform authenticity and top-tier event experiences.
          </p>
        </motion.div>

        {/* CARD 2: SECURE CHECKOUT */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            borderColor: "rgba(99, 102, 241, 0.3)", 
            boxShadow: "0 20px 40px -15px rgba(99, 102, 241, 0.1)"
          }}
          whileTap={{ scale: 0.98 }}
          className="glass p-8 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md transition-colors duration-300 group cursor-pointer"
        >
          <div className="bg-indigo-500/10 text-indigo-400 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
            <FaShieldAlt size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors duration-300">
            100% Secure Checkout
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
            Ticket transactions and package upgrades are integrated directly with Stripe Checkout, keeping payments fast and secure.
          </p>
        </motion.div>

        {/* CARD 3: ANALYTICS */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            borderColor: "rgba(168, 85, 247, 0.3)", 
            boxShadow: "0 20px 40px -15px rgba(168, 85, 247, 0.1)"
          }}
          whileTap={{ scale: 0.98 }}
          className="glass p-8 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md transition-colors duration-300 group cursor-pointer"
        >
          <div className="bg-purple-500/10 text-purple-400 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
            <FaUsers size={28} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
            Organizer Analytics
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
            Organizers receive dedicated dashboards containing detailed tables of attendees, ticket sales tracking, and real-time revenue stats.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}