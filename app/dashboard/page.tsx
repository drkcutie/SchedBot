'use client';

import { useSession, signOut } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();

    return (
        <div>
            {session ? (
                <>
                    <h1>Hello {session.user}</h1>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <p>No user found</p>
            )}
        </div>
    );


}