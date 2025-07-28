"use client"

import { BookOpen, Award, Users, History, UserCheck, CheckCircle } from 'lucide-react'
import { motion } from 'motion/react' // Use 'framer-motion' for full Framer Motion features
import Link from 'next/link' // Import Link from Next.js

export default function MentorCriteria() {
    const criteria = [
        {
            icon: BookOpen,
            text: "Had enough knowledge about the world of fitness, human body, and every knowledge that are acquire as a mentor"
        },
        {
            icon: Award,
            text: "Had achive an official certificate regarding the expertise on handling a fitness group"
        },
        {
            icon: Users,
            text: "Had a very good communication skills"
        },
        {
            icon: History,
            text: "Had enough experience of handling a fitness group or entering the world of fitness itself"
        },
        {
            icon: UserCheck,
            text: "Had a good time adapting a new knowledge and a new environment when needed"
        },
        {
            icon: CheckCircle,
            text: "Had a very good time maintaining the consistency of its work or go beyond that"
        }
    ]

    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    }

    // Individual card animation variants
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 12,
                duration: 0.4
            }
        }
    }

    // Title animation variants
    const titleVariants = {
        hidden: {
            opacity: 0,
            y: -30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 120,
                damping: 10,
                duration: 0.5
            }
        }
    }

    // Button animation variants
    const buttonVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 1.0, // Delay this animation until others finish
                duration: 0.5
            }
        }
    }

    return (
        <div className="min-h-screen pt-32 pb-8 px-8">
            <div className="max-w-4xl mx-auto">
                {/* Title */}
                <motion.h1
                    className="text-4xl font-bold text-center text-black tracking-wide mb-12 merriweather-font"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                >
                    Mentor Criteria
                </motion.h1>

                {/* Criteria Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {criteria.map((criterion, index) => {
                        const IconComponent = criterion.icon
                        return (
                            <motion.div
                                key={index}
                                className="bg-[#DCC5B2] bg-opacity-60 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.03,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div
                                    className="mb-4"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        delay: 0.3 + (index * 0.1),
                                        type: "spring" as const,
                                        stiffness: 180,
                                        damping: 10
                                    }}
                                >
                                    <IconComponent size={48} className="text-black" />
                                </motion.div>
                                <motion.p
                                    className="text-black text-bold tracking-wide text-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: 0.4 + (index * 0.1),
                                        duration: 0.3
                                    }}
                                >
                                    {criterion.text}
                                </motion.p>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Proceed Button */}
                <div className="flex justify-center">
                    {/* Changed motion.a to motion.div wrapping Link */}
                    <motion.div
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <Link
                            href="/mentor/Recruitment-step-two"
                            className="inline-block text-center text-lg md:text-xl lg:text-3xl px-10 py-3 rounded-xl
                                       hover:shadow-xl transition-all duration-300 ease-in-out font-medium text-black
                                       bg-gradient-to-br from-gray-300 to-gray-100 shadow-slate-600"
                            aria-label="Proceed to the next step of mentor recruitment"
                        >
                            Proceed
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}