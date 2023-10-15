"use client";
import { axiosAuth } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        localStorage.setItem("token",session?.user?.idToken);
        //if (!config.headers["Authorization"] || config.headers["Authorization"] === undefined ) {
          
          config.headers["Authorization"] = localStorage.getItem("token"); //`${session?.user?.idToken}`;
        //}
        return config;
      },
      (error) => Promise.reject(error)
    );

    

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
    };
  }, [session, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;