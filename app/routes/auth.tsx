"use client";

import React, { useEffect, useRef } from "react";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import type { MetaFunction } from "react-router";
// 🛑 REMOVED: import tailwindcss from "tailwindcss"; // <-- This line was removed
export const meta: MetaFunction = () => [
  { title: "Resumind | Auth" },
  { name: "description", content: "Log onto your account" },
];

const auth = () => {

  const auth = usePuterStore((state) => state.auth);
  const isLoading = usePuterStore((state) => state.isLoading);
  const puterReady = usePuterStore((state) => state.puterReady);
  const init = usePuterStore((state) => state.init);

  const navigate = useNavigate();
  const location = useLocation();
  const next= location.search.split('next=')[1];
 
  const hasRedirected = useRef(false);
  const redirectTo = (location.state as { from: string } | null)?.from || "/";


  useEffect(() => {

    init();
  }, [init]);


  useEffect(() => {

    if (
      !hasRedirected.current &&
      puterReady &&
      !isLoading &&
      auth.isAuthenticated &&
      location.pathname !== redirectTo
    ) {
      hasRedirected.current = true;
      navigate(redirectTo, { replace: true });
    }
  }, [
    auth.isAuthenticated,
    isLoading,
    navigate,
    redirectTo,
    puterReady,
    location.pathname,
    next
  ]);
  

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1> Welcome </h1>
            <h2> Log in to continue your Job journey </h2>
          </div>
          <div>
            {isLoading ? (
   
              <button className="auth-button animate-pulse"> 
                <p>Signing you in ....</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className='auth-button' onClick={auth.signOut}>Log Out</button>
                ) : (
              
                  <button className='auth-button' onClick={auth.signIn}><p>Signing you in....</p></button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default auth;