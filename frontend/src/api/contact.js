import { useMemo } from "react";
import useSWR from "swr";

import axiosInstance from "./axios";
import ENDPOINTS from "./endpoints";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export function useGetAdminContactMessages(filters = {}) {
  const query = new URLSearchParams();

  if (filters.status && filters.status !== "all") {
    query.set("status", filters.status);
  }

  if (typeof filters.read === "boolean") {
    query.set("read", String(filters.read));
  }

  const queryString = query.toString();

  const URL = queryString
    ? `${ENDPOINTS.CONTACT.ADMIN}?${queryString}`
    : ENDPOINTS.CONTACT.ADMIN;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  return useMemo(
    () => ({
      messages: data?.data || [],
      loading: isLoading,
      error,
      validating: isValidating,
      empty: !isLoading && !data?.data?.length,
      refetch: mutate,
    }),
    [data, error, isLoading, isValidating, mutate],
  );
}

export function useGetAdminContactMessage(id) {
  const URL = id ? ENDPOINTS.CONTACT.ADMIN_BY_ID(id) : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  return useMemo(
    () => ({
      message: data?.data || null,
      loading: isLoading,
      error,
      validating: isValidating,
      empty: !isLoading && !data?.data,
      refetch: mutate,
    }),
    [data, error, isLoading, isValidating, mutate],
  );
}

export async function createContactMessage(payload) {
  const response = await axiosInstance.post(
    ENDPOINTS.CONTACT.PUBLIC_CREATE,
    payload,
  );

  return response.data;
}

export async function getAdminContactMessages(params = {}) {
  const response = await axiosInstance.get(ENDPOINTS.CONTACT.ADMIN, {
    params,
  });

  return response.data;
}

export async function getAdminContactMessage(id) {
  const response = await axiosInstance.get(ENDPOINTS.CONTACT.ADMIN_BY_ID(id));

  return response.data;
}

export async function updateAdminContactMessage(id, payload) {
  const response = await axiosInstance.patch(
    ENDPOINTS.CONTACT.UPDATE_STATUS(id),
    payload,
  );

  return response.data;
}

export async function deleteAdminContactMessage(id) {
  const response = await axiosInstance.delete(ENDPOINTS.CONTACT.DELETE(id));

  return response.data;
}
