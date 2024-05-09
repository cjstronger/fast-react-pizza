import React from "react";

export default function LoadingIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm transition-all duration-100">
      <div className="loader"></div>
    </div>
  );
}
