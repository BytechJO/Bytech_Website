import { useMemo } from "react";
import useSWR from "swr";

import axiosInstance from "./axios";
import ENDPOINTS from "./endpoints";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export function useGetPublicCmsPage(pageKey) {
  const URL = pageKey ? ENDPOINTS.CMS_PAGES.PUBLIC_BY_KEY(pageKey) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  return useMemo(
    () => ({
      page: data || null,
      content: data?.content || null,
      loading: isLoading,
      error,
      validating: isValidating,
      empty: !isLoading && !data,
      refetch: mutate,
    }),
    [data, error, isLoading, isValidating, mutate],
  );
}

export function useGetAdminCmsPages() {
  const URL = ENDPOINTS.CMS_PAGES.ADMIN;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  return useMemo(
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
}

export function useGetAdminCmsPage(pageKey) {
  const URL = pageKey ? ENDPOINTS.CMS_PAGES.ADMIN_BY_KEY(pageKey) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  return useMemo(
    () => ({
      page: data || null,
      content: data?.content || null,
      loading: isLoading,
      error,
      validating: isValidating,
      empty: !isLoading && !data,
      refetch: mutate,
    }),
    [data, error, isLoading, isValidating, mutate],
  );
}

export function useGetCmsPage(pageKey, editable = false) {
  const URL = pageKey
    ? editable
      ? ENDPOINTS.CMS_PAGES.ADMIN_BY_KEY(pageKey)
      : ENDPOINTS.CMS_PAGES.PUBLIC_BY_KEY(pageKey)
    : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  return useMemo(
    () => ({
      page: data || null,
      content: data?.content || null,
      loading: isLoading,
      error,
      validating: isValidating,
      empty: !isLoading && !data,
      refetch: mutate,
    }),
    [data, error, isLoading, isValidating, mutate],
  );
}

export async function getPublicCmsPage(pageKey) {
  const response = await axiosInstance.get(
    ENDPOINTS.CMS_PAGES.PUBLIC_BY_KEY(pageKey),
  );

  return response.data;
}

export async function getAdminCmsPage(pageKey) {
  const response = await axiosInstance.get(
    ENDPOINTS.CMS_PAGES.ADMIN_BY_KEY(pageKey),
  );

  return response.data;
}

export async function createCmsPage(payload) {
  const response = await axiosInstance.post(
    ENDPOINTS.CMS_PAGES.CREATE,
    payload,
  );

  return response.data;
}

export async function updateAdminCmsPage(pageKey, payload) {
  const response = await axiosInstance.put(
    ENDPOINTS.CMS_PAGES.UPDATE(pageKey),
    payload,
  );

  return response.data;
}

export async function deleteCmsPage(pageKey) {
  const response = await axiosInstance.delete(
    ENDPOINTS.CMS_PAGES.DELETE(pageKey),
  );

  return response.data;
}
