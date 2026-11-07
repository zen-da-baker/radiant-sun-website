"use client"

// Import React components
import { useState, useEffect } from "react";

// Import models
import { SecurityQuestion } from "@/models/SecurityQuestion";

// Import styling
import "../../../styles/form.css";

// The component form for the client side
export function LoginForm( 
    { handleUsernameSubmission, handleAnswerSubmission, loginRedirect } 
    : 
    { 
        handleUsernameSubmission: ( username: string ) => Promise<SecurityQuestion | void> 
        handleAnswerSubmission: ( question: string, answer: string, username: string ) => Promise<string | void>
        loginRedirect: ( username: string, tokenId: string ) => Promise<void>
    } 
) {

    useEffect( () => {

        let accessToken = localStorage.getItem("radiant-sun-access-token");
        let storedUsername = localStorage.getItem("radiant-sun-username");

        if ( accessToken && storedUsername ) {

            loginRedirect( storedUsername, accessToken );

        }

    }, [])

    // The local state of this component
    const [ username, setUsername ] = useState<string>("");
    const [ question, setQuestion ] = useState<string>("");
    const [ answer, setAnswer ] = useState<string>("");


    // The local variable update functions
    function usernameHandler( event: any ) {

        setUsername(event.target.value);

    }

    function answerHandler( event: any ) {

        setAnswer(event.target.value);

    }

    // The submission function that is trigged when the login button is pressed
    async function handleLoginSubmission() {

        // Client side input validation
        if ( username === "" ) {

            return;

        }

        // Trigger the server function which is a network request
        const questionSelection: SecurityQuestion | void = await handleUsernameSubmission( username );

        // The question string is now displayed to the user and the form UI switches
        if ( questionSelection ) {

            setQuestion( questionSelection.question );
        
        }

    }

    // API handler function that submits the question pair to the server
    async function submitAnswer() {

        const tokenString: string | void = await handleAnswerSubmission( question, answer, username );

        if ( tokenString ) {

            localStorage.setItem( "radiant-sun-access-token", tokenString );
            localStorage.setItem("radiant-sun-username", username );

            location.assign( location.origin + "/admin" );

        }

    }

    return (
        <div className="form">

            <h2>Access Admin Panel</h2>

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

            { !question ? <button onClick={ handleLoginSubmission }>Confirm Username</button> : null }

            { question ? <button onClick={ submitAnswer }>Submit Answer</button> : null }

        </div>
    )
    
}