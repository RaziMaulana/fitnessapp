"use client"
import React from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion' // Import Variants type

// Import images
import AboutImageOne from '../../assets/images/About/Greeting/AboutImageOne.png';
import AboutImageTwo from '../../assets/images/About/Greeting/AboutImageTwo.png';
import AboutImageThree from '../../assets/images/About/Greeting/AboutImageThree.png';

export default function Greeting() {

    // Varian untuk animasi teks (muncul dari bawah)
    const textVariants: Variants = { // Eksplisitkan tipe Variants
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: 0.3,
            }
        },
    };

    // Varian untuk animasi gambar (scale-in dan fade-in)
    const imageVariants: Variants = { // Eksplisitkan tipe Variants
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 10,
                // Properti 'duration' memang tidak berlaku untuk 'spring' di konteks ini,
                // karena durasi diatur oleh stiffness dan damping.
                // Jika ingin durasi eksplisit, gunakan type: "tween"
            }
        },
    };

    // Varian untuk kontainer (mengkoordinasikan animasi anak)
    const containerVariants: Variants = { // Eksplisitkan tipe Variants
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5,
            }
        },
    };


    return (
        <section
            className="py-30 md:py-24 relative overflow-hidden min-h-screen flex items-center justify-center"
        >
            {/* Menggunakan motion.div untuk kontainer utama yang mengkoordinasikan anak-anak */}
            <motion.div
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full"
                variants={containerVariants}
                initial="hidden" // Properti awal untuk kontainer
                animate="visible" // Properti akhir untuk kontainer (akan memicu animasi anak)
            >
                {/* Image One (Bottom Left) */}
                <motion.div
                    className="absolute top-70 left-8 md:top-57 md:left-28 lg:top-50 lg:left-33 xl:left-33 xl:top-55"
                    variants={imageVariants} // Menerapkan varian animasi gambar
                >
                    <Image
                        src={AboutImageTwo}
                        alt="Member 1"
                        width={200}
                        height={200}
                        className="rounded-3xl shadow-xl shadow-slate-600 w-40 h-40 md:w-55 md:h-55 lg:w-55 lg:h-55 xl:w-65 xl:h-65 object-cover"
                    />
                </motion.div>

                {/* Bottom Right Image */}
                <motion.div
                    className="absolute -bottom-37 right-1 md:top-85 md:right-30 lg:top-30 lg:right-18 xl:right-15 xl:top-33"
                    variants={imageVariants} // Menerapkan varian animasi gambar
                >
                    <Image
                        src={AboutImageThree}
                        alt="Mentor 1"
                        width={200}
                        height={200}
                        className="rounded-3xl shadow-xl shadow-slate-600 w-40 h-40 md:w-55 md:h-55 lg:w-55 lg:h-55 xl:w-65 xl:h-65 object-cover"
                    />
                </motion.div>

                {/* Center Text */}
                <motion.div
                    className="flex items-center justify-center relative z-10 py-8"
                    variants={textVariants} // Menerapkan varian animasi teks
                >
                    <h1
                        className="text-black merriweather-font text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center leading-tight px-4"
                    >
                        <span className='xl:text-white lg:text-white'>Buil</span>ding a better Society <br /> Starting With <br /> Ourself
                    </h1>
                </motion.div>

                {/* Top Left Image */}
                <motion.div
                    className="absolute -top-40 left-27 md:-top-60 md:left-65 lg:-top-15 lg:left-12 xl:left-6 xl:-top-20"
                    variants={imageVariants} // Menerapkan varian animasi gambar
                >
                    <Image
                        src={AboutImageOne}
                        alt="Member 2"
                        width={200}
                        height={200}
                        className="rounded-3xl shadow-xl shadow-slate-600 w-40 h-40 md:w-55 md:h-55 lg:w-55 lg:h-55 xl:w-65 xl:h-65 object-cover"
                    />
                </motion.div>

            </motion.div>
        </section>
    );
}