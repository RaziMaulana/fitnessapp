"use client"
import React, { JSX, useState, useRef, useEffect } from 'react'; // Import useRef dan useEffect
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'motion/react'; // Import useInView

// Import founder images (adjust paths as per your project structure)
import WilliamOxwald from '../../assets/images/About/Founders/FoundersImageOne.png';
import AlexanderSandre from '../../assets/images/About/Founders/FoundersImageTwo.png';
import ElysiaNigma from '../../assets/images/About/Founders/FoundersImageThree.png';

// TypeScript interfaces
interface Founder {
    id: number;
    name: string;
    position: string;
    image: any; // StaticImageData from Next.js, Anda bisa lebih spesifik dengan `StaticImageData`
    bio: string;
    achievements: string[];
    quote: string;
    email: string;
    linkedin: string;
}

// Founder data with detailed information
const foundersData: Founder[] = [
    {
        id: 1,
        name: "William Oxwald",
        position: "CEO",
        image: WilliamOxwald,
        bio: "William Oxwald brings over 15 years of executive leadership experience to our company. With a background in strategic business development and innovative technology solutions, he has successfully led multiple startups from conception to market leadership.",
        achievements: [
            "Founded 3 successful tech companies",
            "MBA from Stanford Business School",
            "Featured in Forbes 30 Under 30",
            "Led $50M+ funding rounds"
        ],
        quote: "Innovation is not just about technology, it's about creating meaningful solutions that transform lives.",
        email: "william@company.com",
        linkedin: "linkedin.com/in/williamoxwald"
    },
    {
        id: 2,
        name: "Alexander Sandre",
        position: "Founder",
        image: AlexanderSandre,
        bio: "Alexander Sandre is the visionary founder who conceptualized our company's core mission. With a deep understanding of market dynamics and user experience, he continues to drive our product innovation and company culture.",
        achievements: [
            "20+ years in product development",
            "Former VP of Engineering at tech giants",
            "10+ patents in emerging technologies",
            "Keynote speaker at major tech conferences"
        ],
        quote: "Great products are born from understanding real human needs and solving them elegantly.",
        email: "alexander@company.com",
        linkedin: "linkedin.com/in/alexandersandre"
    },
    {
        id: 3,
        name: "Elysia Nigma",
        position: "Co-Founder",
        image: ElysiaNigma,
        bio: "Elysia Nigma leads our strategic partnerships and business operations. Her expertise in scaling businesses and building sustainable growth models has been instrumental in our company's rapid expansion.",
        achievements: [
            "Former McKinsey & Company consultant",
            "Harvard Business School graduate",
            "Built partnerships worth $100M+",
            "Expert in sustainable business models"
        ],
        quote: "Success is measured not just by growth, but by the positive impact we create in the world.",
        email: "elysia@company.com",
        linkedin: "linkedin.com/in/elysianigma"
    }
];

