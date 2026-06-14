"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaTicketAlt, FaUser, FaSignOutAlt, FaThLarge } from "react-icons/fa";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const pathname = usePathname();
  const route = useRouter()
  const { data: session } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  // console.log(session)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut()
    route.push('/')
  };

  // console.log(session)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/65 backdrop-blur-md py-3.5 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Logo />

        {/* NAVIGATION LINKS */}
        <div className="hidden sm:flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium relative py-1 transition-colors ${pathname === "/" ? "text-pink-500 font-semibold" : "text-slate-300 hover:text-white"}`}
          >
            Home
            {pathname === "/" && (
              <motion.div 
                layoutId="navUnderline" 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-pink-500 rounded-full" 
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
          <Link
            href="/events"
            className={`text-sm font-medium relative py-1 transition-colors ${pathname.startsWith("/events") ? "text-pink-500 font-semibold" : "text-slate-300 hover:text-white"}`}
          >
            Browse Events
            {pathname.startsWith("/events") && (
              <motion.div 
                layoutId="navUnderline" 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-pink-500 rounded-full" 
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
          {session && session?.user && (
            <Link
              href={`/dashboard/${session?.user?.role}`}
              className={`text-sm font-medium relative py-1 transition-colors ${pathname.startsWith("/dashboard") ? "text-pink-500 font-semibold" : "text-slate-300 hover:text-white"}`}
            >
              Dashboard
              {pathname.startsWith("/dashboard") && (
                <motion.div 
                  layoutId="navUnderline" 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-pink-500 rounded-full" 
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          )}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">

          {!session && (
            <div className="flex items-center gap-3">
              <Link href={'/login'}>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center font-semibold text-xs text-slate-300 hover:text-white h-9 px-4 rounded-xl hover:bg-white/5 transition"
                >
                  Login
                </motion.button>
              </Link>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05, y: -1, filter: "brightness(1.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center font-semibold text-xs bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 transition h-9 px-4 rounded-xl"
                >
                  Sign Up
                </motion.button>
              </Link>
            </div>
          )}

          {session && session?.user && (
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="flex items-center transition-transform outline-none focus:outline-none cursor-pointer"
              >
                <Image
                  width={20}
                  height={20}
                  className="w-9 h-9 rounded-full object-cover border border-pink-500 shadow-md shadow-pink-500/10"
                  src={session?.user?.image}
                  alt="avatar"
                />
              </motion.button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.3 }}
                    className="absolute right-0 mt-3 w-56 bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl py-2 z-55 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {/* User info */}
                    <div className="px-4 py-2.5 border-b border-white/5 mb-1.5 cursor-default">
                      <p className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">
                        {session?.user?.role} Account
                      </p>
                      <p className="font-bold text-white text-sm mt-0.5">{session?.user?.name}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{session?.user?.email}</p>
                    </div>

                    {/* Actions */}
                    <Link
                      href="/dashboard/organizer"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer"
                    >
                      <FaThLarge className="text-slate-400 text-sm shrink-0" />
                      <span>My Dashboard</span>
                    </Link>

                    <Link
                      href={`/dashboard/${session?.user?.role}`}
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer"
                    >
                      <FaUser className="text-slate-400 text-sm shrink-0" />
                      <span>Profile Settings</span>
                    </Link>

                    <div className="border-t border-white/5 my-1.5" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition cursor-pointer"
                    >
                      <FaSignOutAlt className="text-sm shrink-0 text-red-400" />
                      <span>Log Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}