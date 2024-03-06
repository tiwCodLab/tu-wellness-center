import { useState } from "react";
import { useAuth } from "./AuthProvider";
import axios from "../api/axios";
let useFetchPrivate = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const setAuthorizationHeader = (params, accessToken) => {
    if (!params) {
      params = {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
    } else {
      if (!params.headers || !params.headers["Authorization"]) {
        Object.assign(params, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
      Object.assign(params, { credentials: "include" });
      params.headers = {
        ...params.headers,
        "Content-Type": "application/json",
      };
    }
    return params;
  };

  const originalRequest = async (url, config) => {
    config = setAuthorizationHeader(config, user.accessToken);
    let response = await fetch(url, config);
    return response;
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // เพิ่มค่า withCredentials เป็น true เพื่อส่งคุกกี้ไปยังเซิร์ฟเวอร์
      });

      if (response.status === 200) {
        const data = response.data;
        setUser((prev) => {
          return { ...prev, accessToken: data.accessToken };
        });
        return data.accessToken;
      } else {
        const error = new Error("Fail to refresh! while fetching the data.");
        error.info = response.data; // กำหนดข้อมูลของ error
        error.status = response.status;
        throw error;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  };

  const callFetch = async (url, config) => {
    try {
      let response = await originalRequest(url, config);

      if (response.ok) {
        let data = await response.json();
        return { response, data };
      } else {
        if (response?.status === 403) {
          // token expire or loss?
          const newAccessToken = await refreshToken();
          const options = setAuthorizationHeader(
            config,
            `Bearer ${newAccessToken}`
          );
          let response = await originalRequest(url, options);
          let data = {};
          if (response.ok) {
            data = await response.json();
            return { response, data };
          } else {
            throw new Error("Request fail!");
          }
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, callFetch, refreshToken };
};

export default useFetchPrivate;
