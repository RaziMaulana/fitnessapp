"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import HomePageCarouselOne from '../../assets/images/Home/Carousel/HomePageCarouselOne.png';
import HomePageCarouselTwo from '../../assets/images/Home/Carousel/HomePageCarouselTwo.png'; // Periksa path ini, ada dua kali 'Carousel/'
import HomePageCarouselThree from '../../assets/images/Home/Carousel/HomePageCarouselThree.png';
import HomePageCarouselFour from '../../assets/images/Home/Carousel/HomePageCarouselFour.png';
import HomePageCarouselFive from '../../assets/images/Home/Carousel/HomePageCarouselFive.png';
import { motion, AnimatePresence, Variants } from 'motion/react'; // Pastikan ini 'framer-motion', bukan 'motion/react'

const images = [HomePageCarouselOne, HomePageCarouselTwo, HomePageCarouselThree, HomePageCarouselFour, HomePageCarouselFive];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // 0: none, 1: next, -1: prev

    // Variasi animasi untuk Framer Motion (untuk transisi gambar)
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    // --- Perubahan di sini: containerVariants ---
    const carouselHeight = 'calc(100vh - 64px)'; // Definisikan tinggi final
    const containerVariants: Variants = {
        hidden: { height: 0, opacity: 0 }, // Mulai dengan tinggi 0 dan opacity 0
        visible: {
            height: carouselHeight, // Animasi ke tinggi penuh
            opacity: 1,
            transition: {
                height: { duration: 1.2, ease: "easeInOut" }, // Animasi tinggi lebih lambat
                opacity: { duration: 0.8, delay: 0.4, ease: "easeOut" }, // Fade in setelah sedikit penundaan
                delay: 0.2 // Penundaan awal untuk seluruh animasi container
            }
        },
    };
    // --- Akhir Perubahan ---


    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let newIndex = prevIndex + newDirection;
            if (newIndex < 0) {
                newIndex = images.length - 1;
            } else if (newIndex >= images.length) {
                newIndex = 0;
            }
            return newIndex;
        });
    };

    // Auto-play feature
    useEffect(() => {
        const interval = setInterval(() => {
            paginate(1); // Maju otomatis setiap 5 detik
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="relative w-full overflow-hidden" // Tetap penting ada overflow-hidden
            // Hapus style height di sini karena height akan dianimasikan oleh Framer Motion
            style={{ marginTop: '64px' }} // Tetap gunakan margin-top untuk di bawah navbar
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 64px adalah tinggi navbar yang Anda definisikan (h-16) */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0 flex items-center justify-center" // Penting: ini akan mengisi container
                >
                    <Image
                        src={images[currentIndex]}
                        alt={`Carousel Image ${currentIndex + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={currentIndex === 0}
                        className="pointer-events-none"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Indikator Titik dengan Animasi Scale (Opsi 1) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => {
                            const newDirection = index > currentIndex ? 1 : -1;
                            setDirection(newDirection);
                            setCurrentIndex(index);
                        }}
                        className="block h-2 w-2 rounded-full bg-gray-400 hover:bg-white transition-colors cursor-pointer"
                        animate={{
                            scale: index === currentIndex ? 1.5 : 1,
                            backgroundColor: index === currentIndex ? '#FFFFFF' : '#9CA3AF',
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </motion.div>
    );
}