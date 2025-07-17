"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'motion/react';

// Import gambar testimonial Anda (ganti dengan path sebenarnya)
import TestimonialImageOne from '../../assets/images/Home/Testimonial/TestimonialImageOne.png';
import TestimonialImageTwo from '../../assets/images/Home/Testimonial/TestimonialImageTwo.png';
import TestimonialImageThree from '../../assets/images/Home/Testimonial/TestimonialImageThree.png';
import TestimonialImageFour from '../../assets/images/Home/Testimonial/TestimonialImageFour.png';
import TestimonialImageFive from '../../assets/images/Home/Testimonial/TestimonialImageFive.png';

// Data testimonial (sesuaikan nama dan teks)
const testimonials = [
  {
    image: TestimonialImageFour,
    name: "Sean",
    quote: "You Really Should try the products that they have, it is such an amazing product",
  },
  {
    image: TestimonialImageTwo,
    name: "Liam",
    quote: "I've seen incredible results that i couldn't see before joining this program. Highly recommend their approach!",
  },
  {
    image: TestimonialImageThree,
    name: "Kevin",
    quote: "A game-changer for my daily routine, it helps me a lot though throgh my routine to procrastinate, it makes me a better person. Truly transformative.",
  },
  {
    image: TestimonialImageOne,
    name: "Harper",
    quote: "Exceptional quality and genuine support, they always there when we need them, i give my super Gratitude for them, Go Team. Thank you!",
  },
  {
    image: TestimonialImageFive,
    name: "Alex",
    quote: "This has exceeded all my expectations, i really though this program just the others, but the way they give us the oppurtunity to improve. Fantastic experience!",
  },
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isXlScreen, setIsXlScreen] = useState(false); // State untuk mendeteksi ukuran layar XL

  useEffect(() => {
    // Fungsi untuk memeriksa lebar layar
    const checkScreenSize = () => {
      // Menggunakan matchMedia untuk memeriksa breakpoint Tailwind CSS 'xl' (biasanya 1280px)
      setIsXlScreen(window.matchMedia('(min-width: 1280px)').matches);
    };

    // Panggil sekali saat komponen mount
    checkScreenSize();

    // Tambahkan event listener untuk memantau perubahan ukuran layar
    window.addEventListener('resize', checkScreenSize);

    // Bersihkan event listener saat komponen unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // Array dependensi kosong agar hanya berjalan sekali saat mount

  const carouselVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    }),
  };

  // Variasi animasi untuk efek muncul (fade-in dan slide-up)
  const contentAnimationVariants: Variants = {
    hidden: { opacity: 0, y: 50 }, // Kondisi awal: transparan dan sedikit di bawah
    visible: {
      opacity: 1, // Kondisi akhir: terlihat penuh
      y: 0, // Kembali ke posisi normal
      transition: {
        duration: 0.8, // Durasi animasi
        ease: "easeOut", // Jenis easing
        delay: 0.2, // Penundaan kecil sebelum animasi dimulai
      },
    },
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) {
        return testimonials.length - 1;
      } else if (nextIndex >= testimonials.length) {
        return 0;
      }
      return nextIndex;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  // Komponen pembungkus kondisional untuk animasi muncul
  const AnimatedWrapper = isXlScreen ? motion.div : 'div';

  return (
    <AnimatedWrapper
      // Properti animasi hanya akan diterapkan jika AnimatedWrapper adalah motion.div
      {...(isXlScreen && {
        variants: contentAnimationVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.2 },
      })}
      className="rounded-3xl shadow-xl shadow-slate-600 flex overflow-hidden max-w-xs md:max-w-2xl lg:max-w-3xl xl:max-w-6xl mx-auto mt-20 md:mt-15 lg:mt-5 relative"
    >
      {/* Konten Gambar Carousel */}
      <div className="w-1/2 relative overflow-hidden h-96 md:h-150 lg:h-155 xl:h-180">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={carouselVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={currentTestimonial.image}
              alt={currentTestimonial.name}
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Konten Teks Testimonial */}
      <div className="w-1/2 p-6 md:p-10 lg:p-12 text-white flex flex-col justify-between" style={{ backgroundColor: "#191919" }}>
        <div>
          <h3 className="text-lg md:text-4xl lg:text-4xl xl:text-4xl uppercase tracking-wider font-bold mb-2 md:mb-3">{currentTestimonial.name}</h3>
          <p className="text-sm md:text-2xl lg:text-2xl xl:text-4xl tracking-wide merriweather-font leading-relaxed">" <br />{currentTestimonial.quote}</p>
        </div>
      </div>

      {/* Dot Indicators yang baru, diposisikan di antara kedua konten */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-10">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              const newDirection = index > currentIndex ? 1 : -1;
              paginate(newDirection);
              setCurrentIndex(index);
            }}
            className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-400 hover:bg-white transition-colors cursor-pointer"
            animate={{
              backgroundColor: index === currentIndex ? '#FFFFFF' : '#6B7280',
              scale: index === currentIndex ? 1.2 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </AnimatedWrapper>
  );
}