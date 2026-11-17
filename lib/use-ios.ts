"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** True on iPhone / iPad, where the Android APK cannot be installed. Recent iPads report as a Mac with touch. */
function detectIos() {
  const ua = navigator.userAgent || "";
  return /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export const useIsIos = () => useSyncExternalStore(noop, detectIos, () => false);
