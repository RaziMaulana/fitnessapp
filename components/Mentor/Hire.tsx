"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import AboutImageOne from '../../assets/images/Mentor/Hire/MentorImageOne.png';
import AboutImageTwo from '../../assets/images/Mentor/Hire/MentorImageTwo.png';
import AboutImageThree from '../../assets/images/Mentor/Hire/MentorImageThree.png';
import { motion, useInView, Variants, Transition } from "motion/react";
import { JSX, useRef, useState } from "react";
import { StaticImageData } from "next/image";

// Definisikan tipe untuk objek Trainer
interface Trainer {
  id: number;
  name: string;
  titles: Record<string, string>; // Object yang berisi title untuk setiap category
  image: StaticImageData;
  rating: number;
}

// Definisikan tipe untuk category titles
type CategoryTitles = {
  [key: string]: string;
}

export default function Hire(): JSX.Element {
  const categories: string[] = [
    "Bodybuilding",
    "Strength",
    "Fat Loss",
    "Cardio",
    "Functional",
    "More..."
  ];

  const trainers: Trainer[] = [
    {
      id: 1,
      name: "Steve Garrenson",
      titles: {
        "Bodybuilding": "Bodybuilding Trainer",
        "Strength": "Strength & Power Coach",
        "Fat Loss": "Weight Loss Specialist",
        "Cardio": "Cardio Fitness Expert",
        "Functional": "Functional Movement Coach",
        "More...": "Multi-Discipline Trainer"
      },
      image: AboutImageOne,
      rating: 5
    },
    {
      id: 2,
      name: "Darric Marrisson",
      titles: {
        "Bodybuilding": "Bodybuilding Trainer",
        "Strength": "Strength & Power Coach",
        "Fat Loss": "Weight Loss Specialist",
        "Cardio": "Cardio Fitness Expert",
        "Functional": "Functional Movement Coach",
        "More...": "Certified Personal Trainer"
      },
      image: AboutImageTwo,
      rating: 5
    },
    {
      id: 3,
      name: "Mike Oslan",
      titles: {
        "Bodybuilding": "Bodybuilding Trainer",
        "Strength": "Strength & Power Coach",
        "Fat Loss": "Weight Loss Specialist",
        "Cardio": "Cardio Fitness Expert",
        "Functional": "Functional Movement Coach",
        "More...": "Fitness & Wellness Coach"
      },
      image: AboutImageThree,
      rating: 5
    }
  ];

  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  // Function untuk mendapatkan title berdasarkan active category
  const getTrainerTitle = (trainer: Trainer, category: string): string => {
    return trainer.titles[category] || trainer.titles["Bodybuilding"];
  };

  const handleCategoryClick = (category: string): void => {
    setActiveCategory(category);
    // Force re-render dengan key yang berubah
    setTrainerKey(prev => prev + 1);
  };

  // State untuk memaksa re-render trainer cards
  const [trainerKey, setTrainerKey] = useState<number>(0);

  // Create refs for the sections you want to animate
  const titleRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const trainersRef = useRef<HTMLDivElement>(null);

  // Use useInView hook for each ref
  const isTitleInView: boolean = useInView(titleRef, { once: true, amount: 0.5 });
  const isCategoriesInView: boolean = useInView(categoriesRef, { once: true, amount: 0.5 });
  const isTrainersInView: boolean = useInView(trainersRef, { once: true, amount: 0.2 });

  // Define animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      } as Transition
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut"
      } as Transition
    }
  };

  // Variants sederhana untuk trainer cards dengan scroll-triggered animation
  const trainerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.08,
        when: "beforeChildren"
      } as Transition
    }
  };

  const trainerItemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      } as Transition
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          ref={titleRef}
          className="text-4xl font-bold text-center text-gray-800 mb-12 merriweather-font"
          variants={containerVariants}
          initial="hidden"
          animate={isTitleInView ? "visible" : "hidden"}
        >
          The Best And The Nearest
        </motion.h1>

        <motion.div
          ref={categoriesRef}
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isCategoriesInView ? "visible" : "hidden"}
        >
          {categories.map((category: string) => {
            const isActive: boolean = category === activeCategory;
            return (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? 'bg-white border-gray-300 shadow-lg text-black font-semibold'
                    : 'bg-[#191919] text-white border-transparent hover:bg-white hover:text-[#191919] hover:border-[#191919] hover:shadow-lg'
                }`}
                variants={itemVariants}
                onClick={() => handleCategoryClick(category)}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Trainer Cards */}
        <motion.div
          key={`trainers-${trainerKey}`}
          ref={trainersRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={trainerContainerVariants}
          initial="hidden"
          animate={isTrainersInView ? "visible" : "hidden"}
        >
          {trainers.map((trainer: Trainer) => (
            <motion.div
              key={`${trainer.id}-${activeCategory}-${trainerKey}`}
              className="min-w-[80vw] sm:min-w-[60vw] md:min-w-0 flex-shrink-0 snap-center rounded-3xl shadow-lg overflow-hidden"
              style={{ backgroundColor: "#DCC5B2" }}
              variants={trainerItemVariants}
            >
              <div className="w-full h-74 overflow-hidden relative">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {trainer.name}
                </h3>
                <motion.p 
                  className="text-gray-700 text-base mb-4"
                  key={`title-${activeCategory}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {getTrainerTitle(trainer, activeCategory)}
                </motion.p>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(trainer.rating)].map((_, i: number) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <motion.a
                  href="#"
                  className="inline-block text-center text-lg px-8 py-1 rounded-md
                     transition-all duration-300 ease-in-out font-semibold text-[#333]
                     bg-gradient-to-br from-gray-300 to-gray-100"
                  aria-label={`Hire ${trainer.name}`}
                  whileHover={{ 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Hire
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}