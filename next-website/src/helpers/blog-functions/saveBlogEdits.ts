"use server"

// Import MongoDB database
import { database } from "@/database/database";

// Import MongoDB helpers
import { ObjectId } from "mongodb";

// Import helpers
import { verifyPageAccess } from "../login-server-functions/verifyPageAccess";
import { escapeStrings } from "../escapeStrings";

export async function saveBlogEdits( username: any, tokenId: any, postId: string, title: string, author: string, blogContents: string ): Promise<boolean> {

    const verified = await verifyPageAccess( username, tokenId );

    if ( !verified ) {

        return false;

    }

    blogContents = blogContents
        .replaceAll( "<script>", "" )
        .replaceAll( "</script>", "" )
        .replaceAll( "<style>", "" )
        .replaceAll( "</style>", "" );

    title = escapeStrings( title );
    author = escapeStrings( author );

    const blogCollection = database.collection("radiant-sun-blogs");

    // Finding the blog post by searching with the post ID string converted to a MongoDB ID object
    const blog = await blogCollection.findOne({ _id: new ObjectId( postId ) });

    if ( !blog ) {

        return false;

    }

    await blogCollection.updateOne( { _id: new ObjectId( postId ) }, { $set: { title, author, contents: blogContents } });

    return true;

}