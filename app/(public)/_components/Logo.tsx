import React from "react";

function Logo() {
  return (
    <span className="text-primary hover:text-primary/90 font-extrabold text-2xl tracking-tight select-none flex items-center gap-1">
      {" "}
      Talim
      <span className="inline-block size-3 bg-primary rounded-full align-middle shadow-md" />
    </span>
  );
}

export default Logo;
