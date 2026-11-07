// Import MongoDB client
import { MongoClient } from "mongodb";

// Default variables exist in case the environmental variables do not exist
let databaseURI = "mongodb://localhost:27017";

let databaseName = "data";

// When the environmental variables exist, they are prioritized over the defaults
if ( process.env.databaseURI && process.env.databaseName ) {
    
    databaseURI = process.env.databaseURI;

    databaseName = process.env.databaseName;

}

// The database client is created
const client = new MongoClient( databaseURI );

// The database is created once on the boot of the server
await client.connect();

// The database client is exported so every other component can leverage it
export const database = client.db( databaseName );