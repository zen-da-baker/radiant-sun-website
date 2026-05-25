"use client"

// Import Next components
import { useSearchParams } from "next/navigation";

// Import data models
import { FeedbackMessage } from "@/models/FeedbackMessage";

// Import server functions
import { toggleMessageReadStatus } from "@/helpers/message-server-functions/toggleMessageReadStatus";
import { deleteMessage } from "@/helpers/message-server-functions/deleteMessage";

export function MessageView( { messageString } : { messageString: string } ) {

    const searchParams = useSearchParams();

    const username = searchParams.get("username");

    const tokenId = searchParams.get("tokenId");

    const message: FeedbackMessage = JSON.parse( messageString );

    function handleToggleRead() {

        if ( username !== null && tokenId !== null ) {

            toggleMessageReadStatus( username, tokenId, message._id );
        
        }

    }

    function handleDelete() {

        console.log("delete")

    }

    return (
        <div className="card">

            { message.messageRead ? <span>Message Read</span> : <span>Unread</span> }
            
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