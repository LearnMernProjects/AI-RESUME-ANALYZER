"use client";

import React from "react";
import { useNavigate } from "react-router-dom"; // Use react-router-dom if that's what you are using
import { usePuterStore } from "~/lib/puter";

// Assuming you have other imporsts like your Navbar, layouts, etc.

export default function dashboard() {
    const auth = usePuterStore((state) => state.auth);
    const navigate = useNavigate();

    const handleSignOut = () => {
        
        auth.signOut();
        
        
        navigate("/auth", { replace: true });
    };

    return (
        <main className="bg-white min-h-screen">
       

            <section className="p-10">
                <h1 className="text-3xl font-bold mb-6">dashboard Overview</h1>
                
                {/* Your main dashboard content goes here */}
                {/* ... */}
                
                <div className="mt-10 pt-4 border-t border-gray-200">
                    <p className="mb-4 text-sm text-gray-600">
                        Need to end your session?
                    </p>
                    {/* The Sign Out Button */}
                    <button 
                        onClick={handleSignOut}
                        className='bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md' 
                    >
                        Sign Out and Go to Auth Page
                    </button>
                </div>
            </section>
        </main>
    );
}