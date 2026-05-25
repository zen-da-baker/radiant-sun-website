"use client"

// Import React components
import { useEffect } from "react"

/*
    This is a quiet client component on all admin pages that will redirect the user to the 
    login page if access was not granted.
*/
export function VerifyAccess(
    { verifyPageAccess } 
    :
    { verifyPageAccess: ( username: string | null, tokenId: string | null ) => Promise<void> }
) {

    useEffect( () => {

        // The username and token id are captured from local storage on each page load
        let username = localStorage.getItem("radiant-sun-username");

        let tokenId = localStorage.getItem("radiant-sun-access-token");

        // The verify access helper function will always run regardless of 
        verifyPageAccess( username, tokenId );

    }, [])

    return (
        <></>
    )

}