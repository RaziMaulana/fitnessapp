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

    // State baru untuk mengontrol visibilitas animasi
    const [isVisible, setIsVisible] = useState(false);
    const timelineContainerRef = useRef<HTMLDivElement>(null); // Ref untuk container utama Timeline

    const goToSlide = (index: number, direction?: 'left' | 'right'): void => {
        if (direction) {
            setDragDirection(direction);
            setTimeout(() => setDragDirection(null), 500); // Reset after animation
        }
        setCurrentIndex(index);
    };

    // --- Efek untuk Intersection Observer ---
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Jika elemen masuk viewport (atau persentase yang ditentukan), set isVisible menjadi true
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    // Opsional: jika ingin animasi muncul setiap kali masuk viewport
                    // setIsVisible(false);
                }
            },
            {
                root: null, // Mengamati intersection dengan viewport
                rootMargin: '0px',
                threshold: 0.3 // Mengamati ketika 30% dari elemen terlihat
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
    }, []); // Dependensi kosong agar hanya berjalan sekali saat mount

    // Handle scroll events only on the hero section container
    useEffect(() => {
        let lastScrollTime = 0;
        const scrollThrottle = 600; // Throttle scroll events (increased slightly for smoother feel)

        const handleScroll = (e: WheelEvent) => {
            const currentTime = Date.now();
            if (currentTime - lastScrollTime < scrollThrottle) {
                return; // Ignore scroll events if too frequent
            }
            lastScrollTime = currentTime;

            // Prevent default scroll behavior only if we are handling the scroll for the slider
            e.preventDefault();

            if (e.deltaY > 0) {
                // Scroll down - next slide
                setCurrentIndex((prev: number) => (prev + 1) % timelineData.length);
            } else {
                // Scroll up - previous slide
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

    // Handle touch events and drag for mobile and tablet (sm/md), only on the hero section container
    useEffect(() => {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartTime = 0;
        let isDragging = false;
        const minSwipeDistance = 50; // Minimum distance for a recognized swipe
        const maxSwipeTime = 500; // Maximum time for a swipe (milliseconds)
        const dragThreshold = 10; // Minimum distance to consider as dragging

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
            isDragging = false;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!touchStartX || !touchStartY) return;

            const touchCurrentX = e.touches[0].clientX;
            const touchCurrentY = e.touches[0].clientY;
            const diffX = Math.abs(touchCurrentX - touchStartX);
            const diffY = Math.abs(touchCurrentY - touchStartY);

            // Check if user is dragging horizontally or vertically
            if (diffX > dragThreshold || diffY > dragThreshold) {
                isDragging = true;
                // Prevent scrolling when dragging
                e.preventDefault();
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!isDragging) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndTime = Date.now();

            const swipeDistanceX = touchStartX - touchEndX; // Positive for swipe left, negative for swipe right
            const swipeDistanceY = touchStartY - touchEndY; // Positive for swipe up, negative for swipe down
            const swipeTime = touchEndTime - touchStartTime;

            // Check if it's a valid swipe (sufficient distance and within time limit)
            if (swipeTime <= maxSwipeTime) {
                // Check for horizontal swipe (drag left/right) - for sm and md screens
                if (Math.abs(swipeDistanceX) >= minSwipeDistance && Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
                    e.preventDefault();

                    if (swipeDistanceX > 0) {
                        // Swipe left - next slide
                        setDragDirection('left');
                        setCurrentIndex((prev: number) => (prev + 1) % timelineData.length);
                        setTimeout(() => setDragDirection(null), 500);
                    } else {
                        // Swipe right - previous slide
                        setDragDirection('right');
                        setCurrentIndex((prev: number) => (prev - 1 + timelineData.length) % timelineData.length);
                        setTimeout(() => setDragDirection(null), 500);
                    }
                }
                // Check for vertical swipe (up/down) - fallback behavior
                else if (Math.abs(swipeDistanceY) >= minSwipeDistance && Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX)) {
                    e.preventDefault();

                    if (swipeDistanceY > 0) {
                        // Swipe up - next slide
                        setCurrentIndex((prev: number) => (prev + 1) % timelineData.length);
                    } else {
                        // Swipe down - previous slide
                        setCurrentIndex((prev: number) => (prev - 1 + timelineData.length) % timelineData.length);
                    }
                }
            }
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

    // Handle mouse drag events for desktop and tablet
    useEffect(() => {
        let mouseStartX = 0;
        let mouseStartY = 0;
        let isMouseDragging = false;
        let mouseStartTime = 0;
        const minDragDistance = 50;
        const maxDragTime = 500;

        const handleMouseDown = (e: MouseEvent) => {
            // Only enable drag on md and sm screens (tablet-like behavior)
            if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
                mouseStartX = e.clientX;
                mouseStartY = e.clientY;
                mouseStartTime = Date.now();
                isMouseDragging = true;
                e.preventDefault();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isMouseDragging) return;
            e.preventDefault();
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (!isMouseDragging) return;

            const mouseEndX = e.clientX;
            const mouseEndY = e.clientY;
            const mouseEndTime = Date.now();

            const dragDistanceX = mouseStartX - mouseEndX;
            const dragDistanceY = mouseStartY - mouseEndY;
            const dragTime = mouseEndTime - mouseStartTime;

            isMouseDragging = false;

            // Check if it's a valid drag (sufficient distance and within time limit)
            if (dragTime <= maxDragTime) {
                // Check for horizontal drag
                if (Math.abs(dragDistanceX) >= minDragDistance && Math.abs(dragDistanceX) > Math.abs(dragDistanceY)) {
                    e.preventDefault();

                    if (dragDistanceX > 0) {
                        // Drag left - next slide
                        setDragDirection('left');
                        setCurrentIndex((prev: number) => (prev + 1) % timelineData.length);
                        setTimeout(() => setDragDirection(null), 500);
                    } else {
                        // Drag right - previous slide
                        setDragDirection('right');
                        setCurrentIndex((prev: number) => (prev - 1 + timelineData.length) % timelineData.length);
                        setTimeout(() => setDragDirection(null), 500);
                    }
                }
                // Check for vertical drag - fallback
                else if (Math.abs(dragDistanceY) >= minDragDistance && Math.abs(dragDistanceY) > Math.abs(dragDistanceX)) {
                    e.preventDefault();

                    if (dragDistanceY > 0) {
                        // Drag up - next slide
                        setCurrentIndex((prev: number) => (prev + 1) % timelineData.length);
                    } else {
                        // Drag down - previous slide
                        setCurrentIndex((prev: number) => (prev - 1 + timelineData.length) % timelineData.length);
                    }
                }
            }
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

    // Calculate the base progress width as a percentage of 100
    const baseProgressPercentage = timelineData.length > 1 ? (currentIndex / (timelineData.length - 1)) * 100 : 0;

    // Determine the max width for the progress bar based on breakpoints
    // These values are percentages of the parent's width, accounting for padding/margin
    const getResponsiveProgressWidth = () => {
        if (typeof window === 'undefined') return baseProgressPercentage; // For SSR

        const width = window.innerWidth;

        let responsiveMaxPercentage;

        if (width >= 1280) { // xl screens (typically 1280px and up in Tailwind)
            responsiveMaxPercentage = 89; // Specifically for extra-large screens
        } else if (width >= 1024) { // lg screens (1024px to 1279px)
            responsiveMaxPercentage = 85; // For large screens
        } else if (width >= 768) { // md screens
            responsiveMaxPercentage = 80; // Slightly less than lg to account for padding/design
        } else if (width >= 640) { // sm screens
            responsiveMaxPercentage = 80; // Even less for sm screens
        } else { // default (xs screens)
            responsiveMaxPercentage = 78; // A suitable value for very small screens
        }

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
                                flex flex-col justify-end cursor-grab active:cursor-grabbing select-none"
                    style={{ touchAction: 'none' }}
                    initial={{ opacity: 0, y: 50 }} // Posisi awal di bawah dan tidak terlihat
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }} // Animasi muncul jika isVisible true
                    transition={{ duration: 0.8, ease: "easeOut" }} // Durasi dan jenis transisi
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
                            {/* Base Timeline Line (darker/background color) - Adjusted responsive right values */}
                            <div className="absolute top-2 sm:top-3 left-10 md:left-16 md:top-2.5 lg:left-16 xl:left-16 
                                            right-10 md:right-16 lg:right-16 xl:right-16
                                            h-0.5 sm:h-1 bg-white/60 rounded-full"></div>

                            {/* Progress Timeline Line with smooth transition */}
                            <motion.div
                                className="absolute top-2 sm:top-3 left-10 md:left-16 md:top-2.5 lg:left-16 xl:left-16 h-0.5 sm:h-1 bg-green-400 rounded-full"
                                animate={{ width: `${progressWidth}%` }}
                                transition={{
                                    duration: dragDirection ? 0.6 : 0.5,
                                    ease: dragDirection ? [0.25, 0.46, 0.45, 0.94] : "easeInOut"
                                }}
                            // The maxWidth is now dynamically calculated
                            ></motion.div>

                            {/* Timeline items */}
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