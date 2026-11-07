"use server"

// Import MongoDB helper
import { ObjectId } from "mongodb";

// Import MongoDB database
import { database } from "@/database/database";

// Import helper functions
import { verifyPageAccess } from "../login-server-functions/verifyPageAccess";
import { escapeStrings } from "../escapeStrings";

// Import data models
import { FeedbackMessage } from "@/models/FeedbackMessage";

/*
    This server side helper function is invoked from inside the client.
    It expects the credentials of the user, and the ID of the message to be changed.
    If the credentials are valid, the message read status is inverted.
    After the data was updated, the value is returned to the client for updating the UI.
*/
export async function toggleMessageReadStatus( username: string, tokenId: string, messageId: any ): Promise<boolean | void> {

    // Escape the strings
    username = escapeStrings( username );

    tokenId = escapeStrings( tokenId );

    messageId = escapeStrings( messageId );

    // Validate that the strings are not empty
    if ( username === "" || tokenId === "" || messageId === "" ) {

        return;

    }

    // Verify the user authorization before performing an action
    const verified = await verifyPageAccess( username, tokenId );

    if ( !verified ) {

        return;

    }
    
    // The message collection is extracted
    const messageCollection = database.collection("feedback-message-collection");

    console.log( messageId );

    const message: any = await messageCollection.findOne({ _id: new ObjectId( messageId )  });

    if ( message === null ) {

        return;

    }

    // The boolean is inverted
    const newReadStatus = !message.messageRead;

    // The message read status is updated
    messageCollection.updateOne( { _id: new ObjectId( messageId ) }, { $set: { messageRead: newReadStatus } } );

    return newReadStatus;

}