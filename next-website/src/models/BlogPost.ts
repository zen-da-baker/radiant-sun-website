/*
    This data type contains the meta data for a blog post as well as the location
    of the file that will be displayed. The file is expected to be markdown.
*/
export class BlogPost {

    _id: any;

    author: string = "";

    title: string = "";

    postDate: string = "";

    fileLocation: string = "/radiant-sun/blogs/";

}