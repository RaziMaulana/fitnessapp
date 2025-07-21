// Goals.tsx
import React, { JSX, useRef } from 'react'; // Import useRef dari React
import Image from 'next/image';
import { motion, useInView, easeOut } from 'motion/react'; // Import easeOut dari framer-motion

// Import gambar-gambar Anda
import GoalsImageOne from '../../assets/images/About/Goals/GoalsImageOne.png';
import GoalsImageTwo from '../../assets/images/About/Goals/GoalsImageTwo.png';

export default function Goals(): JSX.Element {
  // Membuat referensi untuk setiap bagian yang akan dianimasikan
  const refTitle = useRef<HTMLDivElement>(null);
  const isInViewTitle = useInView(refTitle, { once: true, amount: 0.5 }); // Animasi dipicu saat 50% elemen terlihat, hanya sekali

  const refGoal1 = useRef<HTMLDivElement>(null);
  const isInViewGoal1 = useInView(refGoal1, { once: true, amount: 0.5 });

  const refGoal2 = useRef<HTMLDivElement>(null);
  const isInViewGoal2 = useInView(refGoal2, { once: true, amount: 0.5 });

  // Varian animasi untuk elemen
  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Kondisi awal: tidak terlihat dan sedikit di bawah
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: easeOut // Menggunakan `easeOut` yang diimpor untuk tipe yang benar
      } 
    }, 
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          ref={refTitle}
          variants={itemVariants}
          initial="hidden"
          animate={isInViewTitle ? "visible" : "hidden"}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl merriweather-font tracking-wide font-bold text-gray-800 italic">
            " Goals "
          </h1>
        </motion.div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* First Goal - Image */}
          <motion.div
            ref={refGoal1}
            variants={itemVariants}
            initial="hidden"
            animate={isInViewGoal1 ? "visible" : "hidden"}
            className="order-1 lg:order-1"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-600 overflow-hidden">
              <Image 
                src={GoalsImageOne}
                alt="People exercising outdoors" 
                width={500}
                height={256}
                className="w-full h-48 md:h-110 lg:h-80 object-cover"
                priority // Opsional: Untuk memuat gambar lebih awal jika penting
              />
            </div>
          </motion.div>

          {/* First Goal Text */}
          <motion.div
            // Menggunakan ref yang sama agar muncul bersamaan dengan gambar pertama
            ref={refGoal1} 
            variants={itemVariants}
            initial="hidden"
            animate={isInViewGoal1 ? "visible" : "hidden"}
            className="order-2 lg:order-2 text-center lg:text-left px-4 sm:px-0"
          >
            <h2 className="text-xl md:text-3xl lg:text-3xl xl:text-4xl merriweather-font font-semibold text-gray-800 tracking-wider leading-relaxed sm:leading-relaxed lg:leading-13">
              " Become a trustworthy lifestyle assistant for our clients "
            </h2>
          </motion.div>

          {/* Second Goal Text */}
          <motion.div
            // Menggunakan ref yang sama agar muncul bersamaan dengan gambar kedua
            ref={refGoal2} 
            variants={itemVariants}
            initial="hidden"
            animate={isInViewGoal2 ? "visible" : "hidden"}
            className="order-4 lg:order-3 text-center px-4 sm:px-0"
          >
            <h2 className="text-xl md:text-3xl lg:text-3xl xl:text-4xl merriweather-font font-semibold text-gray-800 tracking-wider leading-relaxed sm:leading-relaxed lg:leading-13">
              " Make a better Society "
            </h2>
          </motion.div>

          {/* Second Goal - Image */}
          <motion.div
            ref={refGoal2}
            variants={itemVariants}
            initial="hidden"
            animate={isInViewGoal2 ? "visible" : "hidden"}
            className="order-3 lg:order-4"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-600 overflow-hidden">
              <Image 
                src={GoalsImageTwo}
                alt="Group of people running on beach" 
                width={500}
                height={256}
                className="w-full h-48 md:h-110 lg:h-80 object-cover"
                priority // Opsional
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}