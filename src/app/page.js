"use client";

import { useState } from "react";
import { mcuMovies } from "@/lib/marvelMockData";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = mcuMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 sm:px-12 lg:px-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center mb-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl sm:text-8xl font-bebas tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-marvelRed via-red-500 to-orange-500 mb-6 drop-shadow-[0_0_15px_rgba(237,29,36,0.5)]"
        >
          MCU ARCHIVES
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg sm:text-xl text-white/70 max-w-2xl font-sans mb-10"
        >
          Explore the cinematic universe. Discover the stories, heroes, and villains that shaped a generation.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative w-full max-w-xl group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-marvelRed to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center glass rounded-full px-6 py-4">
            <Search className="w-6 h-6 text-white/50 mr-3" />
            <input
              type="text"
              placeholder="Search the Multiverse..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white placeholder-white/50 font-sans text-lg"
            />
          </div>
        </motion.div>
      </section>

      {/* Movie Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer"
              style={{ "--theme-color": movie.themeColor }}
            >
              <div className="absolute -inset-0.5 bg-[var(--theme-color)] rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500" />

              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 bg-void">
                <Image
                  src={movie.posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-bold tracking-wider rounded bg-white/10 backdrop-blur-sm border border-white/20">
                      PHASE {movie.phase}
                    </span>
                    <span className="text-sm text-white/60 font-medium">
                      {new Date(movie.releaseDate).getFullYear()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bebas tracking-wide mb-2 leading-tight">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-white/70 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {movie.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredMovies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-20 text-white/50 text-xl font-sans"
          >
            No universes found matching your search.
          </motion.div>
        )}
      </section>
    </main>
  );
}