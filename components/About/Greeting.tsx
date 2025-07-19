"use client"
import React from 'react'
import Image from 'next/image'

// Import images
import AboutImageOne from '../../assets/images/About/Greeting/AboutImageOne.png';
import AboutImageTwo from '../../assets/images/About/Greeting/AboutImageTwo.png';
import AboutImageThree from '../../assets/images/About/Greeting/AboutImageThree.png';

export default function Greeting(){
    return(
           <section
            className="py-30 md:py-24 relative overflow-hidden min-h-screen flex items-center justify-center"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
                {/* Image One (Bottom Left) */}
                <div
                    className="absolute top-70 left-8 md:top-57 md:left-28 lg:top-50 lg:left-33 xl:left-33 xl:top-55"
                >
                    <Image
                        src={AboutImageTwo}
                        alt="Member 1"
                        width={200}
                        height={200}
                        className="rounded-3xl shadow-xl shadow-slate-600 w-40 h-40 md:w-55 md:h-55 lg:w-55 lg:h-55 xl:w-65 xl:h-65 object-cover"
                    />
                </div>

                {/* Bottom Right Image */}
                <div
                    className="absolute -bottom-37 right-1 md:top-85 md:right-30 lg:top-30 lg:right-18 xl:right-15 xl:top-33"
                >
                    <Image
                        src={AboutImageThree}
                        alt="Mentor 1"
                        width={200}
                        height={200}
                        className="rounded-3xl shadow-xl shadow-slate-600 w-40 h-40 md:w-55 md:h-55 lg:w-55 lg:h-55 xl:w-65 xl:h-65 object-cover"
                    />
                </div>

                {/* Center Text */}
                <div
                    className="flex items-center justify-center relative z-10 py-8"
                >
                    <h1
                        className="text-black merriweather-font text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center leading-tight px-4"
                    >
                        <span className='xl:text-white lg:text-white'>Buil</span>ding a better Society <br /> Starting With <br /> Ourself 
                    </h1>
                </div>

                {/* Top Left */}
                <div
                    className="absolute -top-40 left-27 md:-top-60 md:left-65 lg:-top-15 lg:left-12 xl:left-6 xl:-top-20"
                >
                    <Image
                        src={AboutImageOne}
                        alt="Member 2"
                        width={200}
                        height={200}
                        className="rounded-3xl shadow-xl shadow-slate-600 w-40 h-40 md:w-55 md:h-55 lg:w-55 lg:h-55 xl:w-65 xl:h-65 object-cover"
                    />
                </div>

            </div>
        </section>
    )
}