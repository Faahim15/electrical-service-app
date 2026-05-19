import {
  appleIconXml,
  createAccountIcon,
  googleIconXml,
} from "@/assets/images/svg/auth-svg";
import AuthHeading from "@/src/components/auth/AuthHeading";
import Divider from "@/src/components/auth/Divider";
import Footer from "@/src/components/auth/Footer";
import SignInLink from "@/src/components/auth/SignUpLink";
import SocialButton from "@/src/components/auth/SocialButton";
import TermsAndPolicy from "@/src/components/auth/TermsAndPolicy";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import CustomInput from "@/src/components/shared/CustomInput";
import CustomSvg from "@/src/components/shared/CustomSvg";
import { scale, verticalScale } from "@/src/utils/Scaling";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

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
export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const metCount = CRITERIA.filter((c) => c.test(password)).length;
  const level = getLevel(metCount);
  const showMeter = password.length > 0;

  return (
    <LinearGradient
      colors={["#F9FBFD", "#E0F2FE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-[6%] pt-[10%] pb-[9%]">
            {/* Logo */}
            <View className="items-center">
              <CustomSvg
                xml={createAccountIcon}
                height={verticalScale(92)}
                width={scale(108)}
              />
            </View>

            {/* Heading */}
            <AuthHeading
              title="Create your account"
              subtitle="Set up your profile to request quotes faster, track reminders, and save helpful resources."
            />

            {/* Full Name Input */}
            <CustomInput
              label="Full Name"
              leftIcon="person-outline"
              textInputConfig={{
                placeholder: "Enter your full name",
                autoCapitalize: "words",
                value: fullName,
                onChangeText: setFullName,
              }}
            />

            {/* Email Input */}
            <CustomInput
              label="Email Address"
              leftIcon="mail-outline"
              textInputConfig={{
                placeholder: "Enter your email",
                keyboardType: "email-address",
                autoCapitalize: "none",
                value: email,
                onChangeText: setEmail,
              }}
            />

            {/* Phone Number Input */}
            <CustomInput
              label="Phone Number"
              leftIcon="call-outline"
              textInputConfig={{
                placeholder: "Enter your phone number",
                keyboardType: "phone-pad",
                value: phone,
                onChangeText: setPhone,
              }}
            />

            {/* Password Input */}
            <CustomInput
              label="Password"
              leftIcon="lock-closed-outline"
              textInputConfig={{
                placeholder: "Create a password",
                secureTextEntry: true,
                value: password,
                onChangeText: setPassword,
              }}
            />

            {/* ── Strength meter (password only) ── */}
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
                  className="text-xs font-Inter_SemiBold mb-2"
                  style={{ color: level.color }}
                >
                  {level.label}
                </Text>

                {/* Criteria checklist */}
                {CRITERIA.map((c) => {
                  const met = c.test(password);
                  return (
                    <View
                      key={c.id}
                      className="flex-row items-center gap-x-2 mb-1"
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

            {/* Confirm Password Input */}
            <CustomInput
              label="Confirm Password"
              leftIcon="lock-closed-outline"
              textInputConfig={{
                placeholder: "Confirm your password",
                secureTextEntry: true,
                value: confirmPassword,
                onChangeText: setConfirmPassword,
              }}
            />

            {/* Terms & Privacy Policy */}
            <TermsAndPolicy
              onPressTerms={() =>
                router.push("/(page)/(profile)/(setting)/terms")
              }
            />

            {/* Create Account Button */}
            <GradientButton
              onPress={() => router.push("/(tabs)/home")}
              label="Create Account"
            />

            {/* Divider */}
            <Divider title="or continue with" />

            {/* Social Buttons */}
            <View className="gap-3">
              <SocialButton
                onPress={() => {}}
                label="Continue with Google"
                svgXml={googleIconXml}
              />
              <SocialButton
                onPress={() => {}}
                label="Continue with Apple"
                svgXml={appleIconXml}
              />
            </View>

            {/* Sign In Link */}
            <SignInLink
              onPress={() => router.push("/auth/sign-in")}
              title="Already have an account?"
              subtitle="Sign In"
            />

            {/* Footer */}
            <Footer />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
