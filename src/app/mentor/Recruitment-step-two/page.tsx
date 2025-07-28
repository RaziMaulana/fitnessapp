"use client"

import Navbar from "../../../../components/navbar"
import Form from "../../../../components/Mentor/Recruitment-process/Form"
import Footer from "../../../../components/footer"
import { useEffect } from "react";

export default function RecruitmentStepTwo() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Navbar />
            <Form />
            <Footer />
        </div>
    )
}