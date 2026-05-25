"use server"

// Import MongoDB client
import { MongoClient } from "mongodb";

// Import helper functions
import { verifyPageAccess } from "../login-server-functions/verifyPageAccess";
import { escapeStrings } from "../escapeStrings";

/*
    This server side helper function is invoked from inside the client.
    It expects the credentials of the user, and the ID of the message to be changed.
    If the credentials are valid, the message read status is inverted.
*/
export async function toggleMessageReadStatus( username: string, tokenId: string, messageId: string ) {

    username = escapeStrings( username );

    tokenId = escapeStrings( tokenId );

    messageId = escapeStrings( messageId );
    
    const databaseURI = process.env.databaseURI;

    const databaseName = process.env.databaseName;

    if ( databaseURI === undefined || databaseName === undefined ) {

        return;

    }

    if ( username === "" ) {

        return;

    }

    console.log("Editing Message");

    return;

    try {

        

    } catch( error: any ) {

    }

}