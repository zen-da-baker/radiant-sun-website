"use server"

// Import MongoDB database
import { database } from "@/database/database";

/*
    This helper function verifies a username and tokenId within the database. These values were 
    already escaped by other server functions.
*/
export async function verifyAccessToken( username: string, tokenId: string ): Promise<boolean> {

    const today = new Date();

    try {

        // An access token collection is queried
        const tokensCollection = database.collection("radiant-sun-access-tokens");

        // The newest token is added to the collection
        const profile = await tokensCollection.findOne( { username, tokenId } );

        if ( profile === null ) {

            return false;

        }

        // If the token was expired, it will be removed from the database 
        if ( profile.expirationDate < today ) {

            await tokensCollection.deleteOne( { tokenId } );

            return false;

        }

        return true;

    } catch( error: any ) {

        console.log( error );

    }

    return false;

}