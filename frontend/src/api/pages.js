import { useMemo } from "react";
import useSWR from "swr";

import axiosInstance from "./axios";
import ENDPOINTS from "./endpoints";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export function useGetAdminPages() {
  const URL = ENDPOINTS.PAGES.ADMIN;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      pages: data || [],
      loading: isLoading,
      error,
      validating: isValidating,
      empty: !isLoading && !data?.length,
      refetch: mutate,
    }),
    [data, error, isLoading, isValidating, mutate],
  );

  return memoizedValue;
}

export function useGetAdminPageBySlug(slug) {
  const URL = slug ? ENDPOINTS.PAGES.ADMIN_BY_SLUG(slug) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  return {
    page: data?.page || null,
    sections: data?.sections || {},
    sectionsList: data?.sectionsList || [],
    loading: isLoading,
    error,
    validating: isValidating,
    refetch: mutate,
  };
}
export function useGetNavbarPages() {
  const URL = ENDPOINTS.PAGES.NAVBAR;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  return {
    links: data || [],
    loading: isLoading,
    error,
    validating: isValidating,
    refetch: mutate,
  };
}

export async function updatePageNavbarStatus(id, payload) {
  const response = await axiosInstance.patch(
    ENDPOINTS.PAGES.UPDATE_NAVBAR(id),
    payload,
  );

  return response.data;
}

export async function reorderNavbarPages(items) {
  const response = await axiosInstance.patch(ENDPOINTS.PAGES.REORDER_NAVBAR, {
    items,
  });

  return response.data;
}
export async function createPage(payload) {
  const response = await axiosInstance.post(ENDPOINTS.PAGES.CREATE, payload);
  return response.data;
}

export async function updatePage(id, payload) {
  const response = await axiosInstance.put(ENDPOINTS.PAGES.UPDATE(id), payload);
  return response.data;
}

export async function deletePage(id) {
  const response = await axiosInstance.delete(ENDPOINTS.PAGES.DELETE(id));
  return response.data;
}
