import React from "react";
import { Link, useLocation } from "react-router-dom";

export const NavBarItem = ({ to, text }: { to: string; text: string }) => {
  const { pathname } = useLocation();
  return (
    <li>
      <Link
        to={to}
        className={`inline-block py-1 text-center w-full h-full flex items-center justify-center border-b-2 px-2 ${
          to === pathname
            ? "border-blue-600 text-blue-600"
            : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300"
        }`}
      >
        {text}
      </Link>
    </li>
  );
};

const NavBar = () => {
  return (
    <div className="border-b">
      <ul className="grid grid-cols-3 h-10">
        <NavBarItem to="/prospect" text="Scan profile" />
        <NavBarItem to="/templates" text="Message templates" />
        <NavBarItem to="/account" text="My account" />
      </ul>
    </div>
  );
};

export default NavBar;
