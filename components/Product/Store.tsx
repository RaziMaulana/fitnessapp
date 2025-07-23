"use client";

import React from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

// Impor semua gambar
import headerMuscleMan from '../../assets/images/Products/Store/headerMuscleMan.png';
import wheyProtein from '../../assets/images/Products/Store/wheyProtein.png';
import caseinProtein from '../../assets/images/Products/Store/caseinProtein.png';
import creatine from '../../assets/images/Products/Store/creatine.png';
import gymBackground from '../../assets/images/Products/Store/gymBackground.png';
import muscletech from '../../assets/images/Products/Store/muscletech.png';
import prosupps from '../../assets/images/Products/Store/prosupps.png';
import myprotein from '../../assets/images/Products/Store/myprotein.png';
import evlNutrition from '../../assets/images/Products/Store/evlNutrition.png';
import optimumNutrition from '../../assets/images/Products/Store/optimumNutrition.png';
import scivation from '../../assets/images/Products/Store/scivation.png';
import vitBottleTopLeft from '../../assets/images/Products/Store/vitBottleTopLeft.png';
import vitPillsSpilled from '../../assets/images/Products/Store/vitPillsSpilled.png';
import vitBottleBottomLeft from '../../assets/images/Products/Store/vitBottleBottomLeft.png';
import vitBottleBottomRight from '../../assets/images/Products/Store/vitBottleBottomRight.png';
import vitC from '../../assets/images/Products/Store/vitC.png';
import vitD from '../../assets/images/Products/Store/vitD.png';
import vitB from '../../assets/images/Products/Store/vitB.png';

// Definisikan interface untuk props ProductCard
interface ProductCardProps {
  imageSrc: StaticImageData;
  altText: string;
  name: string;
  price: string;
}

