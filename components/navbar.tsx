"use client";

import Image from "next/image";
import AppLogo from "../assets/images/AppLogo.png";
import AppLogoWithText from "../assets/images/AppLogoWithText.png";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react"

export default function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [showDesktopContent, setShowDesktopContent] = useState(false);
    const [screenWidth, setScreenWidth] = useState(0); // State baru untuk lebar layar

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    // Effect untuk menangani klik di luar sidebar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                closeSidebar();
            }
        };

        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

    // Effect untuk memantau perubahan lebar layar
    useEffect(() => {
        // Atur lebar layar awal saat komponen mount
        setScreenWidth(window.innerWidth);

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Array dependensi kosong agar hanya berjalan sekali saat mount

    const handleNavbarAnimationComplete = () => {
        setShowDesktopContent(true);
    };

    // Tentukan apakah kita berada di "layar besar" (>= 1000px)
    const isLargeScreen = screenWidth >= 1000;

    return (
        <>
            <motion.nav
                className="shadow-lg fixed top-0 left-1/2 -translate-x-1/2 z-30 overflow-hidden"
                style={{ backgroundColor: "#222222" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100vw' }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                onAnimationComplete={handleNavbarAnimationComplete}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Desktop Layout */}
                    {/* Menggunakan isLargeScreen untuk menentukan grid-cols */}
                    <div className={`hidden md:grid items-center h-16 ${isLargeScreen ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        {/* Kolom Kiri - Logo/Brand */}
                        <motion.div
                            className={`flex items-center ${isLargeScreen ? 'justify-start' : 'justify-center'}`} // Sesuaikan justify untuk layar kecil
                            initial={{ opacity: 0, y: 10 }}
                            animate={showDesktopContent ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        >
                            <div className="flex-shrink-0">
                                    {isLargeScreen ? (
                                        <h1 className="text-2xl font-bold uppercase text-white">FITNESS</h1>
                                    ) : (
                                        <Image
                                            src={AppLogoWithText}
                                            alt="LogoWithText"
                                            width={120}
                                            height={50}
                                            className="h-auto"
                                        />
                                    )}
                            </div>
                        </motion.div>

                        {/* Kolom Tengah - Logo Image (Hanya terlihat jika isLargeScreen) */}
                        {isLargeScreen && (
                            <div className="flex items-center justify-center">
                                <Image
                                    src={AppLogo}
                                    alt="Logo"
                                    width={50}
                                    height={30}
                                    className="h-auto"
                                />
                            </div>
                        )}

                        {/* Kolom Kanan - Navigation Links */}
                        <motion.div
                            className={`flex items-center ${isLargeScreen ? 'justify-end' : 'justify-center'}`} // Sesuaikan justify untuk layar kecil
                            initial={{ opacity: 0, y: 10 }}
                            animate={showDesktopContent ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        >
                            <div className="flex items-baseline space-x-3">
                                <a href="#" className="text-white px-3 py-2 rounded-md font-medium relative hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300">
                                    Home
                                </a>
                                <a href="#" className="text-white px-3 py-2 rounded-md font-medium relative hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300">
                                    About
                                </a>
                                <a href="#" className="text-white px-3 py-2 rounded-md font-medium relative hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300">
                                    Product
                                </a>
                                <a href="#" className="text-white px-3 py-2 rounded-md font-medium relative hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-white after:w-0 after:transition-all after:duration-300">
                                    Mentor
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Mobile Layout (tetap tidak ada perubahan signifikan) */}
                    <div className="md:hidden">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <Image
                                    src={AppLogoWithText}
                                    alt="LogoWithText"
                                    width={120}
                                    height={50}
                                    className="h-auto"
                                />
                            </div>
                            <button
                                onClick={toggleSidebar}
                                className="text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors z-50 relative"
                            >
                                <svg
                                    className={`h-6 w-6 transition-transform duration-300 ${isSidebarOpen ? 'rotate-90' : ''}`}
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    {isSidebarOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Overlay dan Sidebar tidak berubah */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={closeSidebar}
                ></div>
            )}

            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-auto w-64 shadow-lg rounded-bl-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ backgroundColor: "#191919" }}
            >
                <div className="p-4 flex flex-col h-full justify-between">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <h1 className="text-xl font-bold uppercase text-white">FITNESS</h1>
                        </div>
                        <button
                            onClick={closeSidebar}
                            className="text-white hover:text-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800 transition-colors"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <a
                            href="#"
                            className="text-white hover:bg-gray-800 px-4 py-3 rounded-md font-medium transition-colors block border-b border-gray-200"
                            onClick={closeSidebar}
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="text-white hover:bg-gray-800 px-4 py-3 rounded-md font-medium transition-colors block border-b border-gray-200"
                            onClick={closeSidebar}
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="text-white hover:bg-gray-800 px-4 py-3 rounded-md font-medium transition-colors block border-b border-gray-200"
                            onClick={closeSidebar}
                        >
                            Product
                        </a>
                        <a
                            href="#"
                            className="text-white hover:bg-gray-800 px-4 py-3 rounded-md font-medium transition-colors block border-b border-gray-200"
                            onClick={closeSidebar}
                        >
                            Mentor
                        </a>
                    </div>

                    <div className="flex justify-center mt-auto py-8">
                        <Image
                            src={AppLogo}
                            alt="Logo"
                            width={50}
                            height={30}
                            className="h-auto"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}