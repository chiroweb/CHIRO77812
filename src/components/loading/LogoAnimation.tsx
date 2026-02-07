"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LogoAnimationProps {
    onComplete?: () => void;
    duration?: number;
}

export default function LogoAnimation({
    onComplete,
    // User requested ~2 seconds visibility, so total duration should be around 3s (intro + hold + exit)
    duration = 3.0
}: LogoAnimationProps) {
    const [phase, setPhase] = useState<"drawing" | "pause" | "fade">("drawing");

    useEffect(() => {
        // Sequence:
        // 0s: Start
        // 2.0s: Animation finishes (approx)
        // 2.0s ~ 3.0s: Hold (Pause)
        // 3.0s: Fade out
        // 3.8s: Complete

        const pauseTimer = setTimeout(() => setPhase("pause"), duration * 1000 - 1000); // e.g., at 2.0s
        const fadeTimer = setTimeout(() => setPhase("fade"), duration * 1000); // e.g., at 3.0s
        const completeTimer = setTimeout(() => {
            onComplete?.();
        }, (duration + 0.8) * 1000); // e.g., at 3.8s

        return () => {
            clearTimeout(pauseTimer);
            clearTimeout(fadeTimer);
            clearTimeout(completeTimer);
        };
    }, [duration, onComplete]);

    return (
        <AnimatePresence>
            {phase !== "fade" ? null : null}
            <motion.div
                className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center cursor-pointer"
                initial={{ opacity: 1 }}
                animate={{ opacity: phase === "fade" ? 0 : 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onClick={() => onComplete?.()}
            >
                <div className="relative flex flex-col items-center justify-center text-white">
                    {/* CHIRO Text Animation */}
                    <motion.h1
                        className="text-[15vw] md:text-[8vw] font-bold leading-none tracking-widest font-[family-name:var(--font-space-grotesk)]"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for smooth easing
                        }}
                    >
                        CHIRO
                    </motion.h1>

                    <div className="w-full h-[1px] bg-white/30 my-4 md:my-6 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-white"
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
                        />
                    </div>

                    {/* WEB DESIGN Text Animation */}
                    <motion.p
                        className="text-[5vw] md:text-[2.5vw] font-light tracking-[0.5em] text-white/90 font-[family-name:var(--font-jetbrains-mono)]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 1.2, // Starts after divider line
                            duration: 1.0,
                            ease: "easeOut",
                        }}
                    >
                        WEB DESIGN
                    </motion.p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
