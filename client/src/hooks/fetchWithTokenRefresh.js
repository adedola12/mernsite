import toast from "react-hot-toast";
import { config } from "../../config";
import { useState } from "react";

const fetchWithTokenRefresh = async (url, options) => {
  const response = await fetch(url, options);

  if (response.status === 401) {
    // Assuming 401 is returned for expired tokens
    // Request new access token
    const refreshResponse = await fetch(
      `${config.baseUrl}/api/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (refreshResponse.ok) {
      const { access_token } = await refreshResponse.json();
      localStorage.setItem("access_token", access_token);

      // Retry original request with new token
      options.headers["Authorization"] = `Bearer ${access_token}`;
      return fetch(url, options);
    } else {
      // Handle refresh token failure (e.g., log out user)
      // ...
      toast.error(error.message);
    }
  }

  return response;
};

export default fetchWithTokenRefresh;
