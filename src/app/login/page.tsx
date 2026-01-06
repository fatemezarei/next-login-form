"use client";

import { useRouter } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { useLogin } from "./useLogin";

export default function LoginPage() {
  const router = useRouter();

  const loginMutation = useLogin((token) => {
    localStorage.setItem("token", token);
    router.push("/success");
  });

  return (
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
  );
}
