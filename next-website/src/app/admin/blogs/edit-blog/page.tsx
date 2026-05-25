// Import Next components
import Link from "next/link";

// Import helper functions
import { verifyPageAccess } from "@/helpers/login-server-functions/verifyPageAccess";

/*
    This page is for editing an existing blog post. The query parameter is expected to be the credentials 
    of the user as well as the ID of the blog post to be edited.
*/
export default async function EditBlog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const credentials = await searchParams;

    const verified = await verifyPageAccess( credentials.username, credentials.tokenId );

    if ( !verified || typeof credentials.username !== "string" ) {

        return (
            <main>

                <h1>Not Authorized!</h1>

                <p>You are not authorized to access this page. Please login.</p>

                <Link href="/login">Login</Link>

            </main>
        )

    }

    return (

        <main>

            <h1>Edit Blog</h1>

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