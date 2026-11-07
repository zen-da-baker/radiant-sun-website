// Import MongoDB database
import { database } from "@/database/database";

// Import MongoDB helpers
import { ObjectId } from "mongodb";

// Import data models
import { BlogPost } from "@/models/BlogPost";

export async function getBlog( postId: string ): Promise<BlogPost | null> {

    // The blog post is queried from the database
    const blogsCollection = database.collection("radiant-sun-blogs");

    const blog: any = await blogsCollection.findOne({ _id: new ObjectId( postId ) });

    return blog;

}