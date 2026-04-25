import { scale } from "@/src/utils/Scaling";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";

type ScreenWrapperProps = {
  children: ReactNode;
};

const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  return (
    <LinearGradient
      colors={["#F9FBFD", "#E0F2FE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1, paddingHorizontal: scale(20) }}
    >
      {children}
    </LinearGradient>
  );
};

export default ScreenWrapper;
