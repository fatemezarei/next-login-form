"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Pagination from "@/components/pagination/Pagination";
import UserCard from "@/components/user-card/UserCard";
import UserSearch from "@/components/user-search/UserSearch";
import UserInfoModal from "@/components/user-info-modal/UserInfoModal";
import { api } from "@/lib/axios";
import { User, UsersApiResponse } from "@/types/users";
import Header from "@/components/header/Header";

export default function SuccessPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [role, setRole] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data, isLoading, error } = useQuery<UsersApiResponse>({
    queryKey: ["users", page, filter, role],
    queryFn: async (): Promise<UsersApiResponse> => {
      const response = await api.post<UsersApiResponse>("/user/all", {
        page_number: page,
        limit: 10,
        filter: filter || null,
        role: role || null,
        gender: "FEMALE",
        isActive: true,
        sortBy: "id",
        sortOrder: "asc",
      });

      return response.data;
    },
  });

  const users = data?.result.items ?? [];
  const totalCount = data?.result.totalCount ?? 0;

  if (isLoading) {
    return <div className="text-center p-8">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">خطا</div>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-right text-[#022959]">
            لیست کاربران
          </h1>

          <UserSearch
            onSearch={(f, r) => {
              setPage(1);
              setFilter(f);
              setRole(r);
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onClick={() => setSelectedUser(user)}
              />
            ))}
          </div>

          <Pagination
            page={page}
            limit={10}
            totalCount={totalCount}
            onPageChange={setPage}
          />
        </div>

        {selectedUser && (
          <UserInfoModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>
    </>
  );
}
