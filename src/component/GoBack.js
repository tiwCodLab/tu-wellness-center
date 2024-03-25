import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";

export default function GoBack() {
  const navigate = useNavigate();

  return (
    <div className="mt-4">
      <button
        className="flex items-center px-4 pb-4 text-teal-700"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        <FaChevronCircleLeft style={{ fontSize: "40px" }} />
      </button>
    </div>
  );
}
