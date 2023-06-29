import clsx from "clsx";
import React from "react";

export default function CaptionBox({
  content,
  label,
  className,
  icon,
}: {
  content: string;
  label: string;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "flex flex-row gap-4 items-center",
        "rounded-md border border-black font-bold p-2 w-full bg-gray-200",
        className
      )}
    >
      {icon}
      <div className="flex flex-col gap-1">
        <strong className="text-xl">{content}</strong>
        <span className="text-xs">{label}</span>
      </div>
    </div>
  );
}
