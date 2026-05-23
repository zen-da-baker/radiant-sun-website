import { MongoClient } from "mongodb";

// Import components
import { ContactForm } from "@/page-components/ContactForm";

// Import helper strings
import { escapeStrings } from "@/helpers/escapeStrings";

export default function ContactPage() {

    /* 
        This function on the server takes data from submission from the client side and hanldes how it is maintained.
        The fields of the form being arguments in the function are very similar to PL/SQL procedures.
    */
    async function formAction( name: string, email: string, subject: string, body: string ): Promise<boolean> {

        // The server function needs to be explicitly described as being on the server side
        "use server"

        console.log("Server Function Executed");

        name = escapeStrings( name );

        email = escapeStrings( email );

        subject = escapeStrings( subject );

        body = escapeStrings( body );

        let submittedFrom = "Radiant Sun";

        const message = {
            name, email, subject, body, submittedFrom
        }

        const databaseURI = process.env.databaseURI;

        const databaseName = process.env.databaseName;

        let client: MongoClient;

        // Now that everything is ready for storage, the database connection is made
        try {

            if ( databaseURI !== null && databaseURI !== undefined ) {

                client = new MongoClient( databaseURI );

                await client.connect();

                const db = client.db( databaseName );

                const collection = db.collection("feedback-message-collection");

                collection.insertOne( message );

            }

        } catch( error: any ) {

            console.log( error );

            return false;

        }
        
        return true;

    }

    return (
        <main>

            <h1>Contact</h1>

            <ContactForm formAction={ formAction } />

        </main>
    )
}