import { MongoClient } from "mongodb";

export async function MessageForm() {

    const databaseURI = process.env.devDatabaseURI;

    if ( databaseURI === null || databaseURI === undefined ) {

        return (
            <div>

                <h3>No Connection</h3>

            </div>
        )

    }

    const client = new MongoClient( databaseURI );

    const database = client.db( "bytesized-crew-db" );

    const collection = database.collection( "feedback-message-collection" );

    const item = await collection.findOne(  );

    console.log( item );

    if ( item === null ) {

        return (
            <div>
                <h3>Item Null</h3>
            </div>
        )

    }

    return (
        <div>

            {
                item.email
            }

        </div>
    )

}