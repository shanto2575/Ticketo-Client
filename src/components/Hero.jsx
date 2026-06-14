"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaRocket } from "react-icons/fa";
import { motion } from "motion/react";

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, 
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring", stiffness: 100, damping: 18 },
        },
    };

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-6">
            {/* BACKGROUNDS */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-indigo-600/15 via-slate-950 to-slate-950 -z-10" />
            <div className="absolute top-1/4 left-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/10 to-indigo-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 -z-10" />

            {/* MAIN CONTENT BLOCK WITH MOTION */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-5xl text-center space-y-8"
            >
                {/* ROCKET BADGE */}
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/5 text-pink-400 text-xs font-semibold uppercase tracking-wider cursor-default"
                >
                    <FaRocket className="animate-pulse" /> Introducing Ticketo v2.0
                </motion.div>

                {/* MAIN HEADING */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight"
                >
                    Discover Premium Events &{" "}
                    <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                        Book Tickets
                    </span>{" "}
                    Seamlessly
                </motion.h1>

                {/* DESCRIPTION PARAGRAPH */}
                <motion.p
                    variants={itemVariants}
                    className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                >
                    Ticketo links passionate organizers with eager attendees. Browse local festivals, grand music nights, elite business seminars, and everything in between.
                </motion.p>

                {/* CALL TO ACTION BUTTONS */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    <Link href="/events" className="w-full sm:w-auto">
                        <Button
                            className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-14 px-8 text-md shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-98 transition-all w-full sm:w-auto"
                            radius="full"
                        >
                            Explore Events
                        </Button>
                    </Link>
                    <Link href="/" className="w-full sm:w-auto">
                        <Button
                            variant="bordered"
                            className="border-white/10 hover:bg-white/5 hover:border-white/20 hover:scale-105 active:scale-98 text-white font-semibold h-14 px-8 text-md w-full sm:w-auto border-2 transition-all"
                            radius="full"
                        >
                            Create Organization
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;