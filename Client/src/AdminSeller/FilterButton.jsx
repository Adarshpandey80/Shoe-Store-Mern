import React from "react";

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-medium border transition
        ${
          active
            ? "bg-black text-white border-black"
            : "bg-white text-slate-700 hover:bg-slate-100"
        }`}
    >
      {label}
    </button>
  );
}

export default FilterButton;
