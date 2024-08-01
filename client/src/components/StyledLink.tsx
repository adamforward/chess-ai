import { ComponentProps } from "react";
import { NavLink } from "react-router-dom";

const StyledLink = ({ ...props }: ComponentProps<typeof NavLink>) => {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        `
       text-lg font-bold text-slate-200 font-roboto underline-offset-4
        ${
          isPending
            ? "animate-pulse"
            : isActive
            ? "text-blue-300 underline"
            : ""
        }`
      }
      {...props}
    />
  );
};

export default StyledLink;
