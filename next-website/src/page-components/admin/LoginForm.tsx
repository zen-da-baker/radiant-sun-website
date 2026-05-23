"use client"

// Import React components
import { useState } from "react";

// Import models
import { Token } from "@/models/Token";

// The component form for the client side
export function LoginForm( 
    { handleUsernameSubmission } 
    : 
    { handleUsernameSubmission: ( username: string ) => Promise<string> } 
) {

    const [ question, setQuestion ] = useState<string>("");

    // Local variables for storing the input values
    let username: string = "";

    let answer: string = "";

    // The local variable update functions
    function usernameHandler( event: any ) {

        username = event.target.value;

    }

    function answerHandler( event: any ) {

        answer = event.target.value;

    }

    // The submission function that is trigged when the login button is pressed
    async function handleLoginSubmission() {

        // Client side input validation
        if ( username === "" ) {

            return;

        }

        // Trigger the server function which is a network request
        const questionResponse = await handleUsernameSubmission( username );

        setQuestion( questionResponse );

    }

    return (
        <div>

            <h2>Login</h2>

            <label>
                Username
                <input type="text" placeholder="Username..." onChange={ usernameHandler } />

            </label>

            <label>
                Question
                <p>{ question }</p>
                {
                    question ? <input type="text" placeholder="Answer..." onChange={ answerHandler } /> : null
                }
            </label>

            <button onClick={ handleLoginSubmission }>Login</button>

        </div>
    )
    
}