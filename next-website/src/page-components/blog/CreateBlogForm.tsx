"use client"

// Import Next components
import { useSearchParams } from "next/navigation";

// Import helper functions
import { submitBlogFile } from "@/helpers/blog-functions/submitBlogFile";

export function CreateBlogForm() {

    const params = useSearchParams();

    const username = params.get("username");

    const tokenId = params.get("tokenId");

    return (
        <form action={ submitBlogFile }>

            <label>
                Title
                <input name="title" type="text" />
            </label>

            <label>
                Author
                <input name="author" type="text" />
            </label>

            <label>
                Content Text
                <textarea name="text-content"></textarea>
            </label>

            <label>
                Content File
                <input name="file" type="file" accept=".md" />
            </label>

            <input name="username" type="hidden" value={ username ? username : "" } />

            <input name="tokenId" type="hidden" value={ tokenId ? tokenId : "" } />

            <button>Submit</button>

        </form>
    )
}