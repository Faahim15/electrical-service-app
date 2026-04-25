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
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
                width={scale(158)}
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
            <TermsAndPolicy />

            {/* Create Account Button */}
            <GradientButton onPress={() => {}} label="Create Account" />

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
