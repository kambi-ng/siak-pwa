import {
  Calendar,
  CircleNotch,
  Exam,
  HouseSimple,
} from "@phosphor-icons/react";
import { NavLink, Outlet, useNavigation } from "react-router-dom";
import "./globals.css";
import clsx from "clsx";
import BottomBar from "./components/BottomBar";

function App() {
  const navigation = useNavigation();

  return (
    <div className="h-screen mx-auto max-w-lg flex flex-col justify-between">
      <div className="overflow-y-auto self-stretch h-[100%] bg-gray-100">
        {navigation.state != "loading" ? (
          <Outlet />
        ) : (
          <div className="flex items-center justify-center h-[100%]">
            <CircleNotch size={64} className="text-primary-0 animate-spin" />
          </div>
        )}
      </div>

      <BottomBar />
    </div>
  );
}

export default App;
