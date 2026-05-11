import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateRemodelingDetails } from "@/src/redux/slices/serviceFormSlice";
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

export default function PlansElectrical() {
  const dispatch = useDispatch();

  const hasPlans = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "4" && data.details) return data.details.hasPlans;
    return "" as const;
  });

  const planPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "4" && data.details)
      return data.details.planPhotos;
    return [];
  });

  const electricalNeeds = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "4" && data.details)
      return data.details.electricalNeeds;
    return "";
  });

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
          <StepProgressBar currentStep={5} totalSteps={9} />

          {/* Category Tag */}
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
                Remodel
              </Text>
            </View>
          </View>

          <AuthHeading
            title="Plans and electrical needs"
            subtitle="Help us understand the scope"
          />

          <OptionGrid
            label="Do you have any plans/drawings for the remodel?"
            options={["Yes", "No"]}
            selected={hasPlans}
            onSelect={(val) =>
              dispatch(updateRemodelingDetails({ hasPlans: val as any }))
            }
            numColumns={1}
          />

          {/* Plans upload — শুধু Yes select হলে */}
          {hasPlans === "Yes" && (
            <PhotoUploadSection
              label="Please upload the plans/drawings"
              photos={planPhotos}
              onPhotosChange={(p) =>
                dispatch(updateRemodelingDetails({ planPhotos: p }))
              }
            />
          )}

          <TextAreaInput
            label="What are the electrical needs for the remodel?"
            placeholder="Please describe receptacles, switches, lighting, etc."
            value={electricalNeeds}
            onChangeText={(text) =>
              dispatch(updateRemodelingDetails({ electricalNeeds: text }))
            }
            minHeight={120}
          />

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/remodeling/permit-info")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
