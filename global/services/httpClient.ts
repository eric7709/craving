import api from "../lib/axios";

export const httpClient = {
  get: <T = any>(url: string, params?: any) =>
    api.get<T>(url, { params }).then((res) => res.data),

  post: <T = any>(url: string, data?: any) =>
    api.post<T>(url, data).then((res) => res.data),

  put: <T = any>(url: string, data?: any) =>
    api.put<T>(url, data).then((res) => res.data),

  patch: <T = any>(url: string, data?: any) =>
    api.patch<T>(url, data).then((res) => res.data),

  delete: <T = any>(url: string, params?: any) =>
    api.delete<T>(url, { params }).then((res) => res.data),
};
