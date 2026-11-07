export function createRandomNumber( start: number, end: number ): number {
    
    const number = Math.floor( Math.random() * ( end - start ) );
    
    return number + start;
    
}
