"use server"

// Import MongoDB database
import { database } from "@/database/database";

// Import Node system
import fs from "node:fs"
import { readFile, writeFile } from "node:fs/promises";
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

    let file: any = formData.get("file");

    if ( !file ) {

        return;

    }

    // If the type of file is not markdown, the function is terminated before the save operation
    if ( file.type !== "text/markdown" ) {

        return;

    }

    // Contents of the blog post markdown file are extracted
    let blogText: string = await file.text();

    // Remove all script and style tags
    blogText = blogText.replaceAll( "<script>", "" );

    blogText = blogText.replaceAll( "</script>", "" );

    blogText = blogText.replaceAll( "<style>", "" );

    blogText = blogText.replaceAll( "</style>", "" );

    // The blog post to be stored in the database
    const blogPostMetaData = {
        title, author, 
        postDate: today.toString(), 
        contents: blogText
    }

    // The meta data is stored in the database
    const blogCollection = database.collection("radiant-sun-blogs");

    try {

        blogCollection.insertOne( blogPostMetaData );

    } catch( error: any ) {

        console.log( error );
        
    }

}