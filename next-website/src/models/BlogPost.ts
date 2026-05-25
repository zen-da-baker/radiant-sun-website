// Import data models
import { Line } from "./Line";

export class BlogPost {

    _id: any;

    author: string = "";

    title: string = "";
    
    content: Array<Line> = [];

}