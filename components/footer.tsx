"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Link sudah diimport
import { usePathname } from 'next/navigation';

import AppLogoWithText from "../assets/images/AppLogoWithText.png";

export default function Footer() {
    const pathname = usePathname();

    const isActiveLink = (href: string): boolean => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    return (
        <footer className="w-full bg-[#191919] text-white py-8 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 mt-20 relative overflow-hidden rounded-t-[40px] md:rounded-t-[60px] lg:rounded-t-[80px] xl:rounded-t-[100px] shadow-2xl shadow-gray-900">

            <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 lg:mb-20">

                <div className="flex items-center mb-8 md:mb-0">
                    {/* Menggunakan Link untuk membungkus Image */}
                    <Link href="/"> {/* Tentukan tujuan link, biasanya ke halaman utama */}
                        <Image
                            src={AppLogoWithText}
                            alt="LogoWithText"
                            width={220}
                            height={150}
                            className="h-auto w-[130px] sm:w-[150px] md:w-[180px] lg:w-[220px]"
                        />
                    </Link>
                </div>

                <nav className="flex flex-col pr-0 sm:pr-5 md:pr-10 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-10 lg:space-x-15 xl:space-x-17 text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold items-center">
                    <Link
                        href="/"
                        className={`relative hover:text-gray-100 transition-colors duration-300 ${
                            isActiveLink("/")
                                ? "text-white after:w-full after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-white"
                                : "text-white hover:after:w-full after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300"
                        }`}
                    >
                        Home
                    </Link>

                    <Link
                        href="/about"
                        className={`relative hover:text-gray-100 transition-colors duration-300 ${
                            isActiveLink("/about")
                                ? "text-white after:w-full after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-white"
                                : "text-white hover:after:w-full after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300"
                        }`}
                    >
                        About
                    </Link>

                    <Link
                        href="/product"
                        className={`relative hover:text-gray-100 transition-colors duration-300 ${
                            isActiveLink("/product")
                                ? "text-white after:w-full after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-white"
                                : "text-white hover:after:w-full after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300"
                        }`}
                    >
                        Product
                    </Link>

                    <Link
                        href="/mentor"
                        className={`relative hover:text-gray-100 transition-colors duration-300 ${
                            isActiveLink("/mentor")
                                ? "text-white after:w-full after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-white"
                                : "text-white hover:after:w-full after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300"
                        }`}
                    >
                        Mentor
                    </Link>
                </nav>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="flex flex-col w-full md:w-1/3 lg:w-1/4 mb-10 md:mb-0">
                    <h3 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Feedback</h3>
                    <textarea
                        className="w-full h-20 sm:h-20 md:h-24 lg:h-28 p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4 text-base sm:text-base md:text-lg"
                        placeholder="Enter your feedback here..."
                    ></textarea>
                    <button className="bg-gradient-to-br from-gray-300 to-gray-100 text-lg sm:text-lg md:text-xl px-8 py-3 rounded-lg shadow-md hover:shadow-xl shadow-slate-600 duration-300 font-semibold text-[#333] border border-gray-300 w-fit">
                        Submit
                    </button>
                </div>

                <div className="w-full sm:pl-8 md:pl-20 md:w-2/3 lg:w-2/3 xl:w-2xl flex justify-center md:justify-center md:mt-12 lg:mt-16 xl:mt-20">
                    <p className="font-bold merriweather-font tracking-wide text-lg md:text-base lg:text-xl xl:text-2xl text-center md:text-center max-w-lg leading-tight">
                        " Solution For Every LiveStyle Problem "
                    </p>
                </div>
            </div>
        </footer>
    );
}