/*
    This helper function creates a random character that is either an upper or lower case standard ASCII letter.
*/
export function createRandomCharacter(): string {
    
    // Relevant ASCII codes
    const asciiUpperStart = 65;

    const asciiUpperEnd = 90;

    const asciiLowerStart = 97;

    const asciiLowerEnd = 122;

    // This lower order function creates a number between the ASCII code ranges
    function createRandomNumber(): number {

        let range = asciiLowerEnd - asciiUpperStart;

        return Math.floor( Math.random() * range ) + asciiUpperStart;

    }

    // A random number variable is assigned the random number within the ASCII range
    let randomNumber: number = createRandomNumber();

    // If the random number is between the standard letters, the function is executed again recursively
    if ( randomNumber > asciiUpperEnd && randomNumber < asciiLowerStart ) {

        return createRandomCharacter();

    }
    
    // The character string is returned from the random number being an argument for the character code generation
    return String.fromCharCode( randomNumber );
        
}
