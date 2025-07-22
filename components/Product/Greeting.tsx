"use client";

import React, { JSX } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

// Impor semua gambar yang diperlukan
import topRightWhiteJarWithLabel from '../../assets/images/Products/Greeting/ProductImageOne.png';
import topLeftBeigeJar from '../../assets/images/Products/Greeting/ProductImageTwo.png';
import card1WhiteBottlePills from '../../assets/images/Products/Greeting/ProductImageThree.png';
import card2BeigeBottle from '../../assets/images/Products/Greeting/ProductImageFour.png';
import card3WhiteJarWithLabel from '../../assets/images/Products/Greeting/ProductImageFive.png';
import card4WhiteOrangeBottle from '../../assets/images/Products/Greeting/ProductImageSix.png';

export default function Greeting(): JSX.Element {
  // Definisi varian animasi untuk elemen-elemen (diperbaiki)
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100, // Mulai 100px di bawah
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  // Varian untuk gambar mengambang di atas
  const floatingJarVariants = {
    initial: {
      opacity: 0,
      y: -50, // Mulai dari atas
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4">
      {/* Top section with "We are here for You" and floating jars */}
      <div className="relative w-full max-w-6xl flex flex-col items-center justify-center mb-16">
        {/* Floating jar top-left (Gambar 1 dari 6) */}
        <motion.div
          className="absolute rotate-25 top-0 left-0 xl:-top-30 xl:left-30 -translate-x-1/4 -translate-y-1/4 w-32 h-32 lg:w-48 lg:h-48 xl:w-100 xl:h-100"
          variants={floatingJarVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1], // cubic-bezier ease
          }}
        >
          <Image
            src={topLeftBeigeJar}
            alt="Beige jar floating on top left"
            layout="fill"
            objectFit="contain"
            priority
          />
        </motion.div>

        {/* Floating jar top-right (Gambar 2 dari 6) */}
        <motion.div
          className="absolute -rotate-18 top-0 right-0 xl:right-37 translate-x-1/4 -translate-y-1/4 w-28 h-28 lg:w-40 lg:h-40 xl:w-65 xl:h-65"
          variants={floatingJarVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1], // cubic-bezier ease
          }}
        >
          <Image
            src={topRightWhiteJarWithLabel}
            alt="White jar with JAR label floating on top right"
            layout="fill"
            objectFit="contain"
            priority
          />
        </motion.div>

        {/* Header "We are here for You" */}
        <motion.h1
          className="text-4xl merriweather-font sm:text-5xl lg:text-6xl font-serif text-gray-800 mt-20 text-center"
          variants={fadeInAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          We are here for You
        </motion.h1>
      </div>

      {/* Bottom section with four square cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-5xl mt-8">
        {/* Card 1 (Gambar 3 dari 6) */}
        <motion.div
          className="rounded-3xl shadow-lg shadow-slate-600 aspect-square flex items-center justify-center"
          variants={fadeInAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.05 * 1,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={card1WhiteBottlePills}
              alt="White bottle with golden capsules"
              layout="fill"
              objectFit="cover"
              objectPosition="center 60%"
              className="rounded-3xl"
            />
          </div>
        </motion.div>

        {/* Card 2 (Gambar 4 dari 6) */}
        <motion.div
          className="rounded-3xl shadow-lg shadow-slate-600 aspect-square flex items-center justify-center"
          variants={fadeInAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.05 * 2,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={card2BeigeBottle}
              alt="Beige bottle"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
            />
          </div>
        </motion.div>

        {/* Card 3 (Gambar 5 dari 6) */}
        <motion.div
          className="rounded-3xl shadow-lg shadow-slate-600 aspect-square flex items-center justify-center"
          variants={fadeInAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.05 * 3,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={card3WhiteJarWithLabel}
              alt="White jar with JAR label"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
            />
          </div>
        </motion.div>

        {/* Card 4 (Gambar 6 dari 6) */}
        <motion.div
          className="rounded-3xl shadow-lg shadow-slate-600 aspect-square flex items-center justify-center"
          variants={fadeInAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.05 * 4,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={card4WhiteOrangeBottle}
              alt="White and orange striped bottle"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}