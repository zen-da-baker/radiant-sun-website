// Import Next components
import Link from "next/link";

// Import helper functions
import { getBlogPosts } from "@/helpers/blog-functions/getBlogPosts";

// Import meta data
import { BlogPost } from "@/models/BlogPost";

/*
    This page is for the viewing of blog posts related to the game.
*/
export default async function AllBlogs() {

    // The database will be queried and display all of the blog posts so they can be opened with a link
    const blogs = await getBlogPosts();

    let blogsUI: any = <p>No blogs...</p>

    if ( blogs ){

        blogsUI = blogs.map( ( blog: any, index: number ) => {

            return (
                <div key={ index }>

                    <h2>{ blog.title }</h2>

                    <h3>{ blog.author }</h3>

                    <Link href={{
                        pathname: "/blog/post",
                        query: { postId: blog._id.toString() }
                    }}>
                        View { blog.title }
                    </Link>

                </div>
            )

        })

    }

    return (
        <main>

            <h1>Development Blogs</h1>

            {
                blogsUI
            }

        </main>
    )
}