// Import database client
import { MongoClient } from "mongodb";

// Import other helper functions
import { escapeStrings } from "../escapeStrings";
import { createRandomNumber } from "../createRandomNumber";

// Import data models
import { SecurityQuestion } from "@/models/SecurityQuestion";

export async function handleUsernameSubmission( username: string ): Promise<SecurityQuestion | null> {

    "use server"

    username = escapeStrings( username );

    const databaseURI = process.env.databaseURI;

    const databaseName = process.env.databaseName;

    if ( databaseURI === undefined || databaseName === undefined ) {

        return null;

    }

    if ( username === "" ) {

        return null;

    }

    try {

        const client = new MongoClient( databaseURI );

        await client.connect();

        const database = client.db( databaseName );

        const collection = database.collection("radiant-sun-questions");

        const profile = await collection.findOne({ user: username });

        if ( profile === null ) {

            return null;

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

    return null;

}