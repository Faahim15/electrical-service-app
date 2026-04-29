import { scale } from "@/src/utils/Scaling";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";

type ScreenWrapperProps = {
  children: ReactNode;
  paddingHorizontal?: number;
};

const ScreenWrapper = ({
  children,
  paddingHorizontal = scale(20),
}: ScreenWrapperProps) => {
  return (
    <LinearGradient
      colors={["#F9FBFD", "#E0F2FE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1, paddingHorizontal }}
    >
      {children}
    </LinearGradient>
  );
};

export default ScreenWrapper;
