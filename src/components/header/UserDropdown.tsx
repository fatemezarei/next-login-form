"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { UserInfoResponse } from "@/types/users";

interface Props {
  open: boolean;
}

export default function UserDropdown({ open }: Props) {
  const { data, isLoading, error } = useQuery<UserInfoResponse>({
    queryKey: ["user-info"],
    enabled: open,
    queryFn: async () =>
      (await api.get<UserInfoResponse>("/user/userInfo")).data,
  });

  const user = data?.result;

  if (!open) return null;

  return (
    <div className="absolute left-0 mt-10 w-72 bg-white rounded-xl shadow-lg border p-4 text-right z-50">
      {isLoading && <p className="text-center text-sm">در حال بارگذاری...</p>}
      {error && (
        <p className="text-center text-sm text-red-600">
          خطا در دریافت اطلاعات
        </p>
      )}
      {user && (
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-base text-[#022959]">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-[#022959]">نقش: {user.role}</p>
          <p className="text-[#022959]">موبایل: {user.mobile}</p>
          <p className="text-[#022959]">
            کد ملی: {user.social_security_number}
          </p>
          {user.address && (
            <p className="text-[#022959]">آدرس: {user.address}</p>
          )}
          {user.email && <p className="text-[#022959]">ایمیل: {user.email}</p>}
        </div>
      )}
    </div>
  );
}
