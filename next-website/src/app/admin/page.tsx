// Import Next packages
import { redirect } from "next/navigation";

// Import components
import { LoginForm } from "@/page-components/admin/LoginForm"

// Import helper functions
import { escapeStrings } from "@/helpers/escapeStrings";

// Import models
import { Token } from "../../models/Token";

/*
    This page is for the viewing of messages submitted to the website and 
    for the creation of blog posts.
*/
export default function Admin() {

    let loggedIn = false;

    console.log( new Token() );

    if ( !loggedIn ) {

        return (
            <main>

                <h1>Admin</h1>

            </main>
        )

    }

    return (
        <main>

            <h1>Admin</h1>

        </main>
    )


}