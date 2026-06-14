"use client";

import Link from "next/link";
import { FaTicketAlt, FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { motion } from "motion/react";

export default function Footer() {
  // ফুটারের ৪টি কলাম যেন একটার পর একটা স্লাইড করে আসে (Stagger Effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // প্রতিটি কলাম ১০ms পর পর আসবে
      },
    },
  };

  // প্রতিটি কলামের এন্ট্রি অ্যানিমেশন
  const columnVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 90, damping: 16 },
    },
  };

  return (
    <footer className="border-t border-white/5 bg-slate-950/80 pt-16 pb-12 mt-auto overflow-hidden">
      {/* MAIN FOOTER CONTENT GRID WITH MOTION */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }} // স্ক্রোল করলে বারবার অ্যানিমেট হবে
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10"
      >
        {/* COLUMN 1: BRAND & SOCIALS */}
        <motion.div variants={columnVariants} className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="bg-gradient-to-tr from-pink-500 to-indigo-500 p-2 rounded-lg text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
              <FaTicketAlt className="text-lg" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-pink-500 bg-clip-text text-transparent">
              Ticketo
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            The next-generation event discovery and seamless ticket booking platform connecting passionate organizers with eager attendees.
          </p>
          {/* SOCIAL ICONS MICRO-ANIMATION */}
          <div className="flex gap-4 text-slate-400">
            {[
              { icon: <FaFacebook size={18} />, href: "#" },
              { icon: <FaTwitter size={18} />, href: "#" },
              { icon: <FaInstagram size={18} />, href: "#" },
              { icon: <FaGithub size={18} />, href: "#" }
            ].map((social, index) => (
              <motion.a 
                key={index}
                href={social.href} 
                whileHover={{ y: -4, scale: 1.15, color: "#ec4899" }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* COLUMN 2: DISCOVER EVENTS */}
        <motion.div variants={columnVariants}>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Discover Events</h3>
          <ul className="space-y-2.5 text-slate-400 text-sm">
            {[
              { text: "Music Festivals", href: "/events?category=Music" },
              { text: "Tech Conferences", href: "/events?category=Tech" },
              { text: "Sports Matches", href: "/events?category=Sports" },
              { text: "Art Exhibitions", href: "/events?category=Arts" }
            ].map((link, index) => (
              <li key={index}>
                <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}>
                  <Link href={link.href} className="hover:text-white transition-colors block w-fit">
                    {link.text}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* COLUMN 3: FOR ORGANIZERS */}
        <motion.div variants={columnVariants}>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">For Organizers</h3>
          <ul className="space-y-2.5 text-slate-400 text-sm">
            {[
              { text: "Create Organization", href: "/register?role=organizer" },
              { text: "Host an Event", href: "/login" },
              { text: "Premium Packages", href: "/login" },
              { text: "Pricing & Fees", href: "#" }
            ].map((link, index) => (
              <li key={index}>
                <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} className="hover:text-white transition-colors block w-fit">
                      {link.text}
                    </Link>
                  ) : (
                    <a href={link.href} className="hover:text-white transition-colors block w-fit">
                      {link.text}
                    </a>
                  )}
                </motion.div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* COLUMN 4: COMPANY */}
        <motion.div variants={columnVariants}>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
          <ul className="space-y-2.5 text-slate-400 text-sm">
            {["About Us", "Careers", "Privacy Policy", "Terms of Service"].map((text, index) => (
              <li key={index}>
                <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}>
                  <a href="#" className="hover:text-white transition-colors block w-fit">
                    {text}
                  </a>
                </motion.div>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* COPYRIGHT NOTIFICATION */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-12 pt-8 text-center text-slate-500 text-xs"
      >
        <p>&copy; {new Date().getFullYear()} Ticketo Inc. All rights reserved. Developed by Antigravity AI.</p>
      </motion.div>
    </footer>
  );
}