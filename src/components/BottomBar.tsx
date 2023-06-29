import {
  Calendar,
  Exam,
  HouseSimple,
  Info,
  UserCircle,
} from "@phosphor-icons/react";
import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

const PATHS = [
  {
    href: "/",
    label: "Home",
    icon: <HouseSimple size={18} weight="bold" />,
  },
  {
    href: "/score",
    label: "Nilai",
    icon: <Exam size={18} weight="bold" />,
  },
  {
    href: "/schedule",
    label: "Jadwal",
    icon: <Calendar size={18} weight="bold" />,
  },
  {
    href: "/profile",
    label: "Profil",
    icon: <UserCircle size={18} weight="bold" />,
  },
  {
    href: "/about",
    label: "Info",
    icon: <Info size={18} weight="bold" />,
  },
];

export default function BottomBar() {
  return (
    <div className="w-full bg-primary-0 p-1 px-3 flex flex-row gap-2 items-center justify-around text-sm">
      {PATHS.map((p) => (
        <NavLink
          to={p.href}
          className={({ isActive }) =>
            clsx(
              "flex flex-col gap-1 items-center p-2 rounded-md w-full",
              "hover:bg-primary-1",
              isActive && "bg-primary-1"
            )
          }
        >
          {p.icon}
          <span>{p.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
