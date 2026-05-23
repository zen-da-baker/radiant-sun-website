// Import helper functions
import { createTokenString } from "@/helpers/createTokenString";

export class Token {

    username: string;

    tokenId: string;

    expirationDate: string;

    status: boolean = false;

    constructor( inputUsername: string = "" ) {

        this.username = inputUsername;

        this.tokenId = createTokenString();

        const currentDate = new Date();

        currentDate.setDate( currentDate.getDate() + 14 );

        this.expirationDate = currentDate.toString();

    }

}