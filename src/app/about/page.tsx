"use client"
import React from 'react'
import Navbar from '../../../components/navbar'
import Greeting from '../../../components/About/Greeting'
import Founders from '../../../components/About/Founders'
import Timeline from '../../../components/About/Timeline'
import Goals from '../../../components/About/Goals'
import Footer from '../../../components/footer'

export default function About() {
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