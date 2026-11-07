"use server"

// Import MongoDB database
import { database } from "@/database/database";

// Import helper functions
import { escapeStrings } from "../escapeStrings";
import { assignToken } from "./assignToken";

// Import data models
import { Token } from "@/models/Token";

/*
    This server function expects to receive an object which is a paired
    question and answer and a string username. If the three match a user profile,
    an authentication token is issued to the user and they are then redirected to 
    the admin page.
*/
export async function handleAnswerSubmission( question: string, answer: string, username: string ): Promise<string | void> {

    // First the question, answer, and username are estracted
    question = escapeStrings( question );

    answer = escapeStrings( answer );

    username = escapeStrings( username );

    if ( username === "" ) {

        return;

    }

    try {

        const questionsCollection = database.collection("radiant-sun-questions");

        const profile = await questionsCollection.findOne( { user: username } );

        if ( profile === null ) {

            return;

        }

        // Picking a random question
        const questions = profile.questions;

        const questionIndex = questions.findIndex( ( searchQuestion: any ) => {

            if ( searchQuestion.question === question ) {

                return true;

            } else {

                return false;

            }

        })

        if ( questionIndex === -1 ) {

            return;

        }

        // If the answer for the selected question for the user was correct, the token is assigned
        if ( questions[ questionIndex ].answer === answer ) {

            const token = new Token( username );

            assignToken( token );

            return token.tokenId;

        }

    } catch( error: any ) {

        console.log( error );

    }

    return;

}