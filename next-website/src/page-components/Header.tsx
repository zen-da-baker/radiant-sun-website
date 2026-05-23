import Link from "next/link";

import "../../styles/header.css";

export function Header() {

    return (
        <header className="page-header">

            <div className="flex">

                <img src="images/SilverSunValkyrie.png" style={ { width: "60px", height: "95px", margin: "0 1.5rem" } } />

                <Link href="/">

                    <h2 className="text-center" style={ { fontSize: "3rem" } }>Radiant Sun</h2>
                
                </Link>

            </div>

            <div className="flex">

                <Link href="/team">Team</Link>

                <Link href="/contact">Contact</Link>

            </div>
            
        </header>
    )
}