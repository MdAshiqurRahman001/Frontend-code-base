"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Chat, WsMessage } from "@/types";

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ||
  process.env.NEXT_PUBLIC_DEV_BASE_URL?.replace("https://", "wss://").replace(
    "/api/v1",
    ""
  ) ||
  "wss://code-base-beta.vercel.app";

export interface OnlineUser {
  id: string;
  email: string;
  role: string;
}

export interface UseWebSocketReturn {
  isConnected: boolean;
  messages: Chat[];
  onlineUsers: OnlineUser[];
  unreadCount: number;
  sendMessage: (receiverId: string, message: string, imageUrl?: string) => void;
  fetchChats: (receiverId: string) => void;
  requestOnlineUsers: () => void;
  getUnreadMessages: (receiverId: string) => void;
  clearMessages: () => void;
}

export function useWebSocket(token: string | null): UseWebSocketReturn {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!token) return;

    const connect = () => {
      if (ws.current?.readyState === WebSocket.OPEN) return;

      const socket = new WebSocket(WS_URL);
      ws.current = socket;

      socket.onopen = () => {
        setIsConnected(true);
        // Authenticate immediately after connection
        socket.send(JSON.stringify({ event: "authenticate", token }));
      };

      socket.onmessage = (event: MessageEvent) => {
        try {
          const data: WsMessage = JSON.parse(event.data);

          switch (data.event) {
            case "message":
              if (data.data && typeof data.data === "object") {
                const { chat } = data.data as { chat: Chat };
                setMessages((prev) => [...prev, chat]);
              }
              break;

            case "fetchChats":
              if (Array.isArray(data.data)) {
                setMessages(data.data as Chat[]);
              }
              break;

            case "onlineUsers":
              if (Array.isArray(data.data)) {
                setOnlineUsers(data.data as OnlineUser[]);
              }
              break;

            case "unReadMessages":
              if (data.data && typeof data.data === "object") {
                const { count } = data.data as { count: number };
                setUnreadCount(count);
              }
              break;

            case "userStatus":
              // Optionally update online status of individual user
              break;

            default:
              break;
          }
        } catch (err) {
          console.error("[WS] Failed to parse message:", err);
        }
      };

      socket.onerror = (err) => {
        console.error("[WS] WebSocket error:", err);
      };

      socket.onclose = () => {
        setIsConnected(false);
        // Reconnect after 3 seconds
        reconnectTimer.current = setTimeout(() => {
          connect();
        }, 3000);
      };
    };

    connect();

    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, [token]);

  const send = useCallback((payload: WsMessage) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(payload));
    }
  }, []);

  const sendMessage = useCallback(
    (receiverId: string, message: string, imageUrl?: string) => {
      send({ event: "message", receiverId, message, imageUrl });
    },
    [send]
  );

  const fetchChats = useCallback(
    (receiverId: string) => {
      send({ event: "fetchChats", receiverId });
    },
    [send]
  );

  const requestOnlineUsers = useCallback(() => {
    send({ event: "onlineUsers" });
  }, [send]);

  const getUnreadMessages = useCallback(
    (receiverId: string) => {
      send({ event: "unReadMessages", receiverId });
    },
    [send]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isConnected,
    messages,
    onlineUsers,
    unreadCount,
    sendMessage,
    fetchChats,
    requestOnlineUsers,
    getUnreadMessages,
    clearMessages,
  };
}
