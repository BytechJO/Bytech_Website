import { useMemo } from "react";
import useSWR from "swr";

import axiosInstance from "./axios";
import ENDPOINTS from "./endpoints";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export function useGetNotifications(filters = {}) {
  const query = new URLSearchParams();

  if (typeof filters.read === "boolean") {
    query.set("read", String(filters.read));
  }

  const queryString = query.toString();

  const URL = queryString
    ? `${ENDPOINTS.NOTIFICATIONS.ADMIN}?${queryString}`
    : ENDPOINTS.NOTIFICATIONS.ADMIN;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  return useMemo(
    () => ({
      notifications: data?.data || [],
      loading: isLoading,
      error,
      validating: isValidating,
      empty: !isLoading && !data?.data?.length,
      refetch: mutate,
    }),
    [data, error, isLoading, isValidating, mutate],
  );
}

export function useGetUnreadNotificationsCount() {
  const URL = ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT;

  const { data, isLoading, error, isValidating, mutate } = useSWR(
    URL,
    fetcher,
    {
      refreshInterval: 15000,
    },
  );

  return useMemo(
    () => ({
      count: data?.count || 0,
      loading: isLoading,
      error,
      validating: isValidating,
      refetch: mutate,
    }),
    [data, error, isLoading, isValidating, mutate],
  );
}

export async function getNotifications(params = {}) {
  const response = await axiosInstance.get(ENDPOINTS.NOTIFICATIONS.ADMIN, {
    params,
  });

  return response.data;
}

export async function getUnreadNotificationsCount() {
  const response = await axiosInstance.get(
    ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT,
  );

  return response.data;
}

export async function markNotificationAsRead(id) {
  const response = await axiosInstance.patch(
    ENDPOINTS.NOTIFICATIONS.MARK_READ(id),
  );

  return response.data;
}

export async function markAllNotificationsAsRead() {
  const response = await axiosInstance.patch(
    ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ,
  );

  return response.data;
}

export async function deleteNotification(id) {
  const response = await axiosInstance.delete(
    ENDPOINTS.NOTIFICATIONS.DELETE(id),
  );

  return response.data;
}
