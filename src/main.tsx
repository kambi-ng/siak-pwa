import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home";
import Login from "./routes/login";
import { Toaster } from "react-hot-toast";
import Score from "./routes/score";
import {
  userLoader,
  homeLoader,
  historyLoader,
  scoreLoader,
  profileLoader,
} from "./components/loaders";
import UnderConstruction from "./components/UnderConstruction";
import Detail from "./routes/detail";
import Profile from "./routes/profile";
import { CircleNotch } from "@phosphor-icons/react";
import About from "./routes/about";
import ErrorComponent from "./components/ErrorComponent";

const router = createBrowserRouter([
  {
    path: "/auth",
    errorElement: <ErrorComponent />,
    element: <Login />,
  },
  {
    errorElement: <ErrorComponent />,
    path: "/",
    loader: userLoader,
    id: "user",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "score",
        element: <Score />,
        loader: historyLoader,
        id: "history",
      },
      {
        path: "schedule",
        element: <UnderConstruction />,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/score/:classId",
    loader: scoreLoader,
    errorElement: <ErrorComponent />,
    element: <Detail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider
      router={router}
      fallbackElement={
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <CircleNotch size={64} className="animate-spin text-primary-0" />
        </div>
      }
    />
  </React.StrictMode>
);
