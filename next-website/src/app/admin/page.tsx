// Import Next packages
import Link from "next/link";
import { redirect } from "next/navigation";

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

        redirect("/login");

    }

    const username = escapeStrings( credentials.username );

    return (
        <main>

            <h1>Welcome to the Admin panel { username }</h1>

            <div className="text-container">

                <p>
                    Use the buttons below to view messages submitted to the website. 
                    Or use the other button to review existing blog posts, edit them, or create a new blog post.
                </p>

                <div className="flex space-around">

                    <Link href={
                        {
                            pathname: "/admin/messages",
                            query: credentials
                        }
                    }>
                        <button>View Messages</button>
                    </Link>

                    <Link href={
                        {
                            pathname: "/admin/blogs",
                            query: credentials
                        }
                    }>
                        <button>View Blogs</button>
                    </Link>

                </div>

            </div>

        </main>
    )


}