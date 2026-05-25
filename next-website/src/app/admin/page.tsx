// Import Next packages
import Link from "next/link";

// Import helper functions
import { escapeStrings } from "@/helpers/escapeStrings";
import { verifyPageAccess } from "@/helpers/login-server-functions/verifyPageAccess";

/*
    This page is for the viewing of messages submitted to the website and 
    for the creation of blog posts.
    It expects a query parameter to carry the credentials of the user. If the user
    is not authorized, they will be redirected to the login page automatically.
*/
export default async function Admin({
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

    const username = escapeStrings( credentials.username );

    return (
        <main>

            <h1>Welcome to the Admin panel { username }</h1>

            <p>Access the features below.</p>

            <Link href={
                {
                    pathname: "/admin/messages",
                    query: credentials
                }
            }>
                View Messages
            </Link>

            <Link href={
                {
                    pathname: "/admin/blogs",
                    query: credentials
                }
            }>
                View Blogs
            </Link>

        </main>
    )


}