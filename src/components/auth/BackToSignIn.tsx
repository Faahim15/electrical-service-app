import { router } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

export default function BackToSignIn() {
  return (
    <Pressable onPress={() => router.replace("/auth/sign-in")}>
      <Text className="text-[#0EA5E9] mt-[4%] text-center font-Inter_SemiBold text-base ">
        Back to Sign In
      </Text>
    </Pressable>
  );
}
