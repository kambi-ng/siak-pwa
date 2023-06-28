import { Calendar, Exam, HouseSimple } from "@phosphor-icons/react";
import { NavLink, Outlet } from "react-router-dom";
import "./globals.css";
import clsx from "clsx";
import BottomBar from "./components/BottomBar";

function App() {
  return (
    <div className="h-screen mx-auto max-w-lg flex flex-col justify-between">
      <div className="overflow-y-auto self-stretch h-[100%] bg-gray-100">
        <Outlet />
      </div>

      <BottomBar />
    </div>
  );
}

export default App;
