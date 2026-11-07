// Get the MongoDB database instance
import { database } from "@/database/database";

/*
    This helper functions gets alls blog posts for the website from the database
    and stores them in memory as an array, then orders the array by date with the 
    most recent blog post being first.
*/
export async function getBlogPosts() {

    // Gets all blog posts from the database
    const blogCollection = database.collection("radiant-sun-blogs");

    const findCursor = blogCollection.find();

    // Stores the blog posts in memory as an array
    const allBlogs = await findCursor.toArray();

    // The array of posts is sorted by the post date
    allBlogs.sort( ( firstBlog, secondBlog ) => {

        const firstDate = new Date( firstBlog.postDate );

        const secondDate = new Date( secondBlog.postDate );

        return secondDate.valueOf() - firstDate.valueOf();

    });

    // Finally, the list of blog posts is returned
    return allBlogs;

}