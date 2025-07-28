"use client"

import Navbar from "../../../../components/navbar"
import Done from "../../../../components/Mentor/Recruitment-process/done"
import Footer from "../../../../components/footer"
import { useEffect } from "react";
export default function RecruitmentDone() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Navbar />
            <Done />
            <Footer />
        </div>
    )
}