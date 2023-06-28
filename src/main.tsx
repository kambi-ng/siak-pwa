import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home";
import Login from "./routes/login";
import { Toaster } from "react-hot-toast";
import Score from "./routes/score";
import { userLoader, homeLoader, historyLoader } from "./components/loaders";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Login />,
  },
  {
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
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
