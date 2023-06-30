import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function RootComponent() {
  const error = useRouteError();

  let message = "An error has occured!";
  if (isRouteErrorResponse(error)) {
    message = error.data;
    if (error.status === 404) {
      message = "Page not found!";
    }

    if (error.status >= 500) {
      message = "Server is down, try again later?";
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center p-4 bg-gray-100">
      <strong className="font-bold text-lg">{message}</strong>
      <p className="text-sm">Try contacting ren if it is unexpected.</p>
    </div>
  );
}
