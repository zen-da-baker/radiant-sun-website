// Import Next components
import Link from "next/link";

// Import Markdoc package
import Markdoc from '@markdoc/markdoc';

// Import helper functions
import { escapeStrings } from "@/helpers/escapeStrings";
import { getBlog } from "@/helpers/blog-functions/getBlog";

/*
    This page is for viewing a blog post which publicly available. The query parameters
    of the page are expected to be the ID of the blog post being read. 
*/
export default async function ReadBlog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    // The query parameters are extracted from the query parameters
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

    const blog = await getBlog( postId );

    // If the blog does not exist, the error result is shown
    if ( blog === null ) {

        return (
            <main>

                <h1>Blog Post Not Found</h1>

                <Link href="/blog">Back to Blog</Link>

            </main>
        )

    }

    if ( !blog.contents ) {

        return (
            <main>

                <h1>No Content to be displayed.</h1>

            </main>
        )

    }

    // The blog post is parsed with the Stripe provided Markdoc package
    const ast = Markdoc.parse( blog.contents );

    const content = Markdoc.transform( ast );

    const html = Markdoc.renderers.html( content );

    return (
        <main>

            <Link href="/blog">
                <button>Return to Blog</button>
            </Link>

            <p>Blog Post | { blog.title }</p>

            <p>By { blog.author }</p>

            <div className="text-container" dangerouslySetInnerHTML={ { __html: html } }>
            </div>

        </main>
    )

}