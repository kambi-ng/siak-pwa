import React from "react";
import CaptionBox from "../components/general/CaptionBox";
import { GithubLogo } from "@phosphor-icons/react";

export default function About() {
  return (
    <div className="flex flex-col gap-1 items-center justify-center h-[100%] p-4">
      <h1 className="font-bold text-xl">SIAK-PWA</h1>
      <p className="text-center">Frontend eksperimen untuk SIAK-NG </p>
      <p className="-mt-1 text-center">Dibuat oleh Kambing CSUI</p>
      <img
        src="/kambing.jpg"
        width={200}
        height={200}
        className="rounded-full"
      />

      <hr className="w-full h-1 border-t border-black my-4" />

      <a
        href="https://github.com/kambi-ng/siak-pwa"
        target="_blank"
        className="w-full"
      >
        <CaptionBox
          content="Frontend"
          label="GitHub"
          icon={<GithubLogo size={48} />}
        />
      </a>
      <a
        href="https://github.com/kambi-ng/siak-rest"
        target="_blank"
        className="w-full mt-1"
      >
        <CaptionBox
          content="Backend"
          label="GitHub"
          icon={<GithubLogo size={48} />}
        />
      </a>
    </div>
  );
}
