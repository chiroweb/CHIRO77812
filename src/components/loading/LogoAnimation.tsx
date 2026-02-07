"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { chiroFullPath, webdesignFullPath } from "./logo-paths";

interface LogoAnimationProps {
    onComplete?: () => void;
    duration?: number;
}

export default function LogoAnimation({
    onComplete,
    duration = 2.8
}: LogoAnimationProps) {
    const [phase, setPhase] = useState<"drawing" | "pause" | "fade">("drawing");

    useEffect(() => {
        // drawing -> pause -> fade -> complete
        const pauseTimer = setTimeout(() => setPhase("pause"), duration * 1000);
        const fadeTimer = setTimeout(() => setPhase("fade"), (duration + 0.6) * 1000);
        const completeTimer = setTimeout(() => {
            onComplete?.();
        }, (duration + 1.2) * 1000);

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
                className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center cursor-pointer"
                initial={{ opacity: 1 }}
                animate={{ opacity: phase === "fade" ? 0 : 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                onClick={() => onComplete?.()} // Allow skip on click
            >
                <div className="w-[80vw] max-w-[600px]">
                    <svg
                        viewBox="0 0 700 350"  // Adjusted for placeholder paths. Update this if you change paths!
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto"
                    >
                        {/* --- CHIRO Text --- */}
                        <motion.path
                            d={chiroFullPath}
                            stroke="#ffffff"
                            strokeWidth={8} // Thicker because my placeholder paths are larger scale/simple lines
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="transparent"
                            initial={{ pathLength: 0, opacity: 1 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                                pathLength: {
                                    duration: duration * 0.6,
                                    ease: [0.65, 0, 0.35, 1],
                                },
                            }}
                        />

                        {/* CHIRO Fill (appears after stroke) */}
                        <motion.path
                            d={chiroFullPath}
                            fill="#ffffff"
                            stroke="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: duration * 0.55,
                                duration: 0.4,
                                ease: "easeOut",
                            }}
                        />

                        {/* --- WEB DESIGN Text --- */}
                        <motion.path
                            d={webdesignFullPath}
                            stroke="#ffffff"
                            strokeWidth={4}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="transparent"
                            initial={{ pathLength: 0, opacity: 1 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                                pathLength: {
                                    delay: duration * 0.4,
                                    duration: duration * 0.5,
                                    ease: [0.65, 0, 0.35, 1],
                                },
                            }}
                        />

                        {/* WEB DESIGN Fill */}
                        <motion.path
                            d={webdesignFullPath}
                            fill="#ffffff"
                            stroke="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: duration * 0.85,
                                duration: 0.4,
                                ease: "easeOut",
                            }}
                        />
                    </svg>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
