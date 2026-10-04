"use client";

import { useRef } from "react";
import { mcuMovies } from "@/lib/marvelMockData";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Timeline() {
  const containerRef = useRef(null);

  // Sort movies chronologically based on inUniverseYear
  const sortedMovies = [...mcuMovies].sort((a, b) => {
    // Extract the first year from strings like "1943 - 1945" or "1995"
    const yearA = parseInt(a.inUniverseYear.match(/\d{4}/)?.[0] || "0", 10);
    const yearB = parseInt(b.inUniverseYear.match(/\d{4}/)?.[0] || "0", 10);
    return yearA - yearB;
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Animate the central line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="min-h-screen pt-32 pb-32 px-6 sm:px-12 lg:px-24">
      {/* Header */}
      <div className="text-center mb-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-7xl font-bebas tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-marvelRed mb-4"
        >
          THE SACRED TIMELINE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/60 font-sans max-w-2xl mx-auto text-lg"
        >
          Events in chronological order of occurrence, not by release date. Follow the true flow of time.
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto">
        {/* Central Glowing Line (Background) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 md:-translate-x-1/2 rounded-full" />

        {/* Central Glowing Line (Animated Fill) */}
        <motion.div
          className="absolute left-4 md:left-1/2 top-0 w-1 bg-marvelRed md:-translate-x-1/2 rounded-full drop-shadow-[0_0_10px_rgba(237,29,36,0.8)] z-0"
          style={{ height: lineHeight, transformOrigin: "top" }}
        />

        <div className="flex flex-col gap-24 relative z-10">
          {sortedMovies.map((movie, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className={`flex flex-col md:flex-row items-center justify-between w-full ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Empty space for alternating layout on desktop */}
                <div className="hidden md:block w-[45%]" />

                {/* Timeline Node & Year */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center -translate-x-[14px] md:translate-x-0 bg-void py-4 z-20">
                  <div className="w-8 h-8 rounded-full border-4 border-void bg-marvelRed shadow-[0_0_15px_rgba(237,29,36,0.8)] z-10" />
                  {/* Year Tag */}
                  <div className={`absolute ${isEven ? 'md:right-12 right-auto left-12' : 'left-12'} md:w-32 whitespace-nowrap text-2xl font-bebas text-starkWhite tracking-widest`}>
                    {movie.inUniverseYear}
                  </div>
                </div>

                {/* Movie Card */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 mt-8 md:mt-0`}>
                  <div className="group relative rounded-2xl overflow-hidden glass hover:border-white/20 transition-all duration-300 transform hover:-translate-y-2">
                    <div className="absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" style={{ backgroundColor: movie.themeColor }} />

                    <div className="relative bg-void/90 h-full w-full rounded-2xl overflow-hidden flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-1/3 h-48 sm:h-auto">
                        <Image
                          src={movie.posterUrl}
                          alt={movie.title}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-void via-void/50 to-transparent sm:to-transparent opacity-90" />
                      </div>

                      <div className="p-6 sm:w-2/3 flex flex-col justify-center relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bebas tracking-wide mb-2 leading-none text-starkWhite">
                          {movie.title}
                        </h3>
                        <p className="text-sm text-white/60 mb-4 font-sans line-clamp-3">
                          {movie.description}
                        </p>
                        <div className="mt-auto inline-block">
                          <span className="text-xs font-bold px-3 py-1 rounded bg-white/10 text-white/80 border border-white/20">
                            PHASE {movie.phase}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}