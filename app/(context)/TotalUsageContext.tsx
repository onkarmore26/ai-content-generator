import { createContext } from "react";

export const TotalUsageContext = createContext<{
  totalUsage: number;
  setTotalUsage: React.Dispatch<React.SetStateAction<number>>;
}>({
  totalUsage: 0,
  setTotalUsage: () => {},
});
