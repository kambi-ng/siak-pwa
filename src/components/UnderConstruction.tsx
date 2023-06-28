import { Barricade } from "@phosphor-icons/react";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 my-auto h-[100%]">
      <Barricade size={72} weight="bold" />
      <p>Sorry, this feature is under construction!</p>
    </div>
  );
}
