import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBarItem = ({ to, text }: { to: string; text: string }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={to}
      className={`inline-block p-4 w-full flex items-center justify-center border-b-2 ${
        to === pathname
          ? "border-blue-600 text-blue-600"
          : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300"
      }`}
    >
      {text}
    </Link>
  );
};

const NavBar = () => {
  return (
    <div className="border-b">
      <ul className="grid grid-cols-2">
        <li>
          <NavBarItem to="/prospect" text="Prospects" />
        </li>
        <li>
          <NavBarItem to="/settings" text="Settings" />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;