import { ring2 } from 'ldrs'

// Register the ldrs component
ring2.register()
// Create a new React component named Load
export default function Load() {
  return (
    <div>
      <l-ring-2
        size="40"
        stroke="5"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="0.8"
        color="black"
      ></l-ring-2>
    </div>
  );
}
