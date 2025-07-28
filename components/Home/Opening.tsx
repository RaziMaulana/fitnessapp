"use client";

import { motion, Variants } from 'motion/react';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

import OpeningImageOne from '../../assets/images/Home/Opening/OpeningImageOne.png';
import OpeningImageTwo from '../../assets/images/Home/Opening/OpeningImageTwo.png';
import OpeningImageThree from '../../assets/images/Home/Opening/OpeningImageThree.png';
import OpeningImageFour from '../../assets/images/Home/Opening/OpeningImageFour.png';

interface OpeningProps {
    carouselAnimationCompleted: boolean;
}

export default function Opening({ carouselAnimationCompleted }: OpeningProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [animationStarted, setAnimationStarted] = useState(false);
    const [isAnimationActive, setIsAnimationActive] = useState(true);

    useEffect(() => {
        if (!sectionRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5,
            }
        );

        observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            // Animasi aktif hanya jika lebar layar lebih besar dari 1024px (breakpoint lg)
            setIsAnimationActive(window.innerWidth > 1010);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (carouselAnimationCompleted && isInView && !animationStarted && isAnimationActive) {
            setAnimationStarted(true);
        } else if (!isAnimationActive && animationStarted) {
            setAnimationStarted(false);
        }
    }, [carouselAnimationCompleted, isInView, animationStarted, isAnimationActive]);


    const childVariants: Variants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
        noAnimation: { opacity: 1, y: 0 },
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.2,
            },
        },
        noAnimation: { opacity: 1 },
    };

    const animateState = isAnimationActive && animationStarted ? "visible" : "hidden";
    const childAnimateState = isAnimationActive ? animateState : "noAnimation";

    return (
        <section
            ref={sectionRef}
            className="py-30 md:py-24 relative overflow-hidden min-h-screen flex items-center justify-center"
        >
            <motion.div
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full"
                variants={containerVariants}
                initial={isAnimationActive ? "hidden" : "noAnimation"}
                animate={isAnimationActive ? animateState : "noAnimation"}
            >
                {/* Image One */}
                <motion.div
                    variants={childVariants}
                    initial={isAnimationActive ? "hidden" : "noAnimation"}
                    animate={childAnimateState}
                    className="absolute top-70 left-8 md:top-50 md:left-28 lg:top-38 lg:left-33 xl:left-33 xl:top-55"
                >
                    <Image
                        src={OpeningImageOne}
                        alt="Member 1"
                        width={200}
                        height={200}
                        className="rounded-3xl shadow-xl shadow-slate-600 w-35 h-35 md:w-55 md:h-55 lg:w-45 lg:h-45 xl:w-56 xl:h-56 object-cover"
                    />
                </motion.div>

                {/* Top Right Image */}
                <motion.div
                    variants={childVariants}
                    initial={isAnimationActive ? "hidden" : "noAnimation"}
                    animate={childAnimateState}
                    className="absolute top-50 right-1 md:top-100 md:right-30 lg:top-30 lg:right-40 xl:right-45 xl:top-33"
                >
                    <Image
                        src={OpeningImageFour}
                        alt="Mentor 1"
                        width={200}
                        height={200}
                        className="rounded-3xl shadow-xl shadow-slate-600 w-35 h-35 md:w-55 md:h-55 lg:w-45 lg:h-45 xl:w-56 xl:h-56 object-cover"
                    />
                </motion.div>

                {/* Center Text */}
                <motion.div
                    variants={childVariants}
                    initial={isAnimationActive ? "hidden" : "noAnimation"}
                    animate={childAnimateState}
                    className="flex items-center justify-center relative z-10 py-8"
                >
                    <h1
                        className="text-black merriweather-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center leading-tight px-4"
                    >
                        <span className='xl:text-white lg:text-white'>Beco</span>me the best Versi<span className='lg:text-white'>on of</span><br />
                        one self
                    </h1>
                </motion.div>

                {/* Bottom Left Image */}
                <motion.div
                    variants={childVariants}
                    initial={isAnimationActive ? "hidden" : "noAnimation"}
                    animate={childAnimateState}
                    className="absolute bottom-45 left-5 md:bottom-85 md:left-25 lg:bottom-24 lg:left-19 xl:left-11 xl:bottom-30"
                >
                    <Image
                        src={OpeningImageTwo}
                        alt="Member 2"
                        width={200}
                        height={200}
                        className="rounded-3xl shadow-xl shadow-slate-600 w-35 h-35 md:w-55 md:h-55 lg:w-45 lg:h-45 xl:w-56 xl:h-56 object-cover"
                    />
                </motion.div>

                {/* Bottom Right Image */}
                <motion.div
                    variants={childVariants}
                    initial={isAnimationActive ? "hidden" : "noAnimation"}
                    animate={childAnimateState}
                    className="absolute bottom-60 right-3 md:bottom-55 md:right-8 lg:bottom-29 lg:right-21.5 xl:right-13.5 xl:bottom-33"
                >
                    <Image
                        src={OpeningImageThree}
                        alt="Mentor 2"
                        width={200}
                        height={200}
                        className="rounded-3xl shadow-xl shadow-slate-600 w-35 h-35 md:w-55 md:h-55 lg:w-45 lg:h-45 xl:w-56 xl:h-56 object-cover"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}