import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import CustomInput from "@/src/components/shared/CustomInput";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

// ── helpers ──────────────────────────────────────────────────────────────────
const CRITERIA = [
  {
    id: "len",
    label: "At least 8 characters",
    test: (v: string) => v.length >= 8,
  },
  {
    id: "upper",
    label: "Uppercase letter (A–Z)",
    test: (v: string) => /[A-Z]/.test(v),
  },
  {
    id: "lower",
    label: "Lowercase letter (a–z)",
    test: (v: string) => /[a-z]/.test(v),
  },
  { id: "num", label: "Number (0–9)", test: (v: string) => /[0-9]/.test(v) },
  {
    id: "sym",
    label: "Special character (!@#$…)",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];

const LEVELS = [
  { max: 1, label: "Weak", color: "#ff3b30" },
  { max: 2, label: "Fair", color: "#ff9500" },
  { max: 4, label: "Good", color: "#ffcc00" },
  { max: 5, label: "Strong", color: "#34c759" },
];

function getLevel(score: number) {
  return LEVELS.find((l) => score <= l.max) ?? LEVELS[LEVELS.length - 1];
}

// ── component ─────────────────────────────────────────────────────────────────
const ResetPassword = () => {
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const metCount = CRITERIA.filter((c) => c.test(newpassword)).length;
  const level = getLevel(metCount);
  const showMeter = newpassword.length > 0;

  return (
    <ScreenWrapper>
      <View className="flex-1">
        <View className="mt-[30%] justify-center">
          <AuthHeading title="Reset Password" subtitle="Change your password" />
        </View>

        <View>
          {/* ── New Password ── */}
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

          {/* ── Strength meter (new password only) ── */}
          {showMeter && (
            <View className="px-1 mb-3 -mt-2">
              {/* 4-segment bar */}
              <View className="flex-row mt-[2%] gap-x-1.5 mb-1.5">
                {[1, 2, 3, 4].map((seg) => (
                  <View
                    key={seg}
                    className="flex-1 h-1 rounded-full"
                    style={{
                      backgroundColor:
                        metCount >= seg ? level.color : "#e5e5ea",
                    }}
                  />
                ))}
              </View>

              {/* Strength label */}
              <Text
                className="text-xs  font-Inter_SemiBold mb-2"
                style={{ color: level.color }}
              >
                {level.label}
              </Text>

              {/* Criteria checklist */}
              {CRITERIA.map((c) => {
                const met = c.test(newpassword);
                return (
                  <View
                    key={c.id}
                    className="flex-row items-center gap-x-2  mb-1"
                  >
                    <View
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: met ? "#34c759" : "transparent",
                        borderWidth: 1.5,
                        borderColor: met ? "#34c759" : "#c7c7cc",
                      }}
                    />
                    <Text
                      className="font-Inter_Regular text-xs"
                      style={{ color: met ? "#34c759" : "#8e8e93" }}
                    >
                      {c.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          {/* ── Confirm Password ── */}
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
          <GradientButton
            label="Save"
            onPress={() => router.replace("/auth/sign-in")}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ResetPassword;
