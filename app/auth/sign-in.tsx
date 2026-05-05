import {
  appIcon,
  appleIconXml,
  googleIconXml,
} from "@/assets/images/svg/auth-svg";
import Apptext from "@/src/components/auth/Apptext";
import AuthHeading from "@/src/components/auth/AuthHeading";
import Divider from "@/src/components/auth/Divider";
import Footer from "@/src/components/auth/Footer";
import ForgotPassword from "@/src/components/auth/ForgotPassword";
import SignUpLink from "@/src/components/auth/SignUpLink";
import SocialButton from "@/src/components/auth/SocialButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import CustomInput from "@/src/components/shared/CustomInput";
import CustomSvg from "@/src/components/shared/CustomSvg";
import { scale, verticalScale } from "@/src/utils/Scaling";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
                xml={appIcon}
                height={verticalScale(92)}
                width={scale(158)}
              />
            </View>

            {/* Brand Name */}
            <Apptext
              title="Four Elements Electric"
              className="font-Inter_Bold text-center text-2xl"
            />

            {/* Heading */}
            <AuthHeading
              title="Welcome back"
              subtitle="Sign in to manage quotes, reminders, saved services, and notifications."
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

            {/* Password Input */}
            <CustomInput
              label="Password"
              leftIcon="lock-closed-outline"
              textInputConfig={{
                placeholder: "Enter your password",
                secureTextEntry: true,
                value: password,
                onChangeText: setPassword,
              }}
            />

            {/* Remember Me + Forgot Password */}
            <ForgotPassword
              onPress={() => router.push("/auth/forgot-password")}
              title="Remember me"
              subtitle="Forgot Password?"
            />

            {/* Sign In Button */}
            <GradientButton
              onPress={() => router.push("/(tabs)/home")}
              label="Sign In"
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

            {/* Sign Up Link */}
            <SignUpLink
              onPress={() => router.push("/auth/sign-up")}
              title=" Don't have an account?"
              subtitle="Sign Up"
            />

            {/* Footer */}
            <Footer />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
