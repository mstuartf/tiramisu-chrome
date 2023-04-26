import React from "react";
import { Link, useLocation } from "react-router-dom";
import H from "../atoms/H";
import IconButton from "../atoms/IconButton";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

export const NavBarItem = ({ to, text }: { to: string; text: string }) => {
  const { pathname } = useLocation();
  return (
    <li>
      <Link
        to={to}
        className={`inline-block py-1 text-center w-full h-full flex items-center justify-center border-b-2 px-2 ${
          pathname.includes(to)
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
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <H>Tiramisu</H>
        <IconButton to="/account">
          <Cog8ToothIcon />
        </IconButton>
      </div>
      <div className="border-b">
        <ul className="grid grid-cols-3 h-10">
          <NavBarItem to="/prospect" text="Scan profile" />
          <NavBarItem to="/templates" text="Templates" />
          <NavBarItem to="/tracking" text="Tracking" />
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
