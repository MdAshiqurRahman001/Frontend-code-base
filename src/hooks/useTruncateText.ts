import { useCallback } from "react";

export const useTruncateText = () => {
  const truncate = useCallback((text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }, []);

  return { truncate };
};
