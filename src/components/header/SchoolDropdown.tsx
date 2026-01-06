"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { SchoolInfoResponse } from "@/types/school";

interface Props {
  open: boolean;
}

export default function SchoolDropdown({ open }: Props) {
  const { data, isLoading, error } = useQuery<SchoolInfoResponse>({
    queryKey: ["school-info"],
    enabled: open,
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/school/info`;
      const response = await api.get<SchoolInfoResponse>(url);
      return response.data;
    },
  });

  const school = data?.result;

  if (!open) return null;

  return (
    <div className="absolute left-0 mt-3 w-96 bg-white rounded-xl shadow-lg border p-4 text-right z-50">
      {isLoading && <p className="text-center text-sm">در حال بارگذاری...</p>}
      {error && (
        <p className="text-center text-sm text-red-600">
          خطا در دریافت اطلاعات مدرسه
        </p>
      )}
      {school && (
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-base text-[#022959]">
            {school.name}
          </p>
          <p className="text-[#022959]">{school.description}</p>
          <p className="text-[#022959]">کد مدرسه: {school.code}</p>
          <p className="text-[#022959]">مدیر: {school.adminName}</p>
          <p className="text-[#022959]">
            شماره تماس مدیر: {school.adminPhoneNumber}
          </p>
          <p className="text-[#022959]">
            شماره تماس مدرسه: {school.schoolContactNumber}
          </p>
          {school.address && (
            <p className="text-[#022959]">آدرس: {school.address}</p>
          )}
          <p className="text-[#022959]">سال تاسیس: {school.establishedYear}</p>
          <p className="text-[#022959]">ثبت شده: {school.createdAtPersian}</p>
        </div>
      )}
    </div>
  );
}
