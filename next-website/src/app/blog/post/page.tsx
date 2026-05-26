// Import Node modules
import fs from "node:fs/promises";

// Import Next components
import Link from "next/link";

// Import MongoDB database
import { database } from "@/database/database";

// Import MongoDB helpers
import { ObjectId } from "mongodb";

// Import helper functions
import { escapeStrings } from "@/helpers/escapeStrings";


/*
    This page is for viewing a blog post which publicly available. The query parameters
    of the page are expected to be the ID of the blog post being read. 
*/
export default async function ReadBlog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const params = await searchParams;

    let postId = params.id;

    // If the blog post ID is not a single string, the error page is shown
    if ( typeof postId !== "string" ) {

        return (
            <main>

                <h1>Oops, this isn't a blog post.</h1>

                <Link href="/blog">Return to Blog</Link>

            </main>
        )
    }

    // The characters are escaped
    postId = escapeStrings( postId );

    // The blog post is queried from the database
    const blogsCollection = database.collection("radiant-sun-blogs");

    const blog = await blogsCollection.findOne({ _id: new ObjectId( postId ) });

    // If the blog does not exist, the error result is shown
    if ( blog === null ) {

        return (
            <main>

                <h1>Blog Post Not Found</h1>

                <Link href="/blog">Back to Blog</Link>

            </main>
        )

    }

    let file: any;

    let blogContents: string;

    try {

        file = await fs.readFile( blog.fileLocation );

        blogContents = await file.text();

    } catch( error: any ) {

        console.log( error );

        return (
            <main>

                <h1>There was a Server Side Error</h1>

                <Link href="/blog">Back to Blog</Link>

            </main>
        )

    }

    return (
        <main>

            <Link href="/blog">Return to Blog</Link>

            <h1>Blog Post</h1>

            <h2>{ blog.title }</h2>

            <h3>{ blog.author }</h3>

            <p>{ blogContents }</p>

        </main>
    )

}