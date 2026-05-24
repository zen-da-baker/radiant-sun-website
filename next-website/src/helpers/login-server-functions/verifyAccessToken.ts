// Import MongoDB client
import { MongoClient } from "mongodb";

/*
    This helper function verifies a username and tokenId within the database. These values were 
    already escaped by other server functions.
*/
export async function verifyAccessToken( username: string, tokenId: string ): Promise<boolean> {

    "use server"

    const databaseURI = process.env.databaseURI;
    
    const databaseName = process.env.databaseName;

    const today = new Date();

    if ( databaseURI === undefined || databaseName === undefined ) {
    
        return false;

    }

    try {
    
        // Client connection
        const client = new MongoClient( databaseURI );

        await client.connect();

        const database = client.db( databaseName );

        // An access token collection is queried
        const collection = database.collection("radiant-sun-access-tokens");

        // The newest token is added to the collection
        const profile = await collection.findOne( { username, tokenId } );

        if ( profile === null ) {

            return false;

        }

        // If the token was expired, it will be removed from the database 
        if ( profile.expirationDate < today ) {

            await collection.deleteOne( { tokenId } );

            return false;

        }

        return true;

    } catch( error: any ) {

        console.log( error );

    }

    return false;

}