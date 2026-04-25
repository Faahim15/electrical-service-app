import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import CustomInput from "@/src/components/shared/CustomInput";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import React, { useState } from "react";
import { View } from "react-native";

const ResetPassword = () => {
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  return (
    <ScreenWrapper>
      <View className="flex-1  ">
        <View className="mt-[30%] justify-center ">
          <AuthHeading title="Reset Password" subtitle="Change your password" />
        </View>

        <View className=" ">
          <CustomInput
            label="New Password"
            leftIcon="lock-closed-outline"
            textInputConfig={{
              placeholder: "Enter your new password",
              secureTextEntry: true,
              value: newpassword,
              onChangeText: setNewPassword,
            }}
          />
          <CustomInput
            label="Confirm Password"
            leftIcon="lock-closed-outline"
            textInputConfig={{
              placeholder: "Enter confirm password",
              secureTextEntry: true,
              value: confirmpassword,
              onChangeText: setConfirmPassword,
            }}
          />
        </View>

        <View className="mt-[3%]">
          <GradientButton label="Save" onPress={() => {}} />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ResetPassword;
