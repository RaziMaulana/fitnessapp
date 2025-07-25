import Navbar from "../../../components/navbar";
import Greeting from "../../../components/Mentor/Greeting";
import Hire from "../../../components/Mentor/Hire";
import Recruitment from "../../../components/Mentor/Recruitment"; 

export default function Mentor(){
    return(
        <div>
            <Navbar />
            <Greeting />
            <Hire />
            <Recruitment />
        </div>
    )
}