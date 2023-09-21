import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <header className="bg-neutral-600 flex justify-center">
      <nav className="container flex justify-between items-center mt-4 mb-2">
        <div>
          <Link href="/" className="logo">
            Logo
          </Link>
        </div>
        <menu className="flex items-center gap-4">
          <li>
            <Link href="/api/auth/signin" className="navLink">
              Log in
            </Link>
          </li>
          <li>
            <Link href="/api/auth/signout" className="navLink">
              Log out
            </Link>
          </li>
          <li>
            <Link href="/server" className="navLink">
              Server
            </Link>
          </li>
          <li>
            <Link href="/client" className="navLink">
              Client
            </Link>
          </li>
          <li>
            <Link href="/extra" className="navLink">
              Extra
            </Link>
          </li>
        </menu>
      </nav>
    </header>
  );
};

export default NavBar;
