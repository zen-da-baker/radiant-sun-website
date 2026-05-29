"use server"

// Import Next components
import { redirect } from "next/navigation";

// Import MongoDB database
import { database } from "@/database/database";

// Import MongoDB helpers
import { ObjectId } from "mongodb";

// Import helper functions
import { verifyPageAccess } from "../login-server-functions/verifyPageAccess";

export async function deleteBlog( username: string, tokenId: string, postId: string ): Promise<void> {

    // Verify the user first
    const verified = await verifyPageAccess( username, tokenId );

    if ( !verified ) {

        return;

    }

    const blogsCollection = database.collection("radiant-sun-blogs");

    blogsCollection.deleteOne({ _id: new ObjectId( postId ) });

    redirect( "/admin/blogs?username=" + username + "&tokenId=" + tokenId );

}