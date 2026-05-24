// Import components
import { escapeStrings } from "../escapeStrings";
import { verifyAccessToken } from "./verifyAccessToken";

/*
    This helper function verifies if the user has access to the page and redirects them to the login
    page otherwise.
    This component is meant to be called from the client side and verify the token on the server side.
*/
export async function verifyPageAccess( 
    username: string | null | undefined | Array<string> = "", 
    tokenId: string | null | undefined | Array<string> = "" 
): Promise<boolean> {

    /* 
        If the username and token are both a single string, they are escaped and verified and the user can 
        remain on the page if verified. In all other scenarios, the user is redirected to the login page.
    */
    if ( typeof username === "string" && typeof tokenId === "string" ) {

        username = escapeStrings( username );

        tokenId = escapeStrings( tokenId );

        const verified = await verifyAccessToken( username, tokenId );
    
        if ( verified ) {

            return true;
        
        }

    } 

    return false;

}