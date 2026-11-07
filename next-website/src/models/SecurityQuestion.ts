export class SecurityQuestion {

    question: string;
    answer: string;

    constructor( inputQuestion: string = "", inputAnswer: string = "" ) {

        this.question = inputQuestion;

        this.answer = inputAnswer;
        
    }

}