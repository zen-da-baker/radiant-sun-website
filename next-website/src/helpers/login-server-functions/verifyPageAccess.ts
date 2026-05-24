// Import Next components
import { redirect } from "next/navigation";

// Import components
import { escapeStrings } from "../escapeStrings";
import { verifyAccessToken } from "./verifyAccessToken";

/*
    This helper function verifies if the user has access to the page and redirects them to the login
    page otherwise.
    This component is meant to be called from the client side and verify the token on the server side.
*/
export async function verifyPageAccess( username: string | null = "", tokenId: string | null = "" ) {

    "use server"

    // If the username or the tokenId do not exist, the user is redirected to the login page
    if ( !username || !tokenId ) {

        redirect("/login");

    }

    if ( username ) {

        username = escapeStrings( username );

    }

    if ( tokenId ) {

        tokenId = escapeStrings( tokenId );

    }

    const verified = await verifyAccessToken( username, tokenId );

    // If the verification fails, the user is also redirected
    if ( !verified ) {

        redirect("/login");

    }

}