// Import MongoDB database
import { database } from "@/database/database";

// Import data models
import { Token } from "@/models/Token";

/*
    This helper function accepts a newly assigned token for a user and stores the
    token in the database. It will also purge expired tokens for that user.
    This function is meant to operate in the background and does not return a value.
*/
export async function assignToken( token: Token ): Promise<void> {

        const today = new Date();
    
        try {
    
            // An access token collection is queried
            const collection = database.collection("radiant-sun-access-tokens");

            // The newest token is added to the collection
            await collection.insertOne( token );

            // Any tokens that were expired are purged from the database
            await collection.deleteMany( { expirationDate: { $lt: today } } );
    
        } catch( error: any ) {
    
            console.log( error );
    
        }
    
        return;

}