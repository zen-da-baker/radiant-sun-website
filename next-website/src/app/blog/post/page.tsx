// Import Node modules
import fs from "node:fs/promises";

// Import Next components
import Link from "next/link";

// Import MongoDB database
import { database } from "@/database/database";

// Import MongoDB helpers
import { ObjectId } from "mongodb";

// Import Markdoc package
import Markdoc from '@markdoc/markdoc';

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

    let postId = params.postId;

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

        file = await fs.readFile( 
            //blog.fileLocation 
            "/Users/donovan/Projects/radiant-sun/next-website/public/testBlog.md"
        );

        blogContents = await file.toString();

    } catch( error: any ) {

        console.log( error );

        return (
            <main>

                <h1>There was a Server Side Error</h1>

                <Link href="/blog">Back to Blog</Link>

            </main>
        )

    }

    // The blog file is parsed with the Stripe provided Markdoc package
    const ast = Markdoc.parse( blogContents );

    const content = Markdoc.transform( ast );

    const html = Markdoc.renderers.html( content );

    return (
        <main>

            <Link href="/blog">Return to Blog</Link>

            <p>Blog Post | { blog.title }</p>

            <p>By { blog.author }</p>

            <div dangerouslySetInnerHTML={ { __html: html } }>
            </div>

        </main>
    )

}