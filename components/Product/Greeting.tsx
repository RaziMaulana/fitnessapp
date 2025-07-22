"use client";

import React, { JSX } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

// Import semua gambar yang diperlukan
import topRightWhiteJarWithLabel from '../../assets/images/Products/Greeting/ProductImageOne.png';
import topLeftBeigeJar from '../../assets/images/Products/Greeting/ProductImageTwo.png';
import card1WhiteBottlePills from '../../assets/images/Products/Greeting/ProductImageThree.png';
import card2BeigeBottle from '../../assets/images/Products/Greeting/ProductImageFour.png';
import card3WhiteJarWithLabel from '../../assets/images/Products/Greeting/ProductImageFive.png';
import card4WhiteOrangeBottle from '../../assets/images/Products/Greeting/ProductImageSix.png';

export default function Greeting(): JSX.Element {
  // Definisi varian animasi untuk elemen-elemen
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
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
      y: -30,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24 md:pt-28 overflow-x-hidden">
      {/* Top section with "We are here for You" and floating jars */}
      <div className="relative w-full max-w-6xl flex flex-col items-center justify-center mb-8 md:mb-12 lg:mb-16">
        {/* Floating jar top-left - Fixed positioning to prevent overflow */}
        <motion.div
          className="absolute -top-43 -left-18 md:-left-5 md:-top-25 lg:left-0 lg:-top-40 xl:-left-7 xl:-top-65
                     w-60 h-60 
                     md:w-70 md:h-70 
                     lg:w-90 lg:h-90 
                     xl:w-110 xl:h-110
                     rotate-12 sm:rotate-20 lg:rotate-25 xl:rotate-20
                     z-10"
          variants={floatingJarVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <Image
            src={topLeftBeigeJar}
            alt="Beige jar floating on top left"
            fill
            style={{ objectFit: 'contain' }}
            priority
            sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, (max-width: 1280px) 128px, 144px"
          />
        </motion.div>

        {/* Floating jar top-right - Fixed positioning to prevent overflow */}
        <motion.div
          className="absolute -top-25 -right-10 md:right-8 md:-top-8 lg:right-16 lg:-top-9 xl:right-16 xl:-top-15
                     w-45 h-45 
                     md:w-50 md:h-50 
                     lg:w-60 lg:h-60 
                     xl:w-65 xl:h-65
                     -rotate-12 sm:-rotate-15 lg:-rotate-18
                     z-10"
          variants={floatingJarVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <Image
            src={topRightWhiteJarWithLabel}
            alt="White jar with JAR label floating on top right"
            fill
            style={{ objectFit: 'contain' }}
            priority
            sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 80px, (max-width: 1280px) 96px, 112px"
          />
        </motion.div>

        {/* Header "We are here for You" - Responsif text size */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
                     font-serif text-gray-800 
                     mt-12 sm:mt-16 md:mt-20 lg:mt-24 
                     text-center px-4
                     merriweather-font
                     relative z-20"
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

      {/* Bottom section with four square cards - Responsif grid dan spacing */}
      <div className="grid grid-cols-2 lg:grid-cols-4 
                      gap-4 sm:gap-6 md:gap-5 lg:gap-8 xl:gap-12 
                      w-full max-w-5xl 
                      px-2 sm:px-4">
        {/* Card 1 */}
        <motion.div
          className="rounded-2xl md:rounded-3xl 
                     shadow-md md:shadow-lg shadow-slate-400 md:shadow-slate-600 
                     aspect-square 
                     flex items-center justify-center 
                     overflow-hidden"
          variants={fadeInAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.05 * 1,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={card1WhiteBottlePills}
              alt="White bottle with golden capsules"
              fill
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center 60%'
              }}
              className="rounded-2xl md:rounded-3xl"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="rounded-2xl md:rounded-3xl 
                     shadow-md md:shadow-lg shadow-slate-400 md:shadow-slate-600 
                     aspect-square 
                     flex items-center justify-center 
                     overflow-hidden"
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
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-2xl md:rounded-3xl"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="rounded-2xl md:rounded-3xl 
                     shadow-md md:shadow-lg shadow-slate-400 md:shadow-slate-600 
                     aspect-square 
                     flex items-center justify-center 
                     overflow-hidden"
          variants={fadeInAnimationVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: 0.05 * 3,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={card3WhiteJarWithLabel}
              alt="White jar with JAR label"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-2xl md:rounded-3xl"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          className="rounded-2xl md:rounded-3xl 
                     shadow-md md:shadow-lg shadow-slate-400 md:shadow-slate-600 
                     aspect-square 
                     flex items-center justify-center 
                     overflow-hidden"
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
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-2xl md:rounded-3xl"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}