import { Calendar, Exam, HouseSimple } from "@phosphor-icons/react";
import { NavLink, Outlet } from "react-router-dom";
import "./globals.css";
import { getOrRedirect } from "./utils";
import { UserInfo } from "./interface";
import clsx from "clsx";

export async function userLoader() {
  return getOrRedirect<UserInfo>(`${import.meta.env.VITE_API_URL}/me`, false);
}

function App() {
  return (
    <div className="h-screen mx-auto max-w-lg flex flex-col justify-between">
      <div className="overflow-y-scroll p-4">
        <Outlet />
      </div>

      <div className="w-full bg-primary-0 p-1 px-3 flex flex-row gap-2 items-center justify-around text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            clsx(
              "flex flex-col gap-1 items-center p-2 rounded-md w-full",
              "hover:bg-primary-1",
              isActive && "bg-primary-1"
            )
          }
        >
          <HouseSimple size={18} weight="bold" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/score"
          className={({ isActive }) =>
            clsx(
              "flex flex-col gap-1 items-center p-2 rounded-md w-full",
              "hover:bg-primary-1",
              isActive && "bg-primary-1"
            )
          }
        >
          <Exam size={18} weight="bold" />
          <span>Nilai</span>
        </NavLink>

        <NavLink
          to="/schedule"
          className={({ isActive }) =>
            clsx(
              "flex flex-col gap-1 items-center p-2 rounded-md w-full",
              "hover:bg-primary-1",
              isActive && "bg-primary-1"
            )
          }
        >
          <Calendar size={18} weight="bold" />
          <span>Jadwal</span>
        </NavLink>
      </div>
    </div>
  );
}

export default App;
