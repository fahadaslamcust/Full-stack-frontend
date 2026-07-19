import { useMutation } from "@tanstack/react-query";
import apiClient from "../api/client";

export const useFacebookAuth = () => {
  return useMutation({
    mutationFn: async (facebookToken) => {
      const response = await apiClient.post("/auth/facebook", {
        token: facebookToken,
      });
      return response.data;
    },
    onSuccess: (responseBody) => {
      const token = responseBody?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        if (responseBody?.data?.user) {
          localStorage.setItem("user", JSON.stringify(responseBody.data.user));
        }
      }
    },
  });
};
