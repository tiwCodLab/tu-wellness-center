import React from "react";
import { Outlet } from "react-router-dom";

export default function HistoryLayout() {
  return (
    <>
      <nav className=" p-2 rounded font-prompt">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-base font-extrabold text-green-800 name-tulp">
            ประวัติการทำรายการ
          </h1>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
