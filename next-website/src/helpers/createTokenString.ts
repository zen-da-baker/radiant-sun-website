// Import helper functions
import { createRandomCharacter } from "./createRandomCharacter";

export function createTokenString(): string {
    
    let initialTokenString = "";

    for ( let i = 0; i < 25; i++ ) {

        initialTokenString += createRandomCharacter();

    }
    
    return initialTokenString;
    
}
