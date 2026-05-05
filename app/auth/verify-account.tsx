import { verifyIcon } from "@/assets/images/svg/auth-svg";
import AuthHeading from "@/src/components/auth/AuthHeading";
import OtpField from "@/src/components/auth/OtpField";
import SignUpLink from "@/src/components/auth/SignUpLink";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import CustomSvg from "@/src/components/shared/CustomSvg";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { scale, verticalScale } from "@/src/utils/Scaling";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

const VerifyAccount = () => {
  return (
    <ScreenWrapper>
      <View className="flex-1 ">
        <View className="justify-center items-center mt-[10%]">
          <CustomSvg
            xml={verifyIcon}
            height={verticalScale(144)}
            width={scale(144)}
          />
        </View>
        <View className="items-center ml-[5%]">
          <AuthHeading
            title="Verify your account"
            subtitle="Enter the 6-digit code sent to your email to continue."
          />
        </View>
        <OtpField />

        <SignUpLink title="Didn't receive the code?" subtitle="Resend" />

        <View className="mt-[3%]">
          <GradientButton
            label="Verify"
            onPress={() => router.push("/auth/reset-password")}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default VerifyAccount;
