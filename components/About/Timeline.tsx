"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Import your images here
import TimelineImageOne from '../../assets/images/About/Timeline/TimelineImageOne.png';
import TimelineImageTwo from '../../assets/images/About/Timeline/TimelineImageTwo.png';
import TimelineImageThree from '../../assets/images/About/Timeline/TimelineImageThree.png';
import TimelineImageFour from '../../assets/images/About/Timeline/TimelineImageFour.png';
import TimelineImageFive from '../../assets/images/About/Timeline/TimelineImageFive.png';

// TypeScript interfaces
interface TimelineItem {
    phase: string;
    date: string;
    status: 'completed' | 'in-progress' | 'pending';
    image: StaticImageData;
    description: string;
}

const timelineData: TimelineItem[] = [
    {
        phase: "Research",
        date: "22 July 2019",
        status: "completed",
        image: TimelineImageOne,
        description: "Initial research phase to understand the problem and develop solutions to address user needs effectively."
    },
    {
        phase: "Testimoni",
        date: "15 January 2021",
        status: "completed",
        image: TimelineImageTwo,
        description: "Gathering valuable feedback and testimonials from early users and stakeholders to refine our product."
    },
    {
        phase: "Production",
        date: "25 March 2021",
        status: "completed",
        image: TimelineImageThree,
        description: "Full-scale production and manufacturing of the final product, ensuring quality and efficiency."
    },
    {
        phase: "Legalize",
        date: "02 February 2022",
        status: "completed",
        image: TimelineImageFour,
        description: "Navigating legal compliance and regulatory approval processes to ensure market readiness."
    },
    {
        phase: "Launch",
        date: "15 April 2022",
        status: "completed",
        image: TimelineImageFive,
        description: "Official product launch and successful introduction to the market, achieving widespread adoption."
    }
];

