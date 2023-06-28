import clsx from "clsx";
import React from "react";

export default function CaptionBox({
  content,
  label,
  className,
}: {
  content: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-1 rounded-md border border-black font-bold p-2 w-full bg-gray-200",
        className
      )}
    >
      <strong className="text-xl">{content}</strong>
      <span className="text-xs">{label}</span>
    </div>
  );
}
