"use client"

// Import Next components
import { useSearchParams } from "next/navigation";

// Import React components
import { useState } from "react"

// Import helper functions
import { submitBlogFile } from "@/helpers/blog-functions/submitBlogFile";

export function CreateBlogForm() {

    const params = useSearchParams();

    const username = params.get("username");

    const tokenId = params.get("tokenId");

    const [ title, setTitle ] = useState<string>("");
    const [ author, setAuthor ] = useState<string>("");

    let file: any  = "";

    async function handleTitle( event: any ) {

        setTitle( event.target.value );

    }

    async function handleAuthor( event: any ) {

        setAuthor( event.target.value );

    }

    async function handleFile( event: any ) {

        file = event.target.files[0];

        console.log( file );

    }

    async function handleSubmit() {

        if ( typeof username === "string" && typeof tokenId === "string" && file !== null ) {

            // submitBlogFile( username, tokenId, title, author, file );

            setTitle("");

            setAuthor("");

        }

    }

    return (
        <form action={ submitBlogFile }>

            <label>
                Title
                <input name="title" type="text" onChange={ handleTitle } />
            </label>

            <label>
                Author
                <input name="author" type="text" onChange={ handleAuthor } />
            </label>

            <label>
                Content Text
                <textarea name="text-content"></textarea>
            </label>

            <label>
                Content File
                <input name="file" type="file" onChange={ handleFile } accept=".md" />
            </label>

            <input name="username" type="hidden" value={ username ? username : "" } />

            <input name="tokenId" type="hidden" value={ tokenId ? tokenId : "" } />

            <button>Submit</button>

        </form>
    )
}