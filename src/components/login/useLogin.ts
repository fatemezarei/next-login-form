import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { LoginPayload, LoginResponse } from "@/types/login";
import { LoginStatus } from "@/enums/login-status";

export function useLogin(onSuccess: (token: string) => void) {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const { data } = await api.post<LoginResponse>("/auth/login", payload);

      if (data.status !== LoginStatus.Success) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: (data) => {
      onSuccess(data.result.accessToken);
    },
  });
}
