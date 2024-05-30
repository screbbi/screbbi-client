import axios from "axios";

export const BASE_URL = "https://ai-writer-black.vercel.app/api/v1";
// export const BASE_URL1 = "https://ai-writer-black.vercel.app/api/v2";

const axiosInstance = axios.create({
  // timeout: 10000,
  baseURL: BASE_URL,
  // baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const axiosInstanceVercel = axios.create({
  // timeout: 10000,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getRequest = async (
  url: string,
  params = {},
  setTime?: (e: boolean) => void
) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      window.location.replace("/auth/login");
    }
    if (axios.isCancel(error)) {
      console.log("Canceled due to timeout");
      setTime?.(true);
    }
    throw error;
  }
};

export const delRequest = async (url: string, params = {}) => {
  try {
    const response = await axiosInstance.delete(url, { params });
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      window.location.replace("/auth/login");
    }
    throw error;
  }
};

export const postRequest = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      window.location.replace("/auth/login");
    }
    throw error;
  }
};

export const putRequest = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      window.location.replace("/auth/login");
    }
    throw error;
  }
};

export const patchRequest = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.patch(url, data);
    return response.data;
  } catch (error: any) {
    if (error.response.data === "Unauthorized") {
      window.location.replace("/auth/login");
    }
    throw error;
  }
};
// Access denied for user
