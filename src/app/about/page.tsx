"use client"
import React, { useEffect } from 'react'
import Navbar from '../../../components/navbar'
import Greeting from '../../../components/About/Greeting'
import Founders from '../../../components/About/Founders'
import Timeline from '../../../components/About/Timeline'
import Goals from '../../../components/About/Goals'
import Footer from '../../../components/footer'

export default function About() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Navbar />
            <Greeting />
            <Founders />
            <Timeline />
            <Goals />
            <Footer />
        </div>
    )
}