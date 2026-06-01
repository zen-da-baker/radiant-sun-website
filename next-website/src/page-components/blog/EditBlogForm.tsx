"use client"

// Import Next components
import { redirect } from "next/navigation";

// Import React components
import { useState } from "react";

// Import helper functions
import { saveBlogEdits } from "@/helpers/blog-functions/saveBlogEdits";
import { deleteBlog } from "@/helpers/blog-functions/deleteBlog";

// Import data types
import { BlogPost } from "@/models/BlogPost";

// Import styles
import "../../../styles/form.css";

export function EditBlogForm( { blogString, username, tokenId } : { blogString: string, username: string, tokenId: string } ) {

    const blog: BlogPost = JSON.parse( blogString )

    const [ title, setTitle ] = useState<string>( blog.title );
    const [ author, setAuthor ] = useState<string>( blog.author );
    const [ blogContents, setBlogContents ] = useState<string>( blog.contents );
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>( false );

    function handleTitleEdit( event: any ) {

        setTitle( event.target.value );

    }

    function handleAuthorEdit( event: any ) {

        setAuthor( event.target.value );

    }

    function handleBlogContentsEdit( event: any ) {

        setBlogContents( event.target.value );

    }

    // Submit the blog to the server for persistence
    async function submitEdits() {

        console.log( blog._id );

        // The status of the blog save is stored as a boolean
        const submitted = await saveBlogEdits( username, tokenId, blog._id, title, author, blogContents );

        // If the save was successful, the user is redirected back to the dashboard
        if ( submitted ) {

            redirect( "/admin/blogs?username=" + username + "&tokenId=" + tokenId );

        }

    }

    function firstDeleteStep() {

        // Toggle the modal
        setShowDeleteModal( prevState => !prevState );

    }

    async function confirmDeletion() {

        deleteBlog( username, tokenId, blog._id );

    }

    return (
        <div className="form">

            <div style={ showDeleteModal ? { display: "block" } : { display: "none" } }>

                <button onClick={ confirmDeletion }>Confirm deleting { title }?</button>

                <button onClick={ firstDeleteStep }>Cancel</button>

            </div>

            <button onClick={ firstDeleteStep }>Delete Blog Post</button>

            <label>
                Title
                <input type="text" value={ title } onChange={ handleTitleEdit } />
            </label>

            <label>
                Author
                <input type="text" value={ author } onChange={ handleAuthorEdit } />
            </label>

            <textarea defaultValue={ blogContents } onChange={ handleBlogContentsEdit }>

            </textarea>

            <button onClick={ submitEdits }>Submit Changes</button>

        </div>
    )

}