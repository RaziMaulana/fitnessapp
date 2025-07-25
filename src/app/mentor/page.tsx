import Navbar from "../../../components/navbar";
import Greeting from "../../../components/Mentor/Greeting";
import Hire from "../../../components/Mentor/Hire";
import Recruitment from "../../../components/Mentor/Recruitment"; 
import Footer from "../../../components/footer";

export default function Mentor(){
    return(
        <div>
            <Navbar />
            <Greeting />
            <Hire />
            <Recruitment />
            <Footer />
        </div>
    )
}