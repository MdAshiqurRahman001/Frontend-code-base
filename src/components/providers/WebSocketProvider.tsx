"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useWebSocket, UseWebSocketReturn } from "@/hooks/useWebSocket";
import { useAppSelector } from "@/hooks/redux";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";

const WebSocketContext = createContext<UseWebSocketReturn | null>(null);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const token = useAppSelector(selectCurrentToken);
  const ws = useWebSocket(token);

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWS(): UseWebSocketReturn {
  const ctx = useContext(WebSocketContext);
  if (!ctx) {
    throw new Error("useWS must be used inside <WebSocketProvider>");
  }
  return ctx;
}
