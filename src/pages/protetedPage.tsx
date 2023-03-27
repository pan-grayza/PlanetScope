import React from 'react'

export default function protetedPage() {
    if (typeof window === 'undefined') return null

    return (
        <>
            <h1>Protected Page</h1>
            <p>You can view this page because you are signed in.</p>
        </>
    )
}
