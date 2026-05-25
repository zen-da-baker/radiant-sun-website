// Import MongoDB database
import { database } from "@/database/database";

// Import data models
import { FeedbackMessage } from "@/models/FeedbackMessage";

/*
    This helper function expects the user to already be authenticated and
    access the database to pull any messages for the website. The function
    returns a list of messages which may be empty.
*/
export async function getMessages(): Promise<Array<any> | null> {

    try {

        const messagesCollection = database.collection("feedback-message-collection");

        const findCursor = messagesCollection.find( { submittedFrom: "Radiant Sun" } );

        const allMessages = await findCursor.toArray();

        return allMessages;

    } catch( error: any ) {

        console.log( error );

    }

    return null;

}