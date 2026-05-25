"use server"

// Import MongoDB helper
import { ObjectId } from "mongodb";

// Import database
import { database } from "@/database/database";

// Import helper functions
import { escapeStrings } from "../escapeStrings";
import { verifyPageAccess } from "../login-server-functions/verifyPageAccess";

/*
    This helper function validates the user credentials and then deletes the message
    from the database if valid based on the message ID.
*/
export async function deleteMessage( username: string, tokenId: string, messageId: string ) {

    // Escape the characters of the strings
    username = escapeStrings( username );

    tokenId = escapeStrings( tokenId );

    messageId = escapeStrings( messageId );

    // The user is verified first before an action is taken
    const verified = await verifyPageAccess( username, tokenId );

    if ( !verified ) {

        return;

    }

    // The single document is set for deletion 
    const messagesCollection = database.collection("feedback-message-collection");

    messagesCollection.deleteOne({ _id: new ObjectId( messageId ) });

}