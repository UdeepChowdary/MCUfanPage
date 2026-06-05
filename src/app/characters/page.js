"use client";

import { useState } from "react";
import { mcuCharacters } from "@/lib/marvelMockData";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Image from "next/image";

export default function Characters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const filteredCharacters = mcuCharacters.filter(
    (char) =>
      char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.alias.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCharacter = mcuCharacters.find((c) => c.id === selectedId);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 sm:px-12 lg:px-24">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-white/10 pb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl sm:text-7xl font-bebas tracking-wider text-starkWhite mb-2"
          >
            THE CODEX
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 font-sans max-w-md"
          >
            Classified intelligence on entities within the multiverse.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="relative w-full md:w-96 group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-marvelRed rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative flex items-center bg-void/80 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3">
            <Search className="w-5 h-5 text-white/50 mr-3" />
            <input
              type="text"
              placeholder="Search by name or alias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white placeholder-white/40 font-sans"
            />
          </div>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
        {filteredCharacters.map((char, i) => (
          <motion.div
            key={char.id}
            layoutId={`card-${char.id}`}
            onClick={() => setSelectedId(char.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-colors ${
              i === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <Image
              src={char.imageUrl}
              alt={char.name}
              fill
              className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <motion.div layoutId={`badge-${char.id}`} className="mb-4">
                <span
                  className="px-3 py-1 text-xs font-bold tracking-widest rounded-full border border-white/20 backdrop-blur-md"
                  style={{ backgroundColor: `${char.themeColor}33`, color: char.themeColor }}
                >
                  {char.role.toUpperCase()}
                </span>
              </motion.div>
              <motion.h2 layoutId={`title-${char.id}`} className="text-4xl font-bebas tracking-wide mb-1">
                {char.alias}
              </motion.h2>
              <motion.h3 layoutId={`subtitle-${char.id}`} className="text-lg text-white/60 font-sans font-medium">
                {char.name}
              </motion.h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Expansion */}
      <AnimatePresence>
        {selectedId && selectedCharacter && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50"
              onClick={() => setSelectedId(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedId}`}
                className="w-full max-w-4xl bg-void rounded-3xl overflow-hidden border border-white/10 shadow-2xl pointer-events-auto relative flex flex-col md:flex-row h-[80vh] md:h-[600px]"
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/50 text-white/70 hover:text-white backdrop-blur-md transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Left Side: Image */}
                <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
                  <Image
                    src={selectedCharacter.imageUrl}
                    alt={selectedCharacter.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-void via-transparent to-transparent md:from-void md:via-void/20" />
                </div>

                {/* Right Side: Info */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-void">
                  <motion.div layoutId={`badge-${selectedId}`} className="mb-6 self-start">
                    <span
                      className="px-3 py-1 text-xs font-bold tracking-widest rounded-full border border-white/20"
                      style={{ backgroundColor: `${selectedCharacter.themeColor}33`, color: selectedCharacter.themeColor }}
                    >
                      {selectedCharacter.role.toUpperCase()}
                    </span>
                  </motion.div>

                  <motion.h2 layoutId={`title-${selectedId}`} className="text-5xl md:text-6xl font-bebas tracking-wide mb-2 text-starkWhite">
                    {selectedCharacter.alias}
                  </motion.h2>
                  <motion.h3 layoutId={`subtitle-${selectedId}`} className="text-xl md:text-2xl text-white/50 font-sans mb-8">
                    {selectedCharacter.name}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/80 font-sans leading-relaxed mb-10"
                  >
                    {selectedCharacter.description}
                  </motion.p>

                  {/* Power Level Bar */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-auto"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold tracking-widest text-white/70 uppercase">Power Level</span>
                      <span className="text-sm font-bold" style={{ color: selectedCharacter.themeColor }}>
                        {selectedCharacter.powerLevel}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedCharacter.powerLevel}%` }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: selectedCharacter.themeColor,
                          boxShadow: `0 0 10px ${selectedCharacter.themeColor}`
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}