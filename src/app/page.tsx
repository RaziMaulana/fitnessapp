"use client"; // This directive is crucial for using React Hooks like useEffect

import React, { useState, useEffect } from "react"; // Import useEffect here
import Navbar from "../../components/navbar";
import Carousel from "../../components/Home/carousel";
import Opening from "../../components/Home/Opening";
import Testimobial from "../../components/Home/testimonial";
import ProductIntroduction from "../../components/Home/ProductIntroduction";
import Footer from "../../components/footer";

export default function Home() {
  const [carouselAnimationCompleted, setCarouselAnimationCompleted] = useState(false);

  const handleCarouselAnimationComplete = () => {
    setCarouselAnimationCompleted(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return (
    <div>
      <Navbar />
      <Carousel onCarouselAnimationComplete={handleCarouselAnimationComplete} />
      <Opening carouselAnimationCompleted={carouselAnimationCompleted} />
      <Testimobial />
      <ProductIntroduction />
      <Footer />
    </div>
  );
}