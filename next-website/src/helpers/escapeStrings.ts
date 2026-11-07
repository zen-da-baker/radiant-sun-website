
/*
    This helper function is responsible for escaping strings with characters that 
    would be risky to include in a database submission.
*/
export function escapeStrings( inputString: string ): string {

    let resultString = inputString;

    // Targetted characters to check for
    const riskyCharacters = [
        "[",
        "]",
        "{",
        "}",
        "$",
        "<",
        ">",
        "!",
        "(",
        ")",
        "%",
        "&",
        "=",
        "'",
        '"'
    ]

    riskyCharacters.forEach( ( char: string ) => {

        // Targetted characters removed outright
        resultString = resultString.replaceAll( char, "" );

    })

    return resultString;

}