// === KOMPONEN PRODUCTCARD UNTUK MOBILE ===
const ProductCardMobile: React.FC<ProductCardProps> = ({ imageSrc, altText, name, price }) => (
  <div className="flex-shrink-0 w-72 overflow-hidden rounded-xl" style={{ backgroundColor: '#DCC5B2' }}>
    {/* Area gambar */}
    <div className="p-4">
      <div className="relative w-full h-48">
        <Image src={imageSrc} alt={altText} layout="fill" objectFit="contain" />
      </div>
    </div>
    
    {/* Footer dengan nama, harga, dan tombol */}
    <div className="p-4"> {/* Menambahkan warna latar belakang hitam pada footer */}
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <div className="flex flex-col items-start justify-between mt-2">
        <span className="text-xl font-bold mb-2">{price}</span>
        <button className="bg-white hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors w-full">
          <span className='text-sm font-semibold'>Add To Cart</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

// === KOMPONEN PRODUCTCARD UNTUK DESKTOP ===
const ProductCardDesktop: React.FC<ProductCardProps> = ({ imageSrc, altText, name, price }) => (
  <div className="overflow-hidden rounded-xl shadow-lg shadow-stone-600" style={{ backgroundColor: '#DCC5B2' }}>
    {/* Area gambar */}
    <div className="p-6 pb-4">
      <div className="relative w-full h-64 md:h-40 lg:h-50 xl:h-64">
        <Image src={imageSrc} alt={altText} layout="fill" objectFit="contain" />
      </div>
    </div>
    
    {/* Footer hitam dengan nama, harga dan tombol */}
    <div className="p-7"> {/* Menambahkan warna latar belakang hitam pada footer */}
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">{price}</span>
        <button className="bg-white hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <span className='md:text-sm font-semibold'>Add To Cart</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const Store: React.FC = () => {
  return (
    <div className="min-h-screen text-gray-800 md:mt-30 lg:mt-20">
      {/* CSS kustom untuk menyembunyikan scrollbar di Webkit browsers */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* Bagian 1: Header Utama */}
      <div className="flex flex-col md:flex-row h-100 w-full items-stretch">
        <div className="flex-1 flex flex-col border-t-2 border-b-2 items-center justify-center p-4 text-center md:text-left">
          <h1 className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-2 text-gray-800 merriweather-font text-center tracking-wide">" Wanted To build muscles ?</h1>
        </div>
        <div className="flex-1 relative overflow-hidden">
          <Image
            src={headerMuscleMan}
            alt="Man flexing in gym"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>

      {/* Bagian 2: Produk Protein */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        {/* === Tampilan Mobile: Horizontal Scroll (hanya muncul di bawah md) === */}
        {/* Menambahkan kelas hide-scrollbar */}
        <div className="md:hidden flex flex-row overflow-x-auto gap-8 hide-scrollbar">
          <ProductCardMobile imageSrc={wheyProtein} altText="Whey Protein Bottle" name="Whey Protein" price="30$" />
          <ProductCardMobile imageSrc={caseinProtein} altText="Casein Protein Bottle" name="Casein Protein" price="50$" />
          <ProductCardMobile imageSrc={creatine} altText="Creatine Bottle" name="Creatine" price="45$" />
          {/* Tambahkan lebih banyak ProductCardMobile di sini */}
        </div>

        {/* === Tampilan Desktop: Grid 3 Kolom (hanya muncul di md ke atas) === */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          <ProductCardDesktop imageSrc={wheyProtein} altText="Whey Protein Bottle" name="Whey Protein" price="30$" />
          <ProductCardDesktop imageSrc={caseinProtein} altText="Casein Protein Bottle" name="Casein Protein" price="50$" />
          <ProductCardDesktop imageSrc={creatine} altText="Creatine Bottle" name="Creatine" price="45$" />
          {/* Tambahkan lebih banyak ProductCardDesktop di sini */}
        </div>
      </section>

      {/* Bagian 3: Motivasi "A good way to Start" */}
      <div className="flex flex-col md:flex-row h-100 w-full items-stretch">
        <div className="flex-1 flex border-t-2 border-b-2 flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center merriweather-font tracking-wide">" A good way to Start "</h2>
        </div>
        <div className="flex-1 relative overflow-hidden p-8">
          <Image
            src={gymBackground}
            alt="Gym interior"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
        </div>
      </div>

      {/* Bagian 4: Produk Suplemen */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        {/* === Tampilan Mobile === */}
        {/* Menambahkan kelas hide-scrollbar */}
        <div className="md:hidden flex flex-row overflow-x-auto gap-8 hide-scrollbar">
          <ProductCardMobile imageSrc={muscletech} altText="MuscleTech Bottle" name="MuscleTech" price="25$" />
          <ProductCardMobile imageSrc={prosupps} altText="ProSupps Bottle" name="ProSupps" price="75$" />
          <ProductCardMobile imageSrc={myprotein} altText="MyProtein Bottle" name="MyProtein" price="33$" />
        </div>
        {/* === Tampilan Desktop === */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          <ProductCardDesktop imageSrc={muscletech} altText="MuscleTech Bottle" name="MuscleTech" price="25$" />
          <ProductCardDesktop imageSrc={prosupps} altText="ProSupps Bottle" name="ProSupps" price="75$" />
          <ProductCardDesktop imageSrc={myprotein} altText="MyProtein Bottle" name="MyProtein" price="33$" />
        </div>
      </section>

      {/* Bagian 5: Motivasi "Boost Your Recovery" */}
      <div className="relative h-50 mt-20 border-t-2 border-b-2 flex items-center justify-center px-8 text-center">
        <h2 className="text-2xl md:text-5xl font-semibold merriweather-font tracking-wide">" Boost Your Recovery "</h2>
      </div>

      {/* Bagian 6: Produk Pemulihan */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        {/* === Tampilan Mobile === */}
        {/* Menambahkan kelas hide-scrollbar */}
        <div className="md:hidden flex flex-row overflow-x-auto gap-8 hide-scrollbar">
          <ProductCardMobile imageSrc={evlNutrition} altText="EVL Nutrition Jar" name="EVL Nutrition" price="45$" />
          <ProductCardMobile imageSrc={optimumNutrition} altText="Optimum Nutrition Jar" name="Optimum Nutrition" price="65$" />
          <ProductCardMobile imageSrc={scivation} altText="Salvation Jar" name="Salvation" price="37$" />
        </div>
        {/* === Tampilan Desktop === */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          <ProductCardDesktop imageSrc={evlNutrition} altText="EVL Nutrition Jar" name="EVL Nutrition" price="45$" />
          <ProductCardDesktop imageSrc={optimumNutrition} altText="Optimum Nutrition Jar" name="Optimum Nutrition" price="65$" />
          <ProductCardDesktop imageSrc={scivation} altText="Salvation Jar" name="Salvation" price="37$" />
        </div>
      </section>

      {/* Bagian 7: Motivasi "Also Vitamins" */}
      <div className="relative h-100 border-t-2 border-b-2 flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute -rotate-25 top-8 left-10 md:left-20 lg:left-45 xl:left-85 xl:top-8 w-23 h-23 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-28 xl:h-28 rounded-full flex items-center justify-center shadow-md overflow-hidden">
          <Image src={vitBottleTopLeft} alt="Small bottle top left" layout="fill" objectFit="cover" />
        </div>
        <div className="absolute top-22 right-10 md:top-22 md:right-35 lg:right-62 xl:right-108 xl:top-23 w-24 h-24 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-28 xl:h-28 rounded-full flex items-center justify-center shadow-md overflow-hidden">
          <Image src={vitPillsSpilled} alt="Pills spilled" layout="fill" objectFit="cover" />
        </div>
        <h2 className="text-4xl md:text-5xl text-center z-10 merriweather-font tracking-wide">" Also Vitamins "</h2>
        <div className="absolute bottom-19 left-20 md:left-60 lg:left-80 xl:left-125 xl:bottom-19 w-24 h-24 md:w-25 md:h-25 lg:w-25 lg:h-25 xl:w-25 xl:h-25 rounded-full flex items-center justify-center shadow-md overflow-hidden">
          <Image src={vitBottleBottomLeft} alt="Small bottle bottom left" layout="fill" objectFit="cover" />
        </div>
        <div className="absolute rotate-15 bottom-5 right-20 md:bottom-10 md:right-17 lg:bottom-8 lg:right-70 w-24 h-24 md:w-26 md:h-26 lg:w-26 lg:h-26 xl:w-26 xl:h-25 rounded-full flex items-center justify-center shadow-md overflow-hidden">
          <Image src={vitBottleBottomRight} alt="Small bottle bottom right" layout="fill" objectFit="cover" />
        </div>
      </div>

      {/* Bagian 8: Produk Vitamin */}
      <section className="py-16 px-4 pb-20 max-w-6xl mx-auto">
        {/* === Tampilan Mobile === */}
        {/* Menambahkan kelas hide-scrollbar */}
        <div className="md:hidden flex flex-row overflow-x-auto gap-8 hide-scrollbar">
          <ProductCardMobile imageSrc={vitC} altText="Vitamin C Bottle" name="Vit C" price="40$" />
          <ProductCardMobile imageSrc={vitD} altText="Vitamin D Bottle" name="Vit D" price="85$" />
          <ProductCardMobile imageSrc={vitB} altText="Vitamin B Bottle" name="Vit B" price="67$" />
        </div>
        {/* === Tampilan Desktop === */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          <ProductCardDesktop imageSrc={vitC} altText="Vitamin C Bottle" name="Vit C" price="40$" />
          <ProductCardDesktop imageSrc={vitD} altText="Vitamin D Bottle" name="Vit D" price="85$" />
          <ProductCardDesktop imageSrc={vitB} altText="Vitamin B Bottle" name="Vit B" price="67$" />
        </div>
      </section>
    </div>
  );
}

export default Store;