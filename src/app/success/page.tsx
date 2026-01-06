// "use client";

// import { useQuery } from "@tanstack/react-query";
// import Pagination from "@/components/pagination/Pagination";
// import UserCard from "@/components/user-card/UserCard";
// import UserSearch from "@/components/user-search/UserSearch";
// import { api } from "@/lib/axios";
// import { User, UsersApiResponse } from "@/types/users";
// import { useState } from "react";

// export default function SuccessPage() {
//   const [page, setPage] = useState(1);
//   const [filter, setFilter] = useState("");
//   const [role, setRole] = useState("");

//   const { data, isLoading, error } = useQuery<UsersApiResponse, Error>({
//     queryKey: ["users", page, filter, role],
//     queryFn: async () => {
//       const response = await api.post<UsersApiResponse>("/user/all", {
//         page_number: page,
//         limit: 10,
//         filter: filter || null,
//         role: role || null,
//         gender: "FEMALE",
//         isActive: true,
//         sortBy: "id",
//         sortOrder: "asc",
//       });

//       return response.data;
//     },
//   });

//   const users: User[] = data?.result.items ?? [];
//   const totalCount = data?.result.totalCount ?? 0;

//   const handleSearch = (newFilter: string, newRole: string) => {
//     setPage(1);
//     setFilter(newFilter);
//     setRole(newRole);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center p-8">در حال بارگذاری...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center p-8 text-red-600">خطا: {error.message}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6 text-right text-[#022959]">
//           لیست کاربران
//         </h1>

//         <UserSearch onSearch={handleSearch} />

//         {users.length ? (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {users.map((user) => (
//                 <UserCard key={user.id} user={user} />
//               ))}
//             </div>

//             <Pagination
//               page={page}
//               limit={10}
//               totalCount={totalCount}
//               onPageChange={setPage}
//             />
//           </>
//         ) : (
//           <div className="flex flex-col items-center justify-center min-h-100 text-center text-gray-500">
//             <div className="text-4xl mb-4">👥</div>
//             <h2 className="text-xl font-semibold mb-2">کاربری یافت نشد</h2>
//             <p>هیچ کاربری با شرایط انتخابی وجود ندارد</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
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
