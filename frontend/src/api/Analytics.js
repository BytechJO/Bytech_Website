import { useMemo } from "react";
import useSWR from "swr";

import axiosInstance from "./axios";
import ENDPOINTS from "./endpoints";

const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

export function useGetAnalytics() {
  const URL = ENDPOINTS.ANALYTICS.ADMIN;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  return useMemo(
    () => ({
      analytics: data?.data || data || null,
      loading: isLoading,
      error,
      validating: isValidating,
      refetch: mutate,
    }),
    [data, error, isLoading, isValidating, mutate],
  );
}

export async function getAnalytics() {
  const response = await axiosInstance.get(ENDPOINTS.ANALYTICS.ADMIN);
  return response.data;
}

export async function trackWebsiteVisit(payload) {
  const response = await axiosInstance.post(ENDPOINTS.ANALYTICS.TRACK, payload);

  return response.data;
}
