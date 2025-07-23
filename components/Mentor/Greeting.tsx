"use client";

import Image from 'next/image';
import { JSX } from 'react';
import { motion, Variants } from 'framer-motion';

// Pastikan path import gambar sudah benar
import MentorGreetImageOne from '../../assets/images/Mentor/Greeting/MentorGreetImageOne.png';
import MentorGreetImageTwo from '../../assets/images/Mentor/Greeting/MentorGreetImageTwo.png';
import MentorGreetImageThree from '../../assets/images/Mentor/Greeting/MentorGreetImageThree.png';
import MentorGreetImageFour from '../../assets/images/Mentor/Greeting/MentorGreetImageFour.png';
import MentorGreetImageFive from '../../assets/images/Mentor/Greeting/MentorGreetImageFive.png';
import MentorGreetImageSix from '../../assets/images/Mentor/Greeting/MentorGreetImageSix.png';

export default function Greeting(): JSX.Element {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1, // Jeda awal yang lebih singkat
        staggerChildren: 0.1, // Jeda antar item yang lebih cepat
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100, // Kecepatan efek 'pegas'
      },
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-8 lg:mt-10">
      <motion.div
        className="grid gap-6 max-w-5xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div className="rounded-xl overflow-hidden shadow-lg h-40" variants={itemVariants}>
            <Image src={MentorGreetImageOne} alt="Two men talking in a gym" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div className="hidden sm:block md:mt-10 rounded-xl overflow-hidden shadow-lg h-40" variants={itemVariants}>
            <Image src={MentorGreetImageTwo} alt="A man lifting weights" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div className="hidden sm:block rounded-xl overflow-hidden shadow-lg h-40" variants={itemVariants}>
            <Image src={MentorGreetImageThree} alt="A woman posing in a gym" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>
        <motion.div className="flex justify-center my-8 lg:my-2 text-center" variants={itemVariants}>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold tracking-wide text-gray-800 merriweather-font">Work with the experienced</h2>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div className="hidden sm:block md:mt-10 rounded-xl overflow-hidden shadow-lg h-40" variants={itemVariants}>
            <Image src={MentorGreetImageFour} alt="A group of people standing together in a gym" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div className="rounded-xl overflow-hidden shadow-lg h-40" variants={itemVariants}>
            <Image src={MentorGreetImageFive} alt="A man and a woman training" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div className="hidden sm:block md:mt-10 rounded-xl overflow-hidden shadow-lg h-40" variants={itemVariants}>
            <Image src={MentorGreetImageSix} alt="A personal trainer helping a client" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}