// Import data models
import { Line } from "./Line";

export class BlogPost {

    author: string = "";

    title: string = "";

    tags: Array<string> = [];

    content: Array<Line> = [];

}