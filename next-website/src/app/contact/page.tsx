// The MongoDB database
import { database } from "@/database/database";

// Import components
import { ContactForm } from "@/page-components/contact/ContactForm";

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

        // Characters escaped
        name = escapeStrings( name );

        email = escapeStrings( email );

        subject = escapeStrings( subject );

        body = escapeStrings( body );

        let messageRead = false;

        let submittedFrom = "Radiant Sun";

        // The data string is created on the server to allow for unescaped characters to be used and are not accepted by the client
        const today = new Date();

        const submissionDate = today.toString();

        // The message object to be stored
        const message = {
            name, email, subject, body, submittedFrom, messageRead, submissionDate
        }

        // Now that everything is ready for storage, the database connection is made
        try {

            const collection = database.collection("feedback-message-collection");

            collection.insertOne( message );

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