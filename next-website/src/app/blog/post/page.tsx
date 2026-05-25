// Import Next components
import Link from "next/link";

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

    // The blog post is queried from the database and shown to the reader

    return (
        <main>

            <h1>Blog Post</h1>

        </main>
    )

}