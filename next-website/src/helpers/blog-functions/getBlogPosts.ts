import { database } from "@/database/database";

export async function getBlogPosts() {

    const blogCollection = database.collection("radiant-sun-blogs");

    const findCursor = blogCollection.find();

    const allBlogs = findCursor.toArray();

    return allBlogs;

}