"use client"
import React from 'react'
import Navbar from '../../../components/navbar'
import Greeting from '../../../components/About/Greeting'
import Founders from '../../../components/About/Founders'

export default function About() {
    return (
        <div>
            <Navbar />
            <Greeting />
            <Founders />
        </div>
    )
}