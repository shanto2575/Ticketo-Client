"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function Testimonials() {
  const fadeInLeftVariants = {
    hidden: { opacity: 0, x: -50, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 80, damping: 16 }
    }
  };

  const fadeInRightVariants = {
    hidden: { opacity: 0, x: 50, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 80, damping: 16 }
    }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 w-full overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -30, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 70, damping: 15 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold text-white md:text-4xl font-sans">Client Testimonials</h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm mt-3">
          Don't just take our word for it. Hear from leading organizers and attendees enjoying the platform.
        </p>
      </motion.div>

      {/* TESTIMONIALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CARD 1 - LEFT ENTRY */}
        <motion.div 
          variants={fadeInLeftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          whileHover={{ 
            y: -8, 
            scale: 1.01,
            borderColor: "rgba(236, 72, 153, 0.25)",
            boxShadow: "0 20px 40px -20px rgba(236, 72, 153, 0.15)"
          }}
          whileTap={{ scale: 0.99 }}
          className="bg-slate-900/50 border border-white/5 backdrop-blur-xl transition-all duration-300 p-8 rounded-2xl space-y-6 relative cursor-pointer"
        >
          <p className="text-slate-300 italic text-md leading-relaxed">
            "Creating events with Ticketo has completely transformed how our organization connects with tech enthusiasts. Setting up ticket pricing and tracking seat availability takes seconds, and Stripe handles the checkout seamlessly."
          </p>
          <div className="flex items-center gap-4">
            <Image
              width={48}
              height={48}
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
              className="rounded-full h-12 w-12 object-cover shrink-0 border border-white/10" 
              alt="user image" 
            />
            <div>
              <h4 className="text-white font-bold text-sm">Sarah Jenkins</h4>
              <p className="text-pink-500 text-xs font-semibold">Director, TechVibe Events</p>
            </div>
          </div>
        </motion.div>

        {/* CARD 2 - RIGHT ENTRY */}
        <motion.div 
          variants={fadeInRightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          whileHover={{ 
            y: -8, 
            scale: 1.01,
            borderColor: "rgba(236, 72, 153, 0.25)",
            boxShadow: "0 20px 40px -20px rgba(236, 72, 153, 0.15)"
          }}
          whileTap={{ scale: 0.99 }}
          className="bg-slate-900/50 border border-white/5 backdrop-blur-xl transition-all duration-300 p-8 rounded-2xl space-y-6 relative cursor-pointer"
        >
          <p className="text-slate-300 italic text-md leading-relaxed">
            "As an attendee, I appreciate the modern, clean interface. Searching and filtering by category or location works instantly, and my dashboard keeps all my ticket barcodes and payment history perfectly organized."
          </p>
          <div className="flex items-center gap-4">
            <Image 
              width={48} 
              height={48} 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
              className="rounded-full w-12 h-12 object-cover shrink-0 border border-white/10" 
              alt="user image" 
            />
            <div>
              <h4 className="text-white font-bold text-sm">Marcus Brody</h4>
              <p className="text-pink-500 text-xs font-semibold">Fervent Event Attendee</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}