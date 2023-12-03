import { trefoil } from "ldrs";

trefoil.register();
export default function Loadtwo() {
  return (
    <div>
      <l-trefoil
        size="40"
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.4"
        color="black"
      ></l-trefoil>
    </div>
  );
}
