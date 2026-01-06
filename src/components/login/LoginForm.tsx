"use client";

import { useState } from "react";

interface Props {
  onSubmit: (nationalCode: string, password: string) => void;
  loading: boolean;
  errorMessage: string | null;
}

interface FormValues {
  nationalCode: string | null;
  password: string | null;
}

interface FormErrors {
  nationalCode: string | null;
  password: string | null;
}

export function LoginForm({ onSubmit, loading, errorMessage }: Props) {
  const [values, setValues] = useState<FormValues>({
    nationalCode: null,
    password: null,
  });

  const [errors, setErrors] = useState<FormErrors>({
    nationalCode: null,
    password: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {
      nationalCode: null,
      password: null,
    };

    if (values.nationalCode === null) {
      newErrors.nationalCode = "وارد کردن کد ملی الزامی است";
    }

    if (values.password === null) {
      newErrors.password = "وارد کردن رمز عبور الزامی است";
    }

    setErrors(newErrors);

    if (newErrors.nationalCode || newErrors.password) return;

    onSubmit(values.nationalCode!, values.password!);
    setValues({
      nationalCode: null,
      password: null,
    });
    setErrors({
      nationalCode: null,
      password: null,
    });
  };

  return (
    <div className="w-112.5 bg-[#EFF5FF] p-10 rounded-2xl">
      <h1 className="text-center font-bold text-2xl text-[#022959]">ورود</h1>

      <form onSubmit={handleSubmit} className="flex flex-col mt-10">
        <div className="mb-6">
          <label className="block text-right mb-1 text-[#022959]">کد ملی</label>

          <input
            type="text"
            maxLength={10}
            value={values.nationalCode ?? ""}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                nationalCode: e.target.value.replace(/\D/g, ""),
              }))
            }
            className={`w-full h-14 rounded-lg p-4 border text-[#022959] ${
              errors.nationalCode
                ? "border-red-500 bg-red-50"
                : "border-[#D6D9E6]"
            }`}
          />

          {errors.nationalCode && (
            <p className="text-red-600 text-sm mt-1 text-right">
              {errors.nationalCode}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-right mb-1 text-[#022959]">
            رمز عبور
          </label>

          <input
            type="password"
            value={values.password ?? ""}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            className={`w-full h-14 rounded-lg p-4 border text-[#022959] ${
              errors.password ? "border-red-500 bg-red-50" : "border-[#D6D9E6]"
            }`}
          />

          {errors.password && (
            <p className="text-red-600 text-sm mt-1 text-right">
              {errors.password}
            </p>
          )}
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`h-14 rounded-xl text-lg font-medium ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#BEE2FD] text-[#022959] hover:bg-[#A8D0F8]"
          }`}
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </div>
  );
}
