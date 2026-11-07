// Import Next components
import Link from "next/link";

// Import helper functions
import { verifyPageAccess } from "@/helpers/login-server-functions/verifyPageAccess";
import { getBlog } from "@/helpers/blog-functions/getBlog";
import { escapeStrings } from "@/helpers/escapeStrings";

// Import data types
import { BlogPost } from "@/models/BlogPost";

// Import components
import { EditBlogForm } from "@/page-components/blog/EditBlogForm";

/*
    This page is for editing an existing blog post. The query parameter is expected to be the credentials 
    of the user as well as the ID of the blog post to be edited.
*/
export default async function EditBlog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    // Credentials from the quert parameters is verified
    const credentials = await searchParams;

    const verified = await verifyPageAccess( credentials.username, credentials.tokenId );

    // Unverified page
    if ( !verified ) {

        return (
            <main>

                <h1>Not Authorized!</h1>

                <p>You are not authorized to access this page. Please login.</p>

                <Link href="/login">Login</Link>

            </main>
        )

    }

    // Get the specific blog identified from the query parameters 
    let postId = credentials.postId;

    // If the post is not found, update the UI as such
    if ( typeof postId !== "string" || typeof credentials.tokenId !== "string" || typeof credentials.username !== "string" ) {

        return (
            <main>

                <h1>Blog Post Not Found</h1>

                <Link href={
                    {
                        pathname: "/admin/blogs",
                        query: credentials
                    }
                }>
                    Back to Blogs Dashboard
                </Link>

            </main>
        )
    }

    // The blog post is searched for from the database
    postId = escapeStrings( postId );

    const blog: BlogPost | null = await getBlog( postId );

    // If the blog post was not found, the UI is updated as such
    if ( !blog ) {

        return (
            <main>

                <h1>Blog Not Found</h1>

                <Link href={
                    {
                        pathname: "/admin/blogs",
                        query: credentials
                    }
                }>
                    Back to Blogs Dashboard
                </Link>

            </main>
        )
    }

    // The blog metadata is converted to a string and passed to the client component for editing the blog
    const blogString = JSON.stringify( blog );

    return (

        <main>

            <h1>Edit Blog</h1>

            <Link href={
                {
                    pathname: "/admin/blogs",
                    query: credentials
                }
            }>
                <button>Back to Blogs Dashboard</button>
            </Link>

            <EditBlogForm 
                blogString={ blogString } 
                username={ credentials.username } 
                tokenId={ credentials.tokenId } 
            />

        </main>
    )

}