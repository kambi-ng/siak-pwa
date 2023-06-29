import { useRef, useEffect } from "react";
import { kyWrapper } from "../utils";

let cachedSrc = "";

export function usePhoto() {
  const pfpRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (cachedSrc !== "") {
      pfpRef.current!.src = cachedSrc;
      return;
    }

    kyWrapper(`${import.meta.env.VITE_API_URL}/photo`)
      .blob()
      .then((blob) => {
        let img = URL.createObjectURL(blob);
        pfpRef.current!.src = img;
        cachedSrc = img;
      });
  }, []);

  return pfpRef;
}
