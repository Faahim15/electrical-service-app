import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateEVChargerDetails } from "@/src/redux/slices/serviceFormSlice";
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

const PANEL_LOCATIONS = [
  "Basement (Finished)",
  "Basement (Unfinished)",
  "Garage (Finished)",
  "Garage (Unfinished)",
  "Other (please specify)",
];

const PANEL_DISTANCES = [
  "Less than 25 ft",
  "25–50 ft",
  "50–100 ft",
  "More than 100 ft",
  "Unsure",
];

export default function PanelLocation() {
  const dispatch = useDispatch();
  const panelLocation = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.panelLocation;
    return "" as const;
  });
  const panelDistance = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.panelDistance;
    return "" as const;
  });
  const panelLocationOther = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.panelLocationOther;
    return "";
  });

  console.log("panelLocatio", panelLocation);
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
          <StepProgressBar currentStep={6} />

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
                EV Charger Installation
              </Text>
            </View>
          </View>

          <AuthHeading
            title="Panel location"
            subtitle="Help us understand your electrical panel"
          />

          <OptionGrid
            label="Where is your electrical panel located?"
            options={PANEL_LOCATIONS}
            selected={panelLocation || ""}
            onSelect={(val) =>
              dispatch(updateEVChargerDetails({ panelLocation: val as any }))
            }
            numColumns={1}
          />
          {panelLocation === "Other (please specify)" && (
            <TextAreaInput
              label="Please specify"
              placeholder="Describe your panel location"
              value={panelLocationOther ?? ""}
              onChangeText={(text) =>
                dispatch(updateEVChargerDetails({ panelLocationOther: text }))
              }
            />
          )}

          <View className="mb-2">
            <OptionGrid
              label="What is the approximate distance of the electrical panel from charger install location?"
              options={PANEL_DISTANCES}
              selected={panelDistance || ""}
              onSelect={(val) =>
                dispatch(updateEVChargerDetails({ panelDistance: val as any }))
              }
              numColumns={1}
            />

            <Text className="text-[#94A3B8] text-sm font-Inter_Regular -mt-3 mb-3">
              Measured along walls and ceiling in right angles
            </Text>
          </View>

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/ev-charger/additional-info")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
