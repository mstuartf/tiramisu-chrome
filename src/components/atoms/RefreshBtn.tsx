import React, { ButtonHTMLAttributes } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import IconButton from "./IconButton";

const RefreshBtn = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <IconButton {...props}>
    <ArrowPathIcon />
  </IconButton>
);

export default RefreshBtn;
