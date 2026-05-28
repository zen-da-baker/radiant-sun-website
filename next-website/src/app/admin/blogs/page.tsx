// Import Next components
import Link from "next/link";

// Import helper functions
import { getBlogPosts } from "@/helpers/blog-functions/getBlogPosts";

// Import helper functions
import { verifyPageAccess } from "@/helpers/login-server-functions/verifyPageAccess";

// Import data types
import { BlogPost } from "@/models/BlogPost";

/*
    This page is for viewing the existing blog posts. A post will have a button for editing
    and deleting a post. A different higher level button allows for the creation of a blog post.
*/
export default async function Blogs({
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

    const allBlogs: Array<any> = await getBlogPosts();

    const allBlogsUI: any = allBlogs.map( ( blog: BlogPost, index: number ) => {

        return (
            <div key={ index }>

                <h3>{ blog.title }</h3>

                <span>{ blog.author }</span>

                <span>{ blog.postDate }</span>

                <Link href={{
                    pathname: "/admin/blogs/edit-blog",
                    query: { username: credentials.username, tokenId: credentials.tokenId, postId: blog._id.toString() }
                }}>
                    Edit { blog.title }
                </Link>

            </div>
        )

    } )

    return (
        <main>

            <h1>Blogs</h1>

            <Link href={{
                pathname: "/admin",
                query: credentials
            }}>
                Back to Admin Panel
            </Link>

            <Link href={{
                pathname: "/admin/blogs/create-blog",
                query: credentials
            }}>
                Create Blog
            </Link>

            {
                allBlogsUI
            }

        </main>
    )
}