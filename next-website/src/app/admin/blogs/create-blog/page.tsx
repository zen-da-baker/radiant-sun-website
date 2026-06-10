// Import Next components
import Link from "next/link";

// Import helper functions
import { verifyPageAccess } from "@/helpers/login-server-functions/verifyPageAccess";

// Import components
import { CreateBlogForm } from "@/page-components/blog/CreateBlogForm";

/*
    This page is for the creation of a blog post. The query parameters of the page
    are expected to be the credentials of the user.
*/

// Search parameters are the argument of the page component with the fixed type below
export default async function CreateBlog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    // Credentials are the query paremeter
    const credentials = await searchParams;

    // The verification of the query parameter credentials takes place
    const verified = await verifyPageAccess( credentials.username, credentials.tokenId );

    // If the verification could not take place, the error page below will render
    if ( !verified || typeof credentials.username !== "string" ) {

        return (
            <main>

                <h1>Not Authorized!</h1>

                <p>You are not authorized to access this page. Please login.</p>

                <Link href="/login">Login</Link>

            </main>
        )

    }

    // Below, the page for creating a post is shown
    return (
        <main>

            <h1>Create Blog</h1>

            <Link href={
                {
                    pathname: "/admin/blogs",
                    query: credentials
                }
            }>
                <button>Back to Blogs Dashboard</button>
            </Link>

            <div className="text-container">

                <p>
                    Note: The blog body text will use markdown formatting to display all styling. 
                    For a guide to how this works, follow this article on the syntax. 
                    <a href="https://www.markdownguide.org/" target="_blank" rel="noreferrer">Markdown Syntax</a>
                </p>

            </div>

            <CreateBlogForm />

        </main>
    )

}