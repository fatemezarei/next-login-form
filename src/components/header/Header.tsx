"use client";

import { useState } from "react";
import UserDropdown from "./UserDropdown";
import SchoolDropdown from "./SchoolDropdown";

type OpenPanel = "user" | "school" | null;

export default function Header() {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="font-bold text-lg text-[#022959]">پنل مدیریت</h1>

        <div className="flex gap-4 relative">
          <button
            onClick={() =>
              setOpenPanel((prev) => (prev === "user" ? null : "user"))
            }
            className="px-4 py-2 rounded-lg bg-[#EFF5FF] text-[#022959] font-medium cursor-pointer"
          >
            اطلاعات کاربر
          </button>
          <UserDropdown open={openPanel === "user"} />

          <button
            onClick={() =>
              setOpenPanel((prev) => (prev === "school" ? null : "school"))
            }
            className="px-4 py-2 rounded-lg bg-[#EFF5FF] text-[#022959] font-medium cursor-pointer"
          >
            اطلاعات مدرسه
          </button>
          <SchoolDropdown open={openPanel === "school"} />
        </div>
      </div>
    </header>
  );
}
