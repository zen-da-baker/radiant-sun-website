"use client"

// Import Next components
import { useSearchParams } from "next/navigation";

// Import React components
import { useState } from "react";

// Import data models
import { FeedbackMessage } from "@/models/FeedbackMessage";

// Import server functions
import { toggleMessageReadStatus } from "@/helpers/message-server-functions/toggleMessageReadStatus";
import { deleteMessage } from "@/helpers/message-server-functions/deleteMessage";

/*
    This client component displays a message from the server and contains buttons for all of its actions.
*/
export function MessageView( { messageString } : { messageString: string } ) {

    // The search params of the URL are gathered for submission to the server in server functions
    const searchParams = useSearchParams();

    const username = searchParams.get("username");

    const tokenId = searchParams.get("tokenId");

    // The message is parsed from the string value passed to it form the server
    const message: FeedbackMessage = JSON.parse( messageString );

    // The state of the message read status
    const [ messageRead, setMessageRead ] = useState<boolean>( message.messageRead );

    // This handler function updates the read status of the message on both the client and server when the button is pressed
    async function handleToggleRead() {

        if ( username !== null && tokenId !== null ) {

            // The server function is triggered and credentials are provided
            const newReadStatus = await toggleMessageReadStatus( username, tokenId, message._id );

            // If the response is a boolean, the update on the server was successful and the UI is updated as well
            if ( typeof newReadStatus === "boolean" ) {

                setMessageRead( newReadStatus );

            }
        
        }

    }

    async function handleDelete() {

        if ( username && tokenId ) {

            deleteMessage( username, tokenId, message._id );

        }

    }

    return (
        <div className="card">

            { messageRead ? <span>Message Read</span> : <span>Unread</span> }

            <p>From: { message.submissionDate }</p>
            
            <h3>{ message.name }</h3>

            <p>{ message.email }</p>

            <p>{ message.subject }</p>

            <p>{ message.body }</p>

            <div className="flex">

                <button onClick={ handleToggleRead }>Mark as Read</button>

                <button onClick={ handleDelete }>Delete</button>

            </div>

        </div>
    )

}