"use client";

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

// Impor setiap gambar botol secara terpisah
import ProductIntroductionImageOne from '../../assets/images/Home/ProductIntroduction/ProductIntroductionImageOne.png';
import ProductIntroductionImageTwo from '../../assets/images/Home/ProductIntroduction/ProductIntroductionImageTwo.png';
import ProductIntroductionImageThree from '../../assets/images/Home/ProductIntroduction/ProductIntroductionImageThree.png';
import ProductIntroductionImageFour from '../../assets/images/Home/ProductIntroduction/ProductIntroductionImageFour.png';

export default function ProductIntroduction() {
  const [isXlScreen, setIsXlScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsXlScreen(window.matchMedia('(min-width: 1280px)').matches);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const contentAnimationVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const bottleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 1,
        delay: 0.5
      }
    }
  };

  const AnimatedWrapper = isXlScreen ? motion.div : 'div';

  return (
    <AnimatedWrapper
      {...(isXlScreen && {
        variants: contentAnimationVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.2 },
      })}
      className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] flex flex-col items-center justify-center text-center overflow-hidden mx-auto mt-30"
    >
      {/* Gambar-gambar botol yang diposisikan secara absolut */}
      <motion.div
        // UKURAN DIPERBESAR
        className="absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[550px] xl:h-[550px] top-15 left-5 rotate-20 md:top-8 md:left-10 lg:top-10 lg:left-12 xl:top-2 xl:left-25"
        {...(isXlScreen && {
          variants: bottleVariants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.2 }
        })}
      >
        <Image src={ProductIntroductionImageOne} alt="Product Bottle 1" fill style={{ objectFit: 'contain' }} priority className="pointer-events-none" />
      </motion.div>

      <motion.div
        // UKURAN DIPERBESAR
        className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[380px] lg:h-[380px] xl:w-[500px] xl:h-[500px] -top-15 -right-5 -rotate-30 md:-top-20 md:right-20 xl:-rotate-20 md:-top-25 md:right-0 xl:-top-40 xl:right-20"
        {...(isXlScreen && {
          variants: bottleVariants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.2 }
        })}
        style={{ transform: 'rotate(15deg)' }}
      >
        <Image src={ProductIntroductionImageTwo} alt="Product Bottle 2 JAR" fill style={{ objectFit: 'contain' }} priority className="pointer-events-none" />
      </motion.div>

      <motion.div
        // UKURAN DIPERBESAR
        className="absolute w-[300px] h-[300px] md:w-[420px] md:h-[420px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] -bottom-10 -left-16 -rotate-20 md:-bottom-23 md:left-20 xl:-bottom-25 xl:left-50"
        {...(isXlScreen && {
          variants: bottleVariants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.2 }
        })}
      >
        <Image src={ProductIntroductionImageThree} alt="Product Bottle 3" fill style={{ objectFit: 'contain' }} priority className="pointer-events-none" />
      </motion.div>

      <motion.div
        // UKURAN DIPERBESAR
        className="absolute w-[165px] h-[165px] md:w-[245px] md:h-[245px] lg:w-[280px] lg:h-[280px] xl:w-[360px] xl:h-[360px] bottom-16 right-0 rotate-40 md:bottom-15 md:right-20 xl:bottom-10 xl:right-30"
        {...(isXlScreen && {
          variants: bottleVariants,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.2 }
        })}
        style={{ transform: 'rotate(-10deg)' }}
      >
        <Image src={ProductIntroductionImageFour} alt="Product Bottle 4" fill style={{ objectFit: 'contain' }} priority className="pointer-events-none" />
      </motion.div>

      {/* Konten Teks dan Tombol */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4">
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#333] mb-8 leading-tight">
          Best Quality Products just for You
        </h2>
        <a
          href="#"
          className="inline-block text-center text-lg md:text-xl lg:text-3xl px-10 py-3 rounded-xl
                     hover:shadow-xl transition-all duration-300 ease-in-out font-semibold text-[#333]
                     bg-gradient-to-br from-gray-300 to-gray-100 hover:shadow-xl shadow-slate-600"
          aria-label="Shop our best quality products"
        >
          Shop
        </a>
      </div>
    </AnimatedWrapper>
  );
}