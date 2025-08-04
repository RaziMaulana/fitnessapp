"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HomePageCarouselOne from '../../assets/images/Home/Carousel/HomePageCarouselOne.png';
import HomePageCarouselTwo from '../../assets/images/Home/Carousel/HomePageCarouselTwo.png';
import HomePageCarouselThree from '../../assets/images/Home/Carousel/HomePageCarouselThree.png';
import HomePageCarouselFour from '../../assets/images/Home/Carousel/HomePageCarouselFour.png';
import HomePageCarouselFive from '../../assets/images/Home/Carousel/HomePageCarouselFive.png';
import { motion, AnimatePresence, Variants } from 'motion/react';

const images = [HomePageCarouselOne, HomePageCarouselTwo, HomePageCarouselThree, HomePageCarouselFour, HomePageCarouselFive];

interface CarouselProps {
    onCarouselAnimationComplete?: () => void;
}

export default function Carousel({ onCarouselAnimationComplete }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [direction, setDirection] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640); // sm breakpoint
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

    const goToPrevious = () => {
        paginate(-1);
    };

    const goToNext = () => {
        paginate(1);
    };

    const goToSlide = (index: number) => {
        const newDirection = index > currentIndex ? 1 : -1;
        setDirection(newDirection);
        setCurrentIndex(index);
    };

    // Swipe detection
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
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
                        // Drag properties only active on mobile
                        {...(isMobile && {
                            drag: "x",
                            dragConstraints: { left: 0, right: 0 },
                            dragElastic: 1,
                            onDragEnd: (_e: any, { offset, velocity }: any) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }
                        })}
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`Carousel Image ${currentIndex + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority={currentIndex === 0}
                            className={`pointer-events-none ${isMobile ? 'select-none' : ''}`}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Arrow Navigation - Only visible on desktop when not mobile */}
                {!isMobile && (
                    <>
                        <motion.button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 
                                bg-black/50 hover:bg-black/70 text-white p-2 rounded-full
                                opacity-80 hover:opacity-100 transition-all duration-300
                                hover:scale-110 active:scale-95"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={24} />
                        </motion.button>

                        <motion.button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 
                                bg-black/50 hover:bg-black/70 text-white p-2 rounded-full
                                opacity-80 hover:opacity-100 transition-all duration-300
                                hover:scale-110 active:scale-95"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Next image"
                        >
                            <ChevronRight size={24} />
                        </motion.button>
                    </>
                )}
            </div>

            {/* Dots Indicator - Clickable on desktop, visual indicator on mobile */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => !isMobile && goToSlide(index)}
                        className={`block h-2 w-2 rounded-full bg-gray-400 transition-colors
                            ${!isMobile ? 'hover:bg-white cursor-pointer touch-manipulation' : 'cursor-default'}`}
                        animate={{
                            scale: index === currentIndex ? 1.5 : 1,
                            backgroundColor: index === currentIndex ? '#FFFFFF' : '#9CA3AF',
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        aria-label={!isMobile ? `Go to slide ${index + 1}` : `Slide ${index + 1}`}
                        disabled={isMobile}
                    />
                ))}
            </div>

        </motion.div>
    );
}