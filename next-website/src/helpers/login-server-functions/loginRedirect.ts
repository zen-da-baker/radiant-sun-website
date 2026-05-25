"use server"

// Import Next helper functions
import { redirect } from "next/navigation";

// Import helper functions
import { escapeStrings } from "../escapeStrings";
import { verifyAccessToken } from "./verifyAccessToken";

/*
    This server function redirects the user from the login page to the admin page if they have
    a valid username and tokenId stored in their browser.
*/
export async function loginRedirect( username: string, tokenId: string ): Promise<void> {

    username = escapeStrings( username );

    tokenId = escapeStrings( tokenId );

    const verified = await verifyAccessToken( username, tokenId );

    if ( verified ) {

        redirect( "/admin?username=" + username + "&tokenId=" + tokenId );

    }

}