import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import axiosInstance from "../api/axios";
import ENDPOINTS from "../api/endpoints";

const VISITOR_KEY = "bytech_visitor_id";
const LAST_TRACK_KEY = "bytech_last_visit_track";
const TEN_MINUTES = 5 * 60 * 1000;

function createVisitorId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `visitor_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function getVisitorId() {
  let visitorId = localStorage.getItem(VISITOR_KEY);

  if (!visitorId) {
    visitorId = createVisitorId();
    localStorage.setItem(VISITOR_KEY, visitorId);
  }

  return visitorId;
}

function shouldTrackNow() {
  const lastTrack = Number(localStorage.getItem(LAST_TRACK_KEY) || 0);
  const now = Date.now();

  return now - lastTrack >= TEN_MINUTES;
}

function saveLastTrackTime() {
  localStorage.setItem(LAST_TRACK_KEY, String(Date.now()));
}

function clearLastTrackTime() {
  localStorage.removeItem(LAST_TRACK_KEY);
}

export default function VisitTracker() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/admin")) return;
    if (!path || path === "/favicon.ico") return;
    if (!shouldTrackNow()) return;

    const visitorId = getVisitorId();

    // مهم: نحفظ قبل الطلب عشان لو useEffect اشتغل مرتين ما يبعث مرتين
    saveLastTrackTime();

    axiosInstance
      .post(ENDPOINTS.ANALYTICS.TRACK, {
        visitorId,
        path,
      })
      .catch((error) => {
        console.log("Track visit failed:", error.message);

        // لو الطلب فشل، اسمح له يجرب مرة ثانية
        clearLastTrackTime();
      });
  }, [location.pathname]);

  return null;
}
