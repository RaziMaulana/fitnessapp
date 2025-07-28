"use client"

import Navbar from "../../../../components/navbar"
import MentorCriteria from "../../../../components/Mentor/Recruitment-process/MentorCriteria"
import Footer from "../../../../components/footer"
import { useEffect } from "react";

export default function RecruitmentStepOne() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Navbar />
            <MentorCriteria />
            <Footer />
        </div>
    )
}