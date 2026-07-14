import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";

/**
 * Use these typed hooks throughout the app instead of plain
 * `useDispatch` and `useSelector` to get full TypeScript support.
 *
 * @example
 * const dispatch = useAppDispatch();
 * const user = useAppSelector(selectCurrentUser);
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
