"use client";

import { motion, Variants, Transition } from "motion/react"; // Import Transition juga

export default function Done() {
  // Varian animasi untuk teks "Thank You"
  const textVariants: Variants = { // Tambahkan tipe Variants di sini
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", // Ini adalah bagian yang menyebabkan masalah tipe
        stiffness: 100,
        damping: 20,
        delay: 0.5,
      } as Transition, // <--- Lakukan Type Assertion di sini
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.h1
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold tracking-wide text-black text-center merriweather-font"
      >
        Thank You For Your Participation
      </motion.h1>
    </div>
  );
}