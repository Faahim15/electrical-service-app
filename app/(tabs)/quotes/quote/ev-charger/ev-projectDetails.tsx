import { nemaChart } from "@/assets/images/svg/tabs-svg";
import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import CustomSvg from "@/src/components/shared/CustomSvg";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import {
  setEVChargerType,
  setEVProvidingCharger,
  updateEVChargerDetails,
} from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

const CHARGER_TYPES = ["Plug-in", "Hardwired", "I want help deciding"];
const PROVIDING_OPTIONS = ["Yes", "No"];
const CHARGER_STATUS_OPTIONS = [
  "Currently have the charger",
  "Ordered and waiting on delivery",
  "Need to place order",
  "Need help choosing a charger",
];

const SectionLabel = ({
  label,
  hasInfo = false,
  onInfoPress,
}: {
  label: string;
  hasInfo?: boolean;
  onInfoPress?: () => void;
}) => (
  <View className="flex-row items-center mb-2" style={{ flexWrap: "wrap" }}>
    <Text
      className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold"
      style={{ flexShrink: 1, flexWrap: "wrap" }}
    >
      {label}
    </Text>
    {hasInfo && (
      <Pressable
        onPress={onInfoPress}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={{ marginLeft: 4 }}
      >
        <Ionicons name="information-circle-outline" size={16} color="#94A3B8" />
      </Pressable>
    )}
  </View>
);

const SelectOption = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <Pressable
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
  </Pressable>
);

export default function EVChargerDetails() {
  const dispatch = useDispatch();
  const [showNemaChart, setShowNemaChart] = useState(false);
  const { width: screenWidth } = useWindowDimensions();
  const chargerType = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.chargerType;
    return "" as const;
  });
  const nemaConfig = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.nemaConfig;
    return "";
  });
  const providingCharger = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.providingCharger;
    return "" as const;
  });
  const chargerStatus = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.chargerStatus;
    return "" as const;
  });

  const isPlugIn = chargerType === "Plug-in";
  const isHardwired = chargerType === "Hardwired";
  const showConditionalFields = isPlugIn || isHardwired;
  const showChargerStatus = showConditionalFields && providingCharger === "Yes";

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

          <CategoryTag title="EV Charger Installation" />

          <AuthHeading
            title="Project details"
            subtitle="Step 1 of your EV service questions"
          />

          {/* Charger Type */}
          <View className="mb-4">
            <SectionLabel label="Is your EV charger hardwired or a plug-in?" />
            {CHARGER_TYPES.map((option) => (
              <SelectOption
                key={option}
                label={option}
                selected={chargerType === option}
                onPress={() => dispatch(setEVChargerType(option as any))}
              />
            ))}
          </View>

          {showConditionalFields && (
            <>
              {/* NEMA Config - only for Plug-in */}
              {isPlugIn && (
                <View className="mb-4">
                  <SectionLabel
                    label="What NEMA configuration do you need?"
                    hasInfo
                    onInfoPress={() => setShowNemaChart((prev) => !prev)}
                  />

                  <TextInput
                    placeholder="14-50, 6-50, 14-30, unsure, etc."
                    placeholderTextColor="#AABCD0"
                    value={nemaConfig}
                    onChangeText={(text) =>
                      dispatch(updateEVChargerDetails({ nemaConfig: text }))
                    }
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: 12,
                      borderWidth: 1.5,
                      borderColor: "#E2E8F0",
                      paddingHorizontal: 14,
                      paddingVertical: 13,
                      fontFamily: "Inter-Regular",
                      fontSize: 13.5,
                      color: "#1E293B",
                      shadowColor: "#94A3B8",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.07,
                      shadowRadius: 3,
                      elevation: 1,
                    }}
                  />

                  {/* NEMA Chart — inline toggle */}
                  {showNemaChart && (
                    <View
                      className="mt-3 rounded-2xl overflow-hidden"
                      style={{
                        borderWidth: 1,
                        borderColor: "#BAE6FD",
                        shadowColor: "#0EA5E9",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 3,
                      }}
                    >
                      {/* Header */}
                      <View
                        className="flex-row items-center justify-between px-4 py-3"
                        style={{ backgroundColor: "#EEF9FF" }}
                      >
                        <Text className="text-lg font-Inter_SemiBold text-[#0369A1]">
                          {/* NEMA Configuration Chart */}
                        </Text>
                        <Pressable
                          onPress={() => setShowNemaChart(false)}
                          className="w-[26px] h-[26px] rounded-full items-center justify-center"
                          style={{ backgroundColor: "#BAE6FD" }}
                        >
                          <Ionicons name="close" size={14} color="#0369A1" />
                        </Pressable>
                      </View>

                      {/* SVG — full width, scrollable vertically */}
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        style={{ backgroundColor: "#F0F9FF", maxHeight: 900 }}
                      >
                        <CustomSvg
                          xml={nemaChart}
                          width={screenWidth - 48}
                          height={800}
                        />
                      </ScrollView>
                    </View>
                  )}
                </View>
              )}

              {/* Providing Charger */}
              <View className="mb-4">
                <SectionLabel label="Will you be providing the charger?" />
                {PROVIDING_OPTIONS.map((option) => (
                  <SelectOption
                    key={option}
                    label={option}
                    selected={providingCharger === option}
                    onPress={() =>
                      dispatch(setEVProvidingCharger(option as any))
                    }
                  />
                ))}
              </View>

              {/* Charger Status */}
              {showChargerStatus && (
                <View className="mb-4">
                  <SectionLabel label="What is the status of the charger?" />
                  {CHARGER_STATUS_OPTIONS.map((option) => (
                    <SelectOption
                      key={option}
                      label={option}
                      selected={chargerStatus === option}
                      onPress={() =>
                        dispatch(
                          updateEVChargerDetails({
                            chargerStatus: option as any,
                          }),
                        )
                      }
                    />
                  ))}
                </View>
              )}
            </>
          )}

          <View className="mb-[4%]">
            <GradientButton
              label="Continue"
              onPress={() =>
                router.push(
                  "/(tabs)/quotes/quote/ev-charger/installation-location",
                )
              }
            />
            <SavedEditAction />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
