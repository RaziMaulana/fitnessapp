"use client";

import { Upload, ChevronDown } from "lucide-react";
import { motion, Variants } from "motion/react"; // Pastikan ini 'framer-motion'
import Link from "next/link"; // Import Link dari Next.js

export default function Form() {
  const formVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.1,
      } as any, // 'as any' diperlukan karena 'when' tidak ada di tipe Transition secara default
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const inputFocusVariants: Variants = {
    focus: {
      scale: 1.01,
      borderColor: "#BFA894",
      boxShadow: "0 0 0 3px rgba(220, 197, 178, 0.5)",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  // Varian untuk area upload tetap sama
  const uploadHoverVariants: Variants = {
    hover: {
      scale: 1.02,
      backgroundColor: "#BFA894",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen pt-40">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-semibold tracking-wide text-center mb-15 text-black merriweather-font"
      >
        Please Fill up the form
      </motion.h1>

      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Name Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <motion.input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 bg-[#DCC5B2] border-0 rounded-md placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#BFA894] text-black"
            whileFocus="focus"
            variants={inputFocusVariants}
          />
        </motion.div>

        {/* Age and Gender Fields */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <motion.input
              type="text"
              placeholder="Age"
              className="w-full px-4 py-3 bg-[#DCC5B2] border-0 rounded-md placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#BFA894] text-black"
              whileFocus="focus"
              variants={inputFocusVariants}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="relative">
              <motion.select
                className="w-full px-4 py-3 bg-[#DCC5B2] border-0 rounded-md placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#BFA894] appearance-none text-black"
                whileFocus="focus"
                variants={inputFocusVariants}
              >
                <option value="">Select Gender</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </motion.select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Phone Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <motion.input
            type="tel"
            placeholder="Phone"
            className="w-full px-4 py-3 bg-[#DCC5B2] border-0 rounded-md placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#BFA894] text-black"
            whileFocus="focus"
            variants={inputFocusVariants}
          />
        </motion.div>

        {/* Country Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <div className="relative">
            <motion.select
              className="w-full px-4 py-3 bg-[#DCC5B2] border-0 rounded-md placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#BFA894] appearance-none text-black"
              whileFocus="focus"
              variants={inputFocusVariants}
            >
              <option value="">Select Country</option>
              <option value="indonesia">Indonesia</option>
              <option value="thailand">Thailand</option>
              <option value="malaysia">Malaysia</option>
              <option value="singapore">Singapore</option>
            </motion.select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600 pointer-events-none" />
          </div>
        </motion.div>

        {/* Certificate Upload Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Certificate
          </label>
          <motion.div
            className="w-full h-32 bg-[#DCC5B2] border-0 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#BFA894]"
            whileHover="hover"
            whileTap="tap"
            variants={uploadHoverVariants}
          >
            <Upload className="h-8 w-8 text-gray-600 mb-2" />
            <span className="text-gray-700 font-medium">Upload Here</span>
          </motion.div>
        </motion.div>

        {/* Experience Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience
          </label>
          <motion.textarea
            placeholder="Experience"
            rows={4}
            className="w-full px-4 py-3 bg-[#DCC5B2] border-0 rounded-md placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#BFA894] resize-none text-black overflow-hidden"
            whileFocus="focus"
            variants={inputFocusVariants}
          ></motion.textarea>
        </motion.div>

        {/* Submit Button (sekarang menggunakan Link) */}
        <motion.div variants={itemVariants} className="flex justify-center pt-4">
          <motion.div // Gunakan motion.div sebagai wrapper untuk Link
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Link
              href="/mentor/Recruitment-done" // Tujuan Link
              className="inline-block text-center text-lg md:text-xl lg:text-3xl px-10 py-3 rounded-xl
                         hover:shadow-xl transition-all duration-300 ease-in-out font-medium text-black
                         bg-gradient-to-br from-gray-300 to-gray-100 shadow-slate-600"
              aria-label="Submit the mentor recruitment form"
            >
              Submit
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}