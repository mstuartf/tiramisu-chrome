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
        className={`inline-block font-bold py-2 px-4 rounded-full hover:bg-blue-600 hover:text-white ${
          pathname.includes(to)
            ? "bg-gray-200 text-gray-700"
            : "bg-gray-50 text-gray-600"
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
      <div className="flex justify-between items-center mb-2">
        <H>Tiramisu</H>
        <IconButton to="/account">
          <Cog8ToothIcon />
        </IconButton>
      </div>
      <ul className="grid grid-cols-3">
        <NavBarItem to="/prospect" text="Scan profile" />
        <NavBarItem to="/templates" text="Templates" />
        <NavBarItem to="/tracking" text="Tracking" />
      </ul>
    </div>
  );
};

export default NavBar;
