"use client";
import { axiosLocal } from "@/lib/axiosLocal";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosLocal.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosLocal.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${session?.user.accessToken}`;
          return axiosLocal(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosLocal.interceptors.request.eject(requestIntercept);
      axiosLocal.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return axiosLocal;
};

export default useAxiosAuth;