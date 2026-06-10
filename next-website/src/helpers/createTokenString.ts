// Import helper functions
import { createRandomCharacter } from "./createRandomCharacter";

/*
    This helper function creates a string of 25 random characters.
*/
export function createTokenString(): string {
    
    let initialTokenString = "";

    for ( let i = 0; i < 25; i++ ) {

        initialTokenString += createRandomCharacter();

    }
    
    return initialTokenString;
    
}
