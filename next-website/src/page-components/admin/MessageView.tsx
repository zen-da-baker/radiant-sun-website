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

// Import helpers
import { monthList } from "@/helpers/monthList";

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
    const [ deleted, setDeleted ] = useState<boolean>( false );

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

            // The internal state of the component is set to recognize deletion after the server action is taken
            setDeleted( true );

        }

    }

    let messageDate = new Date( message.submissionDate );

    let monthIndex = messageDate.getMonth();

    let month = monthList[ monthIndex ];

    let day = messageDate.getDate();

    let year = messageDate.getFullYear();

    return (
        <div className="card" style={ 

            // When the deleted state is activated, the message is no longer displayed but technically exists in memory
            deleted ? { display: "none" } : { display: "block" } 
            
        }>

            { messageRead ? <span>Message Read</span> : <span>Unread</span> }

            <p>From: { month } { day }, { year } </p>
            
            <h3>Name: { message.name }</h3>

            <p>Email: { message.email }</p>

            <p>Subject: { message.subject }</p>

            <p>{ message.body }</p>

            <div className="flex">

                <button onClick={ handleToggleRead }>Mark as Read</button>

                <button onClick={ handleDelete }>Delete</button>

            </div>

        </div>
    )

}