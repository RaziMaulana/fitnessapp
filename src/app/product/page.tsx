"use client"

import Navbar from '../../../components/navbar'
import Greeting from '../../../components/Product/Greeting'
import Store from '../../../components/Product/Store'
import Footer from '../../../components/footer'
import { useEffect } from 'react';

export default function Product(){

      useEffect(() => {
        window.scrollTo(0, 0);
      }, []); 

    return(
        <div>
            <Navbar />
            <Greeting />
            <Store />
            <Footer />
        </div>
    )
}