import { cn } from "@/lib/utils";
import { useState } from "react";

export const BlueGlowBackground = () => {
  const [count, setCount] = useState(0);

  return (
   <div className="min-h-screen w-full relative bg-black">
  {/* Soft Blue Glow */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(circle at center, #3B82F6 0%, transparent 70%)
      `,
      opacity: 0.8,
      mixBlendMode: "multiply",
    }}
  />
     {/* Your Content/Components */}
</div>
  );
};
