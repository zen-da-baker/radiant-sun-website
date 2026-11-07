// Import linking from NextJS
import Link from "next/link";

// Import styles
import "../../styles/footer.css";

// The Bytesized Orange logo
import logo from "../../public/icons/bytesized-orange.png";

/*
    The footer of the website
*/
export function Footer() {
    
    return (
        <footer className="page-footer" >

            <nav>

                <Link href="/">Radiant Sun</Link>

                <Link href="/team">Our Team</Link>

                <Link href="/contact">Contact Us</Link>

                <Link href="/blog">Blog</Link>

                <Link href="/login">Login</Link>

            </nav>

            <div className="text-container">

                <p style={ { textAlign: "center" } }>

                    &copy; 2023 Radiant Sun Devs

                </p>

                <p style={ { textAlign: "center" } }>
                    
                    Website by 

                    <a href="https://bytesizedcrew.com" rel="noreferrer" target="_blank">

                        <img src={ logo.src } height={ 20 } width={ 20 } alt="Orange fruit" /> 

                        <span id="bytesized">ByteSized Crew</span>

                    </a>

                </p>

            </div>

        </footer>
    )
}