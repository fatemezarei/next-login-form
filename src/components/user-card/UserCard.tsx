"use client";

import { User } from "@/types/users";

interface Props {
  user: User;
  onClick: (userId: number) => void;
}

export default function UserCard({ user, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(user.id)}
      className="cursor-pointer bg-[#EFF5FF] rounded-lg shadow hover:shadow-lg transition"
    >
      <div className="p-4 flex flex-col gap-2 text-right">
        <h2 className="text-lg font-semibold text-[#022959]">
          {user.firstName} {user.lastName}
        </h2>

        <p className="text-sm text-[#022959]">
          کد ملی: {user.social_security_number}
        </p>
        <p className="text-sm text-[#022959]">موبایل: {user.mobile}</p>
        <p className="text-sm text-[#022959]">نقش: {user.rolePersian}</p>
        <p className="text-sm text-[#022959]">
          وضعیت: {user.isActiveDescription}
        </p>
      </div>
    </div>
  );
}
