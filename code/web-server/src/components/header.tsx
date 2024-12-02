"use client";
import React from "react";
import { type FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import "~/styles/globals.css";
import "~/styles/header.css";
import { useToast } from "~/components/toast";

import { type SessionData } from "~/app/api/lib";

interface HeaderProps {
  user: SessionData | null;
}

const Header: FC<HeaderProps> = ({ user }) => {
  const router = useRouter();
  const { showToast } = useToast();

  return (
    <>
      <header className="header">
        {/* Logo Section */}
        <div className="logo">
          <Link href="https://www.usu.edu/" className="logoImage">
            <img
              src="/images/utah-state-logo-350.png"
              alt="Logo"
              className="logoImage"
            />
          </Link>
          <div className="separator"></div>

          <div className="textContainer">
            <Link href="/" className="collegeText roboto-stretch">
              IDEA Qualitative Analysis
            </Link>
            <Link href="/" className="logoText roboto-stretch">
              College of Science
            </Link>
          </div>
        </div>
      </header>
      <nav className="menu roboto-stretch">
        <ul className="menuList">
          <li className="menuItem">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="menuItem">
            <Link href="/chat">AI Chat</Link>
          </li>
          <li className="menuItem">
            {user ? (
              <>
                <a
                  onClick={async () => {
                    "use client";
                    await fetch("/api/logout");
                    showToast("Logged out successfully!", "success");
                    router.push("/login");
                    router.refresh();
                  }}
                >
                  Logout
                </a>
                <span className="menuItem">Welcome, {user.preferredName}!</span>
              </>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
