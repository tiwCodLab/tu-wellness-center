// file: ./utils/useFetchPrivate

import { useState } from "react";
import { useAuth } from "./AuthProvider";
// import { _fetch as fetch} from './fetchWTimeout'
let useFetchPrivate = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  //    const baseURL = 'http://127.0.0.1:4000'

  const setAuthorizationHeader = (params, accessToken = user.accessToken) => {
    if (!params) {
      params = {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
    } else {
      if (!params.headers || accessToken) {
        Object.assign(params, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }
      Object.assign(params, { credentials: "include" });
      if (!params.noContentType) {
        Object.assign(params.headers, { "Content-Type": "application/json" });
      } else if (params.noContentType && params.headers["Content-Type"]) {
        params.headers.delete("Content-Type");
      }
    }
    return params;
  };

  const originalRequest = async (url, config) => {
    let response = await fetch(url, config);
    return response;
  };

  const refreshToken = async () => {
    let response = await fetch(
      "https://api-data-medical-room-tu.onrender.com/auth/refresh",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      let data = await response.json();
      let tempUser = { ...user, accessToken: data.accessToken };
      sessionStorage.setItem("aToken", JSON.stringify(tempUser)); // add this forget to set the session storage
      setUser(tempUser);
      return data.accessToken;
    } else {
      const error = new Error("Fail to refresh! while fetching the data.");
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1)
        error.info = await response.json();
      else error.info = await response.text();
      error.status = response.status;
      //      signout(()=> console.log("Fail to refresh! force signout!"));
      throw error;
    }
  };
  const processResult = async (response) => {
    let data = {};
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") >= 0) {
      data = await response.json();
    } else if (contentType && contentType.indexOf("text/") >= 0) {
      data = await response.text();
    } else data = await response.blob(); // expect it is a mimetype data i.e., image
    return { response, data };
  };

  const callFetch = async (url, config) => {
    try {
      //      let newConfig = setAuthorizationHeader(config, user.accessToken);
      let newConfig = setAuthorizationHeader(config);
      let response = await originalRequest(url, newConfig);
      if (response.ok) {
        return processResult(response);
        // let data = await response.json();
        // return {response, data};
      } else {
        if (response?.status === 403) {
          // token expire or loss?
          const newAccessToken = await refreshToken();
          const options = setAuthorizationHeader(config, newAccessToken);
          let response = await originalRequest(url, options);
          if (response.ok) {
            return processResult(response);
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
