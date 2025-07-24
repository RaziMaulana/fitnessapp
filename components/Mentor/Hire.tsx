"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import AboutImageOne from '../../assets/images/Mentor/Hire/MentorImageOne.png';
import AboutImageTwo from '../../assets/images/Mentor/Hire/MentorImageTwo.png';
import AboutImageThree from '../../assets/images/Mentor/Hire/MentorImageThree.png';
import { motion, useInView, Variants, Transition } from "framer-motion"; // Import Variants and Transition
import { useRef, useState } from "react";
import { StaticImageData } from "next/image";

// Definisikan tipe untuk objek Trainer
interface Trainer {
  id: number;
  name: string;
  title: string;
  image: StaticImageData;
  rating: number;
}

export default function Hire() {
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
      title: "BodyBuilding Trainer",
      image: AboutImageOne,
      rating: 5
    },
    {
      id: 2,
      name: "Darric Marrisson",
      title: "BodyBuilding Trainer",
      image: AboutImageTwo,
      rating: 5
    },
    {
      id: 3,
      name: "Mike Oslan",
      title: "BodyBuilding Trainer",
      image: AboutImageThree,
      rating: 5
    }
  ];

  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  // Create refs for the sections you want to animate
  const titleRef = useRef(null);
  const categoriesRef = useRef(null);
  const trainersRef = useRef(null);

  // Use useInView hook for each ref
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 }); // Animate once when 50% in view
  const isCategoriesInView = useInView(categoriesRef, { once: true, amount: 0.5 });
  const isTrainersInView = useInView(trainersRef, { once: true, amount: 0.2 }); // Animate when 20% of trainers section is in view

  // Define animation variants
  const containerVariants: Variants = { // Explicitly type as Variants
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.6,
        ease: "easeOut", // This string is now correctly interpreted
        staggerChildren: 0.1
      } as Transition // Cast to Framer Motion's Transition type
    }
  };

  const itemVariants: Variants = { // Explicitly type as Variants
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut" // This string is now correctly interpreted
      } as Transition // Cast to Framer Motion's Transition type
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          ref={titleRef} // Attach ref
          className="text-4xl font-bold text-center text-gray-800 mb-12 merriweather-font"
          variants={containerVariants}
          initial="hidden"
          animate={isTitleInView ? "visible" : "hidden"} // Animate based on inView status
        >
          The Best And The Nearest
        </motion.h1>

        <motion.div
          ref={categoriesRef} // Attach ref
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
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white border shadow-lg shadow-stone-600 text-black'
                    : 'bg-[#191919] text-white'
                }`}
                whileHover={
                  isActive
                    ? {}
                    : {
                        border: "1px solid #191919",
                        backgroundColor: "white",
                        color: "#191919",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                      }
                }
                transition={{
                  duration: 0.2,
                  ease: "easeInOut"
                }}
                variants={itemVariants} // Apply item variants for staggered animation
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Trainer Cards */}
        <motion.div
          ref={trainersRef} // Attach ref
          className="flex overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isTrainersInView ? "visible" : "hidden"}
        >
          {trainers.map((trainer: Trainer) => (
            <motion.div
              key={trainer.id}
              className="min-w-[80vw] sm:min-w-[60vw] md:min-w-0 flex-shrink-0 snap-center rounded-3xl shadow-lg overflow-hidden"
              style={{ backgroundColor: "#DCC5B2" }}
              variants={itemVariants} // Apply item variants for staggered animation
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
                <p className="text-gray-700 text-base mb-4">
                  {trainer.title}
                </p>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(trainer.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-1 px-8 rounded-lg transition-colors text-lg">
                  Hire
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}