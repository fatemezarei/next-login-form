"use client";

import { User } from "@/types/users";

interface Props {
  user: User;
  onClose: () => void;
}

export default function UserInfoModal({ user, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative text-right">
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 text-xl"
        >
          ✕
        </button>

        <div className="space-y-2">
          <h2 className="text-xl font-bold mb-4 text-[#022959]">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-[#022959]">
            کد ملی: {user.social_security_number}
          </p>
          <p className="text-[#022959]">موبایل: {user.mobile}</p>
          <p className="text-[#022959]">نقش: {user.rolePersian}</p>
          <p className="text-[#022959]">وضعیت: {user.isActiveDescription}</p>
          <p className="text-[#022959]">تاریخ ثبت: {user.createdAtPension}</p>
          <p className="text-[#022959]">
            آخرین ویرایش: {user.updatedAtPersian}
          </p>
        </div>
      </div>
    </div>
  );
}
