"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import HomePageCarouselOne from '../../assets/images/Home/Carousel/HomePageCarouselOne.png';
import HomePageCarouselTwo from '../../assets/images/Home/Carousel/HomePageCarouselTwo.png';
import HomePageCarouselThree from '../../assets/images/Home/Carousel/HomePageCarouselThree.png';
import HomePageCarouselFour from '../../assets/images/Home/Carousel/HomePageCarouselFour.png';
import HomePageCarouselFive from '../../assets/images/Home/Carousel/HomePageCarouselFive.png';
import { motion, AnimatePresence, Variants } from 'motion/react';

const images = [HomePageCarouselOne, HomePageCarouselTwo, HomePageCarouselThree, HomePageCarouselFour, HomePageCarouselFive];

export default function Carousel({ onCarouselAnimationComplete }: { onCarouselAnimationComplete?: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

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

    const containerVariants: Variants = {
        hidden: { height: 0, opacity: 0 },
        visible: {
            height: "auto",
            opacity: 1,
            transition: {
                height: { duration: 1.2, ease: "easeInOut" },
                opacity: { duration: 0.8, delay: 0.4, ease: "easeOut" },
                delay: 0.2
            }
        },
    };

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

    useEffect(() => {
        const interval = setInterval(() => {
            paginate(1);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="relative w-full overflow-hidden"
            style={{ marginTop: '64px' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => {
                // Panggil callback setelah animasi 'visible' selesai
                if (onCarouselAnimationComplete) {
                    onCarouselAnimationComplete();
                }
            }}
        >
            <div className="w-full relative
                h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]
                lg:min-h-[calc(100vh-64px)]
                "
            >
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
                        className="absolute inset-0 flex items-center justify-center"
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
            </div>

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