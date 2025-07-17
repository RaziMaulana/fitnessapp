"use client";

import React, { useState } from "react"
import Navbar from "../../components/navbar"
import Carousel from "../../components/Home/carousel";
import Opening from "../../components/Home/Opening";
import Testimobial from "../../components/Home/testimonial";
import ProductIntroduction from "../../components/Home/ProductIntroduction";

export default function Home() {
  const [carouselAnimationCompleted, setCarouselAnimationCompleted] = useState(false);

  const handleCarouselAnimationComplete = () => {
    setCarouselAnimationCompleted(true);
  };

  return (
    <div>
      <Navbar />
      <Carousel onCarouselAnimationComplete={handleCarouselAnimationComplete} />
      <Opening carouselAnimationCompleted={carouselAnimationCompleted} />
      <Testimobial />
      <ProductIntroduction />
    </div>
  )
}