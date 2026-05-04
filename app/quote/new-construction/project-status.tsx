// src/app/quote/new-construction/project-status.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateNewConstructionDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const CONSTRUCTION_STAGES = [
  "Preliminary",
  "Foundation in",
  "Framing complete",
  "Plumbing and/or HVAC installed",
  "Ready for electrical now",
];

export default function ProjectStatus() {
  const dispatch = useDispatch();

  const constructionBegun = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "10" && data.details)
      return data.details.constructionBegun;
    return "" as const;
  });

  const constructionStage = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "10" && data.details)
      return data.details.constructionStage;
    return "" as const;
  });

  const buildingPlanPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "10" && data.details)
      return data.details.buildingPlanPhotos;
    return [];
  });

  const hasBuildingPlans = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "10" && data.details)
      return data.details.hasBuildingPlans;
    return "" as const;
  });

  const buildingPlanPhotos2 = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "10" && data.details)
      return data.details.buildingPlanPhotos2;
    return [];
  });

  const isYes = constructionBegun === "Yes";
  const isNo = constructionBegun === "No";

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
          <CategoryTag title="New Construction" />

          {/* Project Status */}
          <AuthHeading title="Project status" subtitle="" />

          <OptionGrid
            label="Has construction begun on this project?"
            options={["Yes", "No"]}
            selected={constructionBegun}
            onSelect={(val) =>
              dispatch(
                updateNewConstructionDetails({
                  constructionBegun: val as any,
                  constructionStage: "",
                  buildingPlanPhotos: [],
                  hasBuildingPlans: "",
                  buildingPlanPhotos2: [],
                }),
              )
            }
            numColumns={1}
          />

          {/* Yes — construction stage + building plans upload */}
          {isYes && (
            <>
              <OptionGrid
                label="What stage is construction in?"
                options={CONSTRUCTION_STAGES}
                selected={constructionStage}
                onSelect={(val) =>
                  dispatch(
                    updateNewConstructionDetails({
                      constructionStage: val as any,
                    }),
                  )
                }
                numColumns={1}
              />

              <Text className="text-[#1E293B] text-[15px] font-Inter_Bold mb-3">
                Building plans
              </Text>

              <PhotoUploadSection
                label="Upload building plans"
                photos={buildingPlanPhotos}
                onPhotosChange={(p) =>
                  dispatch(
                    updateNewConstructionDetails({ buildingPlanPhotos: p }),
                  )
                }
              />
            </>
          )}

          {/* No — has building plans question */}
          {isNo && (
            <>
              <Text className="text-[#1E293B] text-[15px] font-Inter_Bold mb-3">
                Building plans
              </Text>

              <OptionGrid
                label="Do you have building plans for this project?"
                options={["Yes", "No"]}
                selected={hasBuildingPlans}
                onSelect={(val) =>
                  dispatch(
                    updateNewConstructionDetails({
                      hasBuildingPlans: val as any,
                      buildingPlanPhotos2: [],
                    }),
                  )
                }
                numColumns={1}
              />

              {/* Building plans Yes — upload */}
              {hasBuildingPlans === "Yes" && (
                <PhotoUploadSection
                  label="Upload building plans"
                  photos={buildingPlanPhotos2}
                  onPhotosChange={(p) =>
                    dispatch(
                      updateNewConstructionDetails({ buildingPlanPhotos2: p }),
                    )
                  }
                />
              )}
              {/* Building plans No — upload section দেখাবে না */}
            </>
          )}

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/common/review-request" as any)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
