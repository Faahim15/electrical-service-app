import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import {
  selectCategory,
  updatePanelUpgradeDetails,
} from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SERVICE_TYPES = ["Replacement", "Upgrade"] as const;
const AMP_OPTIONS = ["100", "150", "200", "300", "350", "400"] as const;

const SelectOption = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={{
      paddingVertical: 13,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: selected ? "#0EA5E9" : "#FFFFFF",
      borderWidth: 1.5,
      borderColor: selected ? "#0EA5E9" : "#E2E8F0",
      marginBottom: 10,
      shadowColor: "#94A3B8",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: selected ? 0 : 0.07,
      shadowRadius: 3,
      elevation: selected ? 0 : 1,
    }}
  >
    <Text
      className="text-[13.5px] font-Inter_Medium"
      style={{ color: selected ? "#FFFFFF" : "#475569" }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default function PanelServiceType() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectCategory("3"));
  }, []);

  const serviceType = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "3" && data.details)
      return data.details.serviceType;
    return "" as const;
  });

  const upgradeAmps = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "3" && data.details)
      return data.details.upgradeAmps;
    return "" as const;
  });

  const isUpgrade = serviceType === "Upgrade";

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
          <StepProgressBar currentStep={4} totalSteps={9} />

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
                Panel Upgrade / Replacement
              </Text>
            </View>
          </View>

          <AuthHeading title="Service type" subtitle="What do you need?" />

          {/* Service Type */}
          <View className="mb-4">
            <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold mb-3">
              Do you need a replacement or upgrade?
            </Text>
            {SERVICE_TYPES.map((option) => (
              <SelectOption
                key={option}
                label={option}
                selected={serviceType === option}
                onPress={() => {
                  dispatch(updatePanelUpgradeDetails({ serviceType: option }));
                  if (option === "Replacement") {
                    dispatch(updatePanelUpgradeDetails({ upgradeAmps: "" }));
                  }
                }}
              />
            ))}
          </View>

          {/* Amp Options — শুধু Upgrade select হলে দেখাবে */}
          {isUpgrade && (
            <View className="mb-4">
              <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold mb-3">
                How many amps are you upgrading to?
              </Text>
              {AMP_OPTIONS.map((option) => (
                <SelectOption
                  key={option}
                  label={option}
                  selected={upgradeAmps === option}
                  onPress={() =>
                    dispatch(updatePanelUpgradeDetails({ upgradeAmps: option }))
                  }
                />
              ))}
            </View>
          )}

          <GradientButton
            label="Continue"
            onPress={() =>
              router.push("/quote/panel-upgrade/current-panel-details")
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
