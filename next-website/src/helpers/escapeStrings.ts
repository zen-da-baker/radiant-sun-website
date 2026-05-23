
/*
    This helper function is responsible for escaping strings with characters that 
    would be risky to include in a database submission.
*/
export function escapeStrings( inputString: string ): string {

    let resultString = inputString;

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

        resultString = resultString.replaceAll( char, "" );

    })

    return resultString;

}