const Timeline: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
    const heroSectionRef = useRef<HTMLDivElement>(null);

    const [isVisible, setIsVisible] = useState(false);
    const timelineContainerRef = useRef<HTMLDivElement>(null);

    const goToSlide = (index: number, direction?: 'left' | 'right'): void => {
        if (direction) {
            setDragDirection(direction);
            setTimeout(() => setDragDirection(null), 500);
        }
        setCurrentIndex(index);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.3
            }
        );
        const currentContainer = timelineContainerRef.current;
        if (currentContainer) {
            observer.observe(currentContainer);
        }
        return () => {
            if (currentContainer) {
                observer.unobserve(currentContainer);
            }
        };
    }, []);

    // --- Efek untuk Touch Events (Hanya Mobile/Tablet) ---
    useEffect(() => {
        let touchStartX = 0;
        let touchStartY = 0;
        let isHorizontalDrag = false;
        const minSwipeDistance = 50;
        const dragThreshold = 10;
        const isMobileOrTablet = () => window.innerWidth < 1024;

        const handleTouchStart = (e: TouchEvent) => {
            if (!isMobileOrTablet()) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isHorizontalDrag = false;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isMobileOrTablet() || !touchStartX) return;

            const touchCurrentX = e.touches[0].clientX;
            const touchCurrentY = e.touches[0].clientY;
            const diffX = Math.abs(touchCurrentX - touchStartX);
            const diffY = Math.abs(touchCurrentY - touchStartY);

            // Mencegah scroll default hanya jika gerakan horizontal dominan
            if (diffX > dragThreshold && diffX > diffY) {
                isHorizontalDrag = true;
                e.preventDefault();
            } else if (diffY > dragThreshold && diffY > diffX) {
                // Jika gerakan vertikal yang dominan, reset state untuk scroll normal
                isHorizontalDrag = false;
                touchStartX = 0;
                touchStartY = 0;
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!isMobileOrTablet() || !isHorizontalDrag) {
                return;
            }

            const touchEndX = e.changedTouches[0].clientX;
            const swipeDistanceX = touchStartX - touchEndX;

            if (Math.abs(swipeDistanceX) >= minSwipeDistance) {
                if (swipeDistanceX > 0) {
                    setDragDirection('left');
                    setCurrentIndex((prev: number) => (prev + 1) % timelineData.length);
                } else {
                    setDragDirection('right');
                    setCurrentIndex((prev: number) => (prev - 1 + timelineData.length) % timelineData.length);
                }
            }
            
            isHorizontalDrag = false;
            touchStartX = 0;
        };

        const currentHeroElement = heroSectionRef.current;
        if (currentHeroElement) {
            currentHeroElement.addEventListener('touchstart', handleTouchStart, { passive: false });
            currentHeroElement.addEventListener('touchmove', handleTouchMove, { passive: false });
            currentHeroElement.addEventListener('touchend', handleTouchEnd, { passive: false });

            return () => {
                currentHeroElement.removeEventListener('touchstart', handleTouchStart);
                currentHeroElement.removeEventListener('touchmove', handleTouchMove);
                currentHeroElement.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [timelineData.length]);

    // --- Efek untuk Scroll Wheel (Hanya Desktop) ---
    useEffect(() => {
        let lastScrollTime = 0;
        const scrollThrottle = 600;
        const isDesktop = () => window.innerWidth >= 1024;
        const handleScroll = (e: WheelEvent) => {
            if (!isDesktop()) return;
            const currentTime = Date.now();
            if (currentTime - lastScrollTime < scrollThrottle) {
                return;
            }
            lastScrollTime = currentTime;
            e.preventDefault();
            if (e.deltaY > 0) {
                setCurrentIndex((prev: number) => (prev + 1) % timelineData.length);
            } else {
                setCurrentIndex((prev: number) => (prev - 1 + timelineData.length) % timelineData.length);
            }
        };
        const currentHeroElement = heroSectionRef.current;
        if (currentHeroElement) {
            currentHeroElement.addEventListener('wheel', handleScroll, { passive: false });
            return () => {
                currentHeroElement.removeEventListener('wheel', handleScroll);
            };
        }
    }, [timelineData.length]);
    
    // --- Efek untuk Mouse Drag (Hanya Desktop/Tablet) ---
    useEffect(() => {
        let mouseStartX = 0;
        let isMouseDragging = false;
        const minDragDistance = 50;
        const isDesktopOrTablet = () => window.innerWidth >= 768;
        const handleMouseDown = (e: MouseEvent) => {
            if (!isDesktopOrTablet() || e.button !== 0) return;
            mouseStartX = e.clientX;
            isMouseDragging = true;
            e.preventDefault();
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (!isMouseDragging) return;
            e.preventDefault();
        };
        const handleMouseUp = (e: MouseEvent) => {
            if (!isMouseDragging) return;
            const mouseEndX = e.clientX;
            const dragDistanceX = mouseStartX - mouseEndX;
            if (Math.abs(dragDistanceX) >= minDragDistance) {
                if (dragDistanceX > 0) {
                    setDragDirection('left');
                    setCurrentIndex((prev: number) => (prev + 1) % timelineData.length);
                } else {
                    setDragDirection('right');
                    setCurrentIndex((prev: number) => (prev - 1 + timelineData.length) % timelineData.length);
                }
            }
            isMouseDragging = false;
            mouseStartX = 0;
        };
        const currentHeroElement = heroSectionRef.current;
        if (currentHeroElement) {
            currentHeroElement.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                currentHeroElement.removeEventListener('mousedown', handleMouseDown);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [timelineData.length]);

    const currentItem: TimelineItem = timelineData[currentIndex];
    const baseProgressPercentage = timelineData.length > 1 ? (currentIndex / (timelineData.length - 1)) * 100 : 0;
    const getResponsiveProgressWidth = () => {
        if (typeof window === 'undefined') return baseProgressPercentage;
        const width = window.innerWidth;
        let responsiveMaxPercentage;
        if (width >= 1280) { responsiveMaxPercentage = 89; }
        else if (width >= 1024) { responsiveMaxPercentage = 85; }
        else if (width >= 768) { responsiveMaxPercentage = 80; }
        else if (width >= 640) { responsiveMaxPercentage = 80; }
        else { responsiveMaxPercentage = 78; }
        return (baseProgressPercentage / 100) * responsiveMaxPercentage;
    };
    const progressWidth = getResponsiveProgressWidth();

    return (
        <div ref={timelineContainerRef} className="min-h-screen font-sans flex items-center justify-center p-2 sm:p-4">
            <div className="container mx-auto w-full max-w-7xl">
                <motion.div
                    id="timeline-hero-section"
                    ref={heroSectionRef}
                    className="relative rounded-lg sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl
                             h-[80vh] sm:h-[85vh] lg:h-[750px] xl:h-[800px]
                             flex flex-col justify-end"
                    style={{ touchAction: 'none' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{
                                    opacity: 0,
                                    x: dragDirection === 'left' ? '100%' :
                                        dragDirection === 'right' ? '-100%' : 0,
                                    scale: dragDirection ? 1.1 : 1.1
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    scale: 1
                                }}
                                exit={{
                                    opacity: 0,
                                    x: dragDirection === 'left' ? '-100%' :
                                        dragDirection === 'right' ? '100%' : 0,
                                    scale: dragDirection ? 0.9 : 0.9
                                }}
                                transition={{
                                    duration: dragDirection ? 0.6 : 0.5,
                                    ease: dragDirection ? [0.25, 0.46, 0.45, 0.94] : "easeInOut"
                                }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={currentItem.image}
                                    alt={`${currentItem.phase} phase`}
                                    fill
                                    priority
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                                    className="object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent sm:from-black/80 sm:via-black/20"></div>
                    </div>

                    <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-end h-full">
                        <motion.div
                            key={`content-${currentIndex}`}
                            initial={{
                                opacity: 0,
                                y: dragDirection ? 0 : 40,
                                x: dragDirection === 'left' ? 50 :
                                    dragDirection === 'right' ? -50 : 0
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                x: 0
                            }}
                            exit={{
                                opacity: 0,
                                y: dragDirection ? 0 : -40,
                                x: dragDirection === 'left' ? -50 :
                                    dragDirection === 'right' ? 50 : 0
                            }}
                            transition={{
                                duration: dragDirection ? 0.6 : 0.6,
                                delay: dragDirection ? 0.2 : 0.3,
                                ease: dragDirection ? [0.25, 0.46, 0.45, 0.94] : "easeOut"
                            }}
                            className="mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
                        >
                            <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-2 sm:mb-3 leading-tight">
                                {currentItem.phase}
                            </h2>
                            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 font-semibold">
                                {currentItem.date}
                            </p>
                            <p className="text-white/90 text-sm sm:text-base md:text-base lg:text-lg xl:text-xl leading-relaxed">
                                {currentItem.description}
                            </p>
                        </motion.div>

                        <div className="relative mt-4 sm:mt-6 lg:mt-8 px-2 sm:px-4">
                            <div className="absolute top-2 sm:top-3 left-10 md:left-16 md:top-2.5 lg:left-16 xl:left-16
                                            right-10 md:right-16 lg:right-16 xl:right-16
                                            h-0.5 sm:h-1 bg-white/60 rounded-full"></div>

                            <motion.div
                                className="absolute top-2 sm:top-3 left-10 md:left-16 md:top-2.5 lg:left-16 xl:left-16 h-0.5 sm:h-1 bg-green-400 rounded-full"
                                animate={{ width: `${progressWidth}%` }}
                                transition={{
                                    duration: dragDirection ? 0.6 : 0.5,
                                    ease: dragDirection ? [0.25, 0.46, 0.45, 0.94] : "easeInOut"
                                }}
                            ></motion.div>

                            <div className="flex justify-between items-start relative z-20 gap-1 sm:gap-2">
                                {timelineData.map((item: TimelineItem, index: number) => (
                                    <motion.div
                                        key={index}
                                        className="flex flex-col items-center text-center flex-1 max-w-[60px] sm:max-w-[80px] md:max-w-[100px] lg:max-w-[120px] cursor-pointer group"
                                        onClick={() => goToSlide(index)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e: React.KeyboardEvent) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                goToSlide(index);
                                            }
                                        }}
                                        aria-label={`Go to ${item.phase} phase`}
                                    >
                                        <motion.div
                                            className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full border-2 mb-2 sm:mb-3 lg:mb-4 transition-all duration-300 flex items-center justify-center
                                                ${index === currentIndex
                                                    ? 'bg-green-400 border-green-400 shadow-lg shadow-green-400/50'
                                                    : index < currentIndex
                                                        ? 'bg-green-400 border-green-400'
                                                        : 'bg-gray-600 border-gray-400'
                                                }`}
                                            animate={{
                                                scale: index === currentIndex ? 1.2 : 1,
                                                backgroundColor: index === currentIndex ? "#4ADE80" : index < currentIndex ? "#4ADE80" : "#4B5563",
                                                borderColor: index === currentIndex ? "#4ADE80" : index < currentIndex ? "#4ADE80" : "#9CA3AF"
                                            }}
                                            transition={{
                                                duration: dragDirection ? 0.4 : 0.3,
                                                ease: dragDirection ? [0.25, 0.46, 0.45, 0.94] : "easeInOut"
                                            }}
                                        >
                                        </motion.div>

                                        <h3 className={`font-medium text-xs md:text-sm lg:text-base transition-all duration-300 leading-tight ${index === currentIndex ? 'text-white font-bold' : 'text-gray-300 group-hover:text-white'
                                            }`}>
                                            {item.phase}
                                        </h3>

                                        <p className={`hidden sm:block text-xs md:text-xs lg:text-sm transition-all duration-300 leading-tight mt-1 ${index === currentIndex ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300'
                                            }`}>
                                            {item.date}
                                        </p>

                                        <p className={`sm:hidden text-xs transition-all duration-300 leading-tight mt-1 ${index === currentIndex ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300'
                                            }`}>
                                            {item.date.split(' ')[2]}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Timeline;