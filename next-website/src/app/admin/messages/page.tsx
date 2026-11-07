// Import Next components
import Link from "next/link";

// Import helper functions
import { verifyPageAccess } from "@/helpers/login-server-functions/verifyPageAccess";
import { getMessages } from "@/helpers/message-server-functions/getMessages";

// Import data models
import { FeedbackMessage } from "@/models/FeedbackMessage";

// Import components
import { MessageView } from "@/page-components/admin/MessageView";

/*
    This page is a protected admin page for viewing and deleting messages left
    on the website. The user will be verified first then the display of the page will
    allow messages to be viewed after veification is passed.
*/
export default async function Messages({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    // First, the user is authenticated and if not authenticated, an unauthorized warning is shown
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

    // By this point, the user had been authenticated and the message display can begin
    const allMessages: Array<any> | null = await getMessages();

    let messageComponents: any = <p>No mesages to display...</p>

    // If there are messages, they are displayed as individual components
    if ( allMessages !== null ) {

        // The messages would have already had their characters escaped on submission so they do not need to do so here
        messageComponents = allMessages.map( ( message: FeedbackMessage, index: number ) => {

            const messageString = JSON.stringify( message );

            return (
                <div key={ index }>
                    <MessageView messageString={ messageString } />
                </div>
            )

        })

    }

    return (
        <main>

            <h1>Messages</h1>

            <Link href={{
                pathname: "/admin",
                query: credentials
            }}>
                <button>Back to Admin Panel</button>
            </Link>

            <h2 style={ { textAlign: "center" } }>Stored Messages</h2>

            <div className="gallery">
            {
                messageComponents
            }
            </div>

        </main>
    )
}