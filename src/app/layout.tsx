"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";
import { useEffect, useState } from "react";
import "../styles/globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  // State to hold star elements
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    // Generate stars with random positions and durations only on the client
    const generatedStars = Array.from({ length: 100 }, (_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 5 + 5;

      return (
        <div
          key={i}
          className="star"
          style={{
            left: `${x}vw`,
            top: `${y}vh`,
            animationDuration: `${duration}s`,
          }}
        ></div>
      );
    });

    // Set stars in state after component mounts
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    // Add event listeners to reposition  stars after each animation cycle
    const starElements = document.querySelectorAll(".star");
    starElements.forEach((star) => {
      star.addEventListener("animationiteration", () => {
        // Randomize the position of each star on every animation iteration
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        (star as HTMLElement).style.left = `${x}vw`;
        (star as HTMLElement).style.top = `${y}vh`;
      });
    });
  }, [stars]); // Re-run this effect after stars are set

  return (
    <html lang="en">
      <body>
        <div className="starfield">{stars}</div>
        {children}
      </body>
    </html>
  );
}