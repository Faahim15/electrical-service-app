import { forgotPasswordIcon } from "@/assets/images/svg/auth-svg";
import AuthFooter from "@/src/components/auth/AuthFooter";
import AuthHeading from "@/src/components/auth/AuthHeading";
import BackToSignIn from "@/src/components/auth/BackToSignIn";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import CustomInput from "@/src/components/shared/CustomInput";
import CustomSvg from "@/src/components/shared/CustomSvg";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { scale, verticalScale } from "@/src/utils/Scaling";
import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  return (
    <ScreenWrapper>
      <View className="flex-1 ">
        <View className="justify-center items-center mt-[20%]">
          <CustomSvg
            xml={forgotPasswordIcon}
            height={verticalScale(128)}
            width={scale(128)}
          />
        </View>
        <View className="">
          <AuthHeading
            title="Forgot your password?"
            subtitle="Enter your email address and we'll send you a verification code to reset your password."
          />
        </View>
        <CustomInput
          label="Email Address"
          labelColor="#0F172A"
          leftIcon="mail-outline"
          textInputConfig={{
            placeholder: "Enter your email",
            keyboardType: "email-address",
            autoCapitalize: "none",
            value: email,
            onChangeText: setEmail,
          }}
        />

        <View>
          <AuthFooter />
        </View>
        <View className="mt-[4%]">
          <GradientButton
            label="Send Code"
            onPress={() => router.push("/auth/verify-account")}
          />
        </View>
        <BackToSignIn />
      </View>
    </ScreenWrapper>
  );
};

export default ForgotPassword;
