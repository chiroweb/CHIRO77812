"use client";

import { useState, useEffect } from "react";
import LogoAnimation from "./LogoAnimation";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [shouldShow, setShouldShow] = useState(true);

    useEffect(() => {
        // Check if user has visited in this session
        const visited = sessionStorage.getItem("chiro-visited");
        if (visited) {
            setIsLoading(false);
            setShouldShow(false);
        } else {
            // Prevent scrolling while loading
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const handleComplete = () => {
        setIsLoading(false);
        setShouldShow(false);
        sessionStorage.setItem("chiro-visited", "true");
        document.body.style.overflow = ''; // Restore scrolling
    };

    return (
        <>
            {isLoading && shouldShow && (
                <LogoAnimation onComplete={handleComplete} />
            )}
            <div
                // Keep content visible behind the overlay so it's revealed when overlay fades
                // We can add a subtle scale/fade-in if desired, but opacity-100 is safest for the reveal.
                className="min-h-screen"
            >
                {children}
            </div>
        </>
    );
}
