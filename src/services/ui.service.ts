// services/ui.service.ts
import useSWR from "swr";
import api from "@/lib/api";

// Hàm fetcher dùng axios instance
const fetcher = (url: string) => api.get(url).then(res => res.data);

// Tương tự, lấy danh sách danh mục
export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR("/categories", fetcher);

  return {
    categories: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  };
};
