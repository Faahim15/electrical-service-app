import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { setProjectDetails } from "@/src/redux/slices/servicDetailSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProjectDetails() {
  const dispatch = useDispatch();

  const { projectDetails } = useSelector(
    (state: RootState) => state.serviceDetails,
  );

  const selectedCategory = useSelector(
    (state: RootState) => state.categoryRoute.selectedCategory,
  );

  return (
    <ScreenWrapper paddingHorizontal={20}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <BackButton />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <StepProgressBar currentStep={4} />

          {/* Category Tag */}
          {selectedCategory && (
            <View className="self-start mb-4">
              <View
                className="px-3 py-[6px] rounded-full"
                style={{
                  backgroundColor: "#EEF9FF",
                  borderWidth: 1,
                  borderColor: "#BAE6FD",
                }}
              >
                <Text className="text-[#0EA5E9] text-[12.5px] font-Inter_Medium">
                  {selectedCategory.title}
                </Text>
              </View>
            </View>
          )}

          <AuthHeading
            title="Project details"
            subtitle="Step 1 of your service questions"
          />

          <TextAreaInput
            label="Explain the issue you are having"
            placeholder="Explain the issue details, concerns, or special requirements..."
            value={projectDetails}
            onChangeText={(text) => dispatch(setProjectDetails(text))}
          />

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/service-call/final-projectQ")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
