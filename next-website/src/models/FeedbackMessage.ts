/*
    Expected message fields from the database.
*/
export class FeedbackMessage {

    _id: any;

    name: string = "";
    
    email: string = "";
    
    subject: string = "";
    
    body: string = "";
    
    submittedFrom: string = ""; 
    
    messageRead: boolean = false;

    submissionDate: string = new Date().toString();

}