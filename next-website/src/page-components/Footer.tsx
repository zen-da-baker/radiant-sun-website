// Import linking from NextJS
import Link from "next/link";

// Import styles
import "../../styles/footer.css";

import logo from "../../public/icons/bytesized-orange.png";

export function Footer() {
    
    return (
        <footer className="page-footer" >

            <nav>

                <Link href="/">Radiant Sun</Link>

                <Link href="/contact">Contact Us</Link>

                <Link href="/team">Our Team</Link>

                <Link href="/blog">Blog</Link>

                <Link href="/login">Login</Link>

            </nav>

            <p className="text-center">

                &copy; 2023 Radiant Sun Devs

            </p>

            <p>
                
                Website by 

                <a href="https://bytesizedcrew.com" rel="noreferrer" target="_blank">

                    <img src={ logo.src } height={ 20 } width={ 20 } alt="Orange fruit" /> 

                    <span id="bytesized">ByteSized Crew</span>

                </a>

            </p>

        </footer>
    )
}