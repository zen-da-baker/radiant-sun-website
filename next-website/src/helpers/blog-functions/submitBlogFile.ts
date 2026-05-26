"use server"

// Import MongoDB database
import { database } from "@/database/database";

// Import Node system
import fs from "node:fs"
import { writeFile } from "node:fs/promises";
import path from "node:path";

// Import helper functions
import { verifyPageAccess } from "../login-server-functions/verifyPageAccess";
import { escapeStrings } from "../escapeStrings";

/*
    This server side function verifies the user and then adds the blog post 
    meta data, a date of the post, and the contents of the blog post which is 
    a markdown file.
*/
export async function submitBlogFile( 
    /*
    username: string, 
    tokenId: string, 
    title: string, 
    author: string, 
    file: File 
    */
   formData: FormData
) {

    let username = formData.get("username");
    
    let tokenId = formData.get("tokenId");
    
    let title = formData.get("title");
    
    let author = formData.get("author");

    if ( !username || !tokenId || !title || !author ) {

        return;

    }

    username = escapeStrings( username.toString() );

    tokenId = escapeStrings( tokenId.toString() );

    title = escapeStrings( title.toString() );

    author = escapeStrings( author.toString() );

    // The user is validated
    const verified = verifyPageAccess( username, tokenId );

    if ( !verified ) {

        return;

    }

    // Meta data established
    const today = new Date();

    let file = formData.get("file");

    if ( !file ) {

        return;

    }

    const filename = title + ".md";

    const filePath = "/bytesized-files/radiant-sun/blogs/";

    const blogPostMetaData = {
        title, author, 
        postDate: today.toString(), 
        fileLocation: path.join( filePath, filename )
    }

    // The meta data is stored in the database
    const blogCollection = database.collection("radiant-sun-blogs");

    try {

        blogCollection.insertOne( blogPostMetaData );

        // If the file path does not already exist, it will be created
        try {

            if ( !fs.existsSync( filePath ) ) {

                fs.mkdirSync( filePath );
            
            }

        } catch ( error: any ) {

            console.error( error );

        }

        // The file is stored in the file system / volume
        writeFile( blogPostMetaData.fileLocation, file.toString(), "utf-8" );

    } catch( error: any ) {

        console.log( error );
        
    }

}