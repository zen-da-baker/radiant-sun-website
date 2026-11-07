// Import Next components
import Link from "next/link";

// Import styling
import "../../styles/header.css";

/*
    The header of the website
*/
export function Header() {

    // The number variables that can be used to resize the logo while retaining the aspect ratio
    let height = 19;

    let width = 12;

    let ratio = 3;

    return (
        <header className="page-header">

            <div className="flex">

                <img src="/images/SilverSunValkyrie.png" style={ 
                    { 
                        width: ( width * ratio ) + "px", 
                        height: ( height * ratio ) + "px", 
                        margin: "0 1.5rem" 
                    } 
                } />

                <Link href="/">

                    <h2 className="text-center" style={ { fontSize: "2rem" } }>Radiant Sun</h2>
                
                </Link>

            </div>

            <div id="header-links" className="flex">

                <Link href="/team">Team</Link>

                <Link href="/contact">Contact</Link>

            </div>
            
        </header>
    )
}