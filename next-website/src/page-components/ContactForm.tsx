/*
    This client component submits the contact form to the server API endpoint when the fields have been validated. 
    From the API endpoint, the message is stored in a database where the message can then be viewed elsewhere.
*/

"use client"

// Import React packages
import { useState } from "react";

// Import components
import { StatusBanner } from "./StatusBanner";

// Import styles
import "../../styles/form.css";

// The contact form would receive a function from the server for how to handle submitting data
export function ContactForm( { formAction }: { formAction: any } ) {

    const [ visibility, setVisibility ] = useState<string>("hidden");
    const [ status, setStatus ] = useState<boolean>( false );

    // Component variables
    let message = "";

    // The variables for submitting to the server
    let name = "";

    let email = "";

    let subject = "";

    let body = "";

    // This client component handles the submission button action and validating the form data before it is submitted
    async function submitForm() {

        // Form validation taking place by ensuring the fields are not empty
        if ( name === "" || email === "" || subject === "" || body === "" ) {

            return;
            
        }

        // The form is submitted to the server component and a value of true is returned if the submission was successful and false otherwise
        const submissionSuccessful = await formAction( name, email, subject, body );

        if ( submissionSuccessful ) {

            // Elements
            const nameUI = document.getElementById("name") as HTMLInputElement;
            const emailUI = document.getElementById("email") as HTMLInputElement;
            const subjectUI = document.getElementById("subject") as HTMLInputElement;
            const bodyUI = document.getElementById("body") as HTMLTextAreaElement;

            // Element values are cleared
            if ( nameUI !== null && emailUI !== null && subjectUI !== null && bodyUI !== null ) {

                nameUI.value = "";

                emailUI.value = "";

                subjectUI.value = "";

                bodyUI.value = "";
        
            }

            setStatus( true );

            message = "Message was submitted successfully.";

            setVisibility("visible");

        } else {

            setStatus( false );

            message = "Message was not submitted successfully.";

            setVisibility("visible");

        }

    }

    return (
        <div className="flex column form">

            { /* <StatusBanner visible={ visibility } status={ status } message={ message } /> */ }

            <label>
                Name
                <input id="name" type="text" name="name" onChange={ ( event ) => name = event.target.value } />
            
            </label>

            <label>
                Email
                <input id="email" type="text" name="email" onChange={ ( event ) => email = event.target.value } />

            </label>

            <label>
                Subject
                <input id="subject" type="text" name="subject" onChange={ ( event ) => subject = event.target.value } />

            </label>

            <label>
                Body
                <textarea id="body" name="body" onChange={ ( event ) => body = event.target.value } ></textarea>
            
            </label>

            <button onClick={ submitForm }>Submit</button>

        </div>
    )

}