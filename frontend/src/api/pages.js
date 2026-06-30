import { useMemo } from "react";
import useSWR, { mutate } from "swr";

import axiosInstance from "./axios";
import ENDPOINTS from "./endpoints";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export function useGetAdminPages() {
  const URL = ENDPOINTS.PAGES.ADMIN;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      pages: data || [],
      loading: isLoading,
      error,
      validating: isValidating,
      empty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating],
  );

  const refetch = async () => {
    await mutate(URL);
  };

  return { ...memoizedValue, refetch };
}

export function useGetAdminPageBySlug(slug) {
  const URL = slug ? ENDPOINTS.PAGES.ADMIN_BY_SLUG(slug) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  return {
    page: data || null,
    loading: isLoading,
    error,
    validating: isValidating,
  };
}
