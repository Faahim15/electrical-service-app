import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateAccessoryBuildingDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { verticalScale } from "@/src/utils/Scaling";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const BUILDING_STATUS = ["Yes", "No", "Will be delivered / built soon"];
const CONSTRUCTION_TYPES = [
  "Metal/Steel",
  "Pole Barn",
  "Wood (Pre-fabricated)",
  "Wood (built on site)",
];
const FLOOR_TYPES = ["Dirt", "Stone", "Wood", "Concrete"];

export default function ConstructionDetails() {
  const dispatch = useDispatch();

  const buildingStatus = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.buildingStatus;
    return "" as const;
  });

  const constructionType = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.constructionType;
    return "" as const;
  });

  const floorType = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details) return data.details.floorType;
    return "" as const;
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
          contentContainerStyle={{ paddingBottom: verticalScale(120) }}
        >
          <StepProgressBar currentStep={5} totalSteps={12} />
          <CategoryTag title="Accessory Building Power / Shed Power" />

          <AuthHeading title="Construction details" subtitle="" />

          <OptionGrid
            label="Is it already built or delivered on site?"
            options={BUILDING_STATUS}
            selected={buildingStatus}
            onSelect={(val) =>
              dispatch(
                updateAccessoryBuildingDetails({ buildingStatus: val as any }),
              )
            }
            numColumns={1}
          />

          <OptionGrid
            label="Type of construction"
            options={CONSTRUCTION_TYPES}
            selected={constructionType}
            onSelect={(val) =>
              dispatch(
                updateAccessoryBuildingDetails({
                  constructionType: val as any,
                }),
              )
            }
            numColumns={1}
          />

          <OptionGrid
            label="Type of floor it will have"
            options={FLOOR_TYPES}
            selected={floorType}
            onSelect={(val) =>
              dispatch(
                updateAccessoryBuildingDetails({ floorType: val as any }),
              )
            }
            numColumns={1}
          />
          <View className="mt-[3%]">
            <GradientButton
              label="Continue"
              onPress={() =>
                router.push(
                  "/(tabs)/quotes/quote/accessory-building/electrical-needs",
                )
              }
            />
          </View>
          <SavedEditAction />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
