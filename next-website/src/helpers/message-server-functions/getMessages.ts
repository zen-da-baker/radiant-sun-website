// Import MongoDB client
import { MongoClient } from "mongodb";

// Import data models
import { FeedbackMessage } from "@/models/FeedbackMessage";

/*
    This helper function expects the user to already be authenticated and
    access the database to pull any messages for the website. The function
    returns a list of messages which may be empty.
*/
export async function getMessages(): Promise< Array<any> | null > {

    // Next, the database connection is made
    const databaseURI = process.env.databaseURI;

    const databaseName = process.env.databaseName;

    if ( databaseURI === undefined || databaseName === undefined ) {

        return null;

    }

    try {

        const client = new MongoClient( databaseURI );

        await client.connect();

        const database = client.db( databaseName );

        const collection = database.collection("feedback-message-collection");

        const findCursor = collection.find( { submittedFrom: "Radiant Sun" } );

        const allMessages = await findCursor.toArray();

        return allMessages;

    } catch( error: any ) {

        console.log( error );

    }

    return null;

}