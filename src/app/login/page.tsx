"use client";

import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/login/LoginForm";
import { useLogin } from "@/components/login/useLogin";

export default function LoginPage() {
  const router = useRouter();

  const loginMutation = useLogin((token) => {
    localStorage.setItem("token", token);
    router.push("/success");
  });

  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center">
      <LoginForm
        loading={loginMutation.isPending}
        errorMessage={loginMutation.error?.message ?? ""}
        onSubmit={(nationalCode, password) => {
          loginMutation.mutate({
            social_security_number: Number(nationalCode),
            password,
          });
        }}
      />
    </div>
  );
}
