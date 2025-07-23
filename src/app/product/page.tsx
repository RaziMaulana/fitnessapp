import Navbar from '../../../components/navbar'
import Greeting from '../../../components/Product/Greeting'
import Store from '../../../components/Product/Store'
import Footer from '../../../components/footer'

export default function Product(){
    return(
        <div>
            <Navbar />
            <Greeting />
            <Store />
            <Footer />
        </div>
    )
}