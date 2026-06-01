// Import Next components
import Link from "next/link";

// Import helper functions
import { getBlogPosts } from "@/helpers/blog-functions/getBlogPosts";

// Import meta data
import { monthList } from "@/helpers/monthList";

/*
    This page is for the viewing of blog posts related to the game.
*/
export default async function AllBlogs() {

    // The database will be queried and display all of the blog posts so they can be opened with a link
    const blogs = await getBlogPosts();

    let blogsUI: any = <p>No blogs...</p>

    if ( blogs ){

        blogsUI = blogs.map( ( blog: any, index: number ) => {

            let blogDate = new Date( blog.postDate );

            let day = blogDate.getDate();

            let monthIndex = blogDate.getMonth();

            let month = monthList[ monthIndex ];

            let year = blogDate.getFullYear();

            return (
                <div key={ index } className="card" style={ 
                    { 
                        margin: "1rem auto", 
                        backgroundColor: "hsl(1, 0%, 90%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around"
                    }
                }>

                    <h2>{ blog.title }</h2>

                    <h3>{ blog.author } </h3>

                    <p>Posted: { day } { month }, { year }</p>

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