export default function Founders(): JSX.Element {
    const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

    // Ref untuk memantau visibilitas seluruh bagian Founders
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.5 }); // 'once: true' agar animasi hanya berjalan sekali

    const selectFounder = (founder: Founder): void => {
        setSelectedFounder(founder);
    };

    const closeDetail = (): void => {
        setSelectedFounder(null);
    };

    // Ini untuk modal agar bisa ditutup dengan Escape atau klik luar
    const modalContentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeDetail();
            }
        };
        const handleClickOutside = (event: MouseEvent) => {
            if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
                closeDetail();
            }
        };

        if (selectedFounder) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedFounder]);


    return (
        // Attach ref ke section agar useInView bisa memantau
        <section
            ref={sectionRef}
            className="py-16 sm:py-20 lg:py-24 min-h-screen flex flex-col justify-center"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    className="italic text-4xl sm:text-5xl md:text-6xl font-serif text-gray-800 mb-16 sm:mb-20 text-center"
                    // Animasi ini akan langsung berjalan saat komponen dimuat, bagus untuk judul
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    " Founders "
                </motion.h1>

                <AnimatePresence mode="wait">
                    {!selectedFounder ? (
                        // Grid view - all founders
                        <motion.div
                            key="grid"
                            className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-12 md:space-y-0 md:space-x-16 lg:space-x-50"
                            initial={{ opacity: 0, y: 50 }} // Mulai dari bawah
                            animate={isInView ? { opacity: 1, y: 0 } : {}} // Animasi muncul saat isInView
                            exit={{ opacity: 0, y: -50 }} // Animasi keluar saat beralih ke detail
                            transition={{ duration: 0.7 }}
                        >
                            {foundersData.map((founder) => (
                                <motion.div
                                    key={founder.id}
                                    className="flex flex-col items-center text-center cursor-pointer group"
                                    onClick={() => selectFounder(founder)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    // Animasi ini akan mengikuti animasi induk (grid view)
                                    // dan juga memiliki delay berdasarkan ID untuk efek stagger
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: isInView ? founder.id * 0.1 : 0, duration: 0.5 }}
                                >
                                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mb-4">
                                        <Image
                                            src={founder.image}
                                            alt={`${founder.name} - ${founder.position}`}
                                            width={160}
                                            height={160}
                                            className="object-cover w-full h-full group-hover:brightness-108 transition-all duration-300"
                                        />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-1 group-hover:text-orange-600 transition-colors">
                                        {founder.position}
                                    </h3>
                                    <p className="text-xl sm:text-2xl md:text-xl lg:text-xl xl:text-2xl font-serif italic text-gray-800 group-hover:text-orange-700 transition-colors">
                                        " {founder.name} "
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        // Detail view - selected founder
                        <motion.div
                            key="detail"
                            className="max-w-4xl mx-auto"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Header with back button */}
                            <div className="mb-8">
                                <motion.button
                                    onClick={closeDetail}
                                    className="mb-6 text-gray-600 hover:text-orange-600 font-medium flex items-center space-x-2 transition-colors"
                                    whileHover={{ x: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span className="text-xl">←</span>
                                    <span>Back</span>
                                </motion.button>
                            </div>

                            {/* Founder detail content */}
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                {/* Header section */}
                                <motion.div
                                    className="bg-gradient-to-r from-orange-100 to-orange-50 p-8"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                                        <motion.div
                                            className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                        >
                                            <Image
                                                src={selectedFounder.image}
                                                alt={selectedFounder.name}
                                                width={160}
                                                height={160}
                                                className="object-cover w-full h-full"
                                            />
                                        </motion.div>
                                        <div className="text-center md:text-left">
                                            <motion.h2
                                                className="text-4xl md:text-5xl font-serif italic text-gray-800 mb-2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4, duration: 0.5 }}
                                            >
                                                {selectedFounder.name}
                                            </motion.h2>
                                            <motion.p
                                                className="text-2xl font-semibold text-orange-600"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5, duration: 0.5 }}
                                            >
                                                {selectedFounder.position}
                                            </motion.p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Content sections */}
                                <div className="p-8 space-y-8">
                                    {/* Quote */}
                                    <motion.blockquote
                                        className="text-xl md:text-2xl italic text-gray-700 text-center border-l-4 border-orange-300 pl-6 py-4 bg-orange-50 rounded-r-lg"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.5 }}
                                    >
                                        "{selectedFounder.quote}"
                                    </motion.blockquote>

                                    {/* Bio */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7, duration: 0.5 }}
                                    >
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">About</h3>
                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            {selectedFounder.bio}
                                        </p>
                                    </motion.div>

                                    {/* Achievements */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                    >
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Achievements</h3>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {selectedFounder.achievements.map((achievement, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.9 + (index * 0.1), duration: 0.3 }}
                                                >
                                                    <span className="w-3 h-3 bg-orange-400 rounded-full mt-1 flex-shrink-0"></span>
                                                    <span className="text-gray-700">{achievement}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Contact */}
                                    <motion.div
                                        className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl p-6"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2, duration: 0.5 }}
                                    >
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Connect</h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-3">
                                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                                <div>
                                                    <span className="font-medium text-gray-700">Email:</span>
                                                    <p className="text-gray-600">{selectedFounder.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                                <div>
                                                    <span className="font-medium text-gray-700">LinkedIn:</span>
                                                    <p className="text-gray-600">{selectedFounder.linkedin}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}