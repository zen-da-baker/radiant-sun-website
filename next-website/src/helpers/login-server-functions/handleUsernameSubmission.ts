// Import database client
import { MongoClient } from "mongodb";

// Import other helper functions
import { escapeStrings } from "../escapeStrings";

// Import data models
import { SecurityQuestion } from "@/models/SecurityQuestion";

/*
    This is a server function that expects a username string from the client. The function searches
    for the user from the database. If the user is found, a random question is chosen and sent back to the
    user. 
*/
export async function handleUsernameSubmission( username: string ): Promise<SecurityQuestion | void> {

    "use server"

    username = escapeStrings( username );

    const databaseURI = process.env.databaseURI;

    const databaseName = process.env.databaseName;

    if ( databaseURI === undefined || databaseName === undefined ) {

        return;

    }

    if ( username === "" ) {

        return;

    }

    try {

        const client = new MongoClient( databaseURI );

        await client.connect();

        const database = client.db( databaseName );

        const collection = database.collection("radiant-sun-questions");

        const profile = await collection.findOne( { user: username } );

        if ( profile === null ) {

            return;

        }

        // Picking a random question
        const questions = profile.questions;

        const listSize = questions.length;

        const randomQuestionIndex = Math.floor( Math.random() * listSize );

        const randomQuestion: SecurityQuestion = questions[ randomQuestionIndex ];

        return randomQuestion;

    } catch( error: any ) {

        console.log( error );

    }

    return;

}