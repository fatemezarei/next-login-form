"use client";

interface PaginationProps {
  page: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalCount,
  limit,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 gap-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 cursor-pointer"
      >
        قبلی
      </button>

      <span className="px-4 py-2 bg-white rounded shadow text-[#022959]">
        صفحه {page} از {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 cursor-pointer"
      >
        بعدی
      </button>
    </div>
  );
}
