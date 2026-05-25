// Import MongoDB client
import { MongoClient } from "mongodb";

// Get the environment variables from the server for the database

let databaseURI = "";

let databaseName = "";

if ( process.env.databaseURI && process.env.databaseName ) {
    
    databaseURI = process.env.databaseURI;

    databaseName = process.env.databaseName;

}

const client = new MongoClient( databaseURI );

export const database = client.db( databaseName );