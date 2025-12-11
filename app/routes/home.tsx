<<<<<<< HEAD
"use client";
import type { MetaFunction } from "react-router";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants/index";
import ResumeCard from "~/components/ResumeCard";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useLocation } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Resume" },
    { name: "description", content: "Smart feedback" },
  ];
};

export default function Home() {


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
  
      if (
        !hasRedirected.current &&
        puterReady &&
        !isLoading &&
        !auth.isAuthenticated &&
        location.pathname !== redirectTo
      ) {
        hasRedirected.current = true;
        navigate("/auth?next=/");
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
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

    <section className="main-section">
      <div className="page-heading ">
        <h1>Track your Application and Resume Ratings</h1>
        <h2>Review your submissions and check AI-Powered feedback</h2>
      </div>
    
      {resumes.length > 0 && (
        <div className="resume-section flex flex-wrap justify-center w-[80%] mx-auto gap-6">
          {resumes.map((resume: any) => (
            <ResumeCard key={resume.id} {...resume} />
          ))}
        </div>
      )}
    </section>
    </main>
  );
=======
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
>>>>>>> 444b805647ffab956e52deb8331e273562d8da2c
}
