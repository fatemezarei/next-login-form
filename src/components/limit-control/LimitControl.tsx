"use client";

interface Props {
  limit: number;
  setLimit: (value: number) => void;
  setPage: (page: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function LimitControl({
  limit,
  setLimit,
  setPage,
  min = 5,
  max = 20,
  step = 5,
}: Props) {
  const handleDecrease = () => {
    setPage(1);
    setLimit(Math.max(min, limit - step));
  };

  const handleIncrease = () => {
    setPage(1);
    setLimit(Math.min(max, limit + step));
  };

  return (
    <div className="flex items-center justify-end gap-3 mb-4">
      <span className="text-sm text-[#022959]">تعداد در هر صفحه: {limit}</span>

      <button
        onClick={handleDecrease}
        className="px-3 py-1 rounded-lg bg-white border text-[#022959] hover:bg-gray-100"
      >
        −
      </button>

      <button
        onClick={handleIncrease}
        className="px-3 py-1 rounded-lg bg-white border text-[#022959] hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
}
