"use client";

import { useState } from "react";

interface Props {
  onSearch: (filter: string, role: string) => void;
}

export default function UserSearch({ onSearch }: Props) {
  const [filter, setFilter] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filter, role);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 mb-8"
    >
      <input
        type="text"
        placeholder=" ...جستجو "
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="flex-1 h-12 rounded-lg border border-gray-300 px-4 text-[#022959] placeholder:text-[#022959] text-right cursor-pointer"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="h-12 rounded-lg border border-gray-300 px-4 text-[#022959] cursor-pointer"
      >
        <option value="" className="text-[#022959]">
          همه نقش‌ها
        </option>
        <option value="ADMIN" className="text-[#022959]">
          مدیر
        </option>
        <option value="TEACHER" className="text-[#022959]">
          معلم
        </option>
      </select>

      <button
        type="submit"
        className="h-12 px-6 rounded-lg bg-[#022959] text-white cursor-pointer"
      >
        جستجو
      </button>
    </form>
  );
}
