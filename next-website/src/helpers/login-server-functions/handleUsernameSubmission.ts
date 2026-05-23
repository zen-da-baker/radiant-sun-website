// Import database client
import { MongoClient } from "mongodb";

// Import other helper functions
import { escapeStrings } from "../escapeStrings";
import { createRandomNumber } from "../createRandomNumber";

export async function handleUsernameSubmission( username: string ): Promise<string> {

    "use server"

    username = escapeStrings( username );

    const databaseURI = process.env.databaseURI;

    const databaseName = process.env.databaseName;

    if ( databaseURI === undefined || databaseName === undefined ) {

        return "";

    }

    if ( username === "" ) {

        return "";

    }

    try {

        const client = new MongoClient( databaseURI );

        await client.connect();

        const database = client.db( databaseName );

        const collection = database.collection("radiant-sun-questions");

        const profile = await collection.findOne({ user: username });

        if ( profile === null ) {

            return "";

        }

        const keys = Object.keys( profile );

        const questionIndex = createRandomNumber( 2, keys.length );

        return keys[ questionIndex ];

    } catch( error: any ) {

        console.log( error );

    }

    return "";

}