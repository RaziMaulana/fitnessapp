"use client";
import { motion, Variants } from 'motion/react';

export default function Recruitment() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Varian untuk Heading (tetap dengan pergerakan dari bawah ke atas)
  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Varian khusus untuk Button (hanya fade-in, tanpa pergerakan y)
  const buttonVariants: Variants = {
    hidden: { opacity: 0 }, // Hanya opacity 0, tanpa 'y'
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.h1
        className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-16 tracking-wide text-center merriweather-font"
        variants={headingVariants} // Menggunakan headingVariants
      >
        Become the mentor itself
      </motion.h1>

      <motion.a
        href="/mentor/Recruitment-step-one"
        className="inline-block text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl px-10 py-6 rounded-xl
                   hover:shadow-xl transition-all duration-300 ease-in-out font-medium text-black
                   bg-gradient-to-br from-gray-300 to-gray-100 hover:shadow-xl shadow-slate-600"
        aria-label="Become The Mentor Of our Community"
        variants={buttonVariants} // Menggunakan buttonVariants khusus
      >
        Click Here
      </motion.a>
    </motion.div>
  );
}