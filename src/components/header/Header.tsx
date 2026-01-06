"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface UserInfoResponse {
  status: number;
  message: string;
  result: {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    email: string | null;
    address: string | null;
    birthDate: string | null;
    mobile: string;
    social_security_number: string;
  };
}

interface SchoolInfoResponse {
  status: number;
  message: string;
  result: {
    id: number;
    name: string;
    description: string;
    code: string;
    adminName: string;
    adminPhoneNumber: string;
    schoolContactNumber: string;
    address: string | null;
    establishedYear: number;
    createdAtPersian: string;
    updatedAtPersian: string;
  };
}

export default function Header() {
  const [openUser, setOpenUser] = useState(false);
  const [openSchool, setOpenSchool] = useState(false);

  // اطلاعات کاربر
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useQuery<UserInfoResponse>({
    queryKey: ["user-info"],
    enabled: openUser, // فقط وقتی روی دکمه کلیک شد
    queryFn: async () => {
      const response = await api.get<UserInfoResponse>("/user/userInfo");
      return response.data;
    },
  });

  const user = userData?.result;

  // اطلاعات مدرسه
  const {
    data: schoolData,
    isLoading: schoolLoading,
    error: schoolError,
  } = useQuery<SchoolInfoResponse>({
    queryKey: ["school-info"],
    enabled: openSchool, // فقط وقتی روی دکمه کلیک شد
    queryFn: async () => {
      const response = await api.get<SchoolInfoResponse>(
        "https://api.daroolelm.com/school/info"
      );
      return response.data;
    },
  });

  const school = schoolData?.result;

  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Title */}
        <h1 className="font-bold text-lg text-[#022959]">پنل مدیریت</h1>

        {/* Profile & School Info */}
        <div className="flex gap-4 relative">
          {/* اطلاعات کاربر */}
          <div className="relative">
            <button
              onClick={() => {
                setOpenUser((prev) => !prev);
                setOpenSchool(false);
              }}
              className="px-4 py-2 rounded-lg bg-[#EFF5FF] text-[#022959] font-medium"
            >
              اطلاعات کاربر
            </button>

            {openUser && (
              <div className="absolute left-0 mt-3 w-72 bg-white rounded-xl shadow-lg border p-4 text-right z-50">
                {userLoading && (
                  <p className="text-center text-sm">در حال بارگذاری...</p>
                )}

                {userError && (
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
                    {user.email && (
                      <p className="text-[#022959]">ایمیل: {user.email}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* اطلاعات مدرسه */}
          <div className="relative">
            <button
              onClick={() => {
                setOpenSchool((prev) => !prev);
                setOpenUser(false);
              }}
              className="px-4 py-2 rounded-lg bg-[#EFF5FF] text-[#022959] font-medium"
            >
              اطلاعات مدرسه
            </button>

            {openSchool && (
              <div className="absolute left-0 mt-3 w-96 bg-white rounded-xl shadow-lg border p-4 text-right z-50">
                {schoolLoading && (
                  <p className="text-center text-sm">در حال بارگذاری...</p>
                )}

                {schoolError && (
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
                    <p className="text-[#022959]">
                      سال تاسیس: {school.establishedYear}
                    </p>
                    <p className="text-[#022959]">
                      ثبت شده: {school.createdAtPersian}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
