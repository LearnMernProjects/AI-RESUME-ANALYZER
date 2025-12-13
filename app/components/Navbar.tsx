"use client";

import React from 'react'
import {Link, useNavigate} from "react-router"
import { usePuterStore } from '~/lib/puter';

const Navbar = () => {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/", { replace: true });
  };

  return (
     <nav className="navbar flex items-center justify-between">
          <Link to="./">
            <p className="text-2xl font-bold text-gradient">Resumind</p>
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="./upload">
              <p className="primary-button w-fit">Upload Resume</p>
            </Link>
            {auth.isAuthenticated && (
              <button 
                onClick={handleLogout}
                className="primary-button w-fit bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            )}
          </div>
     </nav>
  )
}

export default Navbar
