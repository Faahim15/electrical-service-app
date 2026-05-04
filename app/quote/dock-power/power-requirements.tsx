// src/app/quote/dock-power/power-requirements.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateDockPowerDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SERVICE_TYPES = ["New service", "Sub-panel", "1-2 dedicated circuits"];
const NEW_SERVICE_SIZES = [
  "100 amp",
  "125 amp",
  "150 amp",
  "200 amp",
  "300 amp",
  "350 amp",
  "400 amp",
  "Unsure",
  "Other",
];
const SUB_PANEL_SIZES = [
  "30 amp",
  "50 amp",
  "60 amp",
  "100 amp",
  "125 amp",
  "Unsure",
  "Other",
];
const CIRCUIT_COUNTS = ["1", "2"];
const AMP_RATINGS = ["15", "20"];
const PANEL_LOCATIONS = [
  "Basement (Finished)",
  "Basement (Unfinished)",
  "Garage (Finished)",
  "Garage (Unfinished)",
  "Other (please specify)",
];

export default function PowerRequirements() {
  const dispatch = useDispatch();

  const serviceType = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details)
      return data.details.serviceType;
    return "" as const;
  });

  const newServiceSize = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details)
      return data.details.newServiceSize;
    return "" as const;
  });

  const subPanelSize = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details)
      return data.details.subPanelSize;
    return "" as const;
  });

  const circuitCount = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details)
      return data.details.circuitCount;
    return "" as const;
  });

  const ampRating = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details) return data.details.ampRating;
    return "" as const;
  });

  const panelLocation = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details)
      return data.details.panelLocation;
    return "" as const;
  });

  const panelPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details)
      return data.details.panelPhotos;
    return [];
  });

  const isNewService = serviceType === "New service";
  const isSubPanel = serviceType === "Sub-panel";
  const isDedicatedCircuits = serviceType === "1-2 dedicated circuits";
  const showPanelSection = isNewService || isSubPanel || isDedicatedCircuits;

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
          <StepProgressBar currentStep={5} />
          <CategoryTag title="Dock Power" />

          <AuthHeading title="Power requirements" subtitle="" />

          <OptionGrid
            label="Will you need a new service (panel and meter), sub-panel, or 1-2 dedicated circuits to power the Dock power?"
            options={SERVICE_TYPES}
            selected={serviceType}
            onSelect={(val) =>
              dispatch(
                updateDockPowerDetails({
                  serviceType: val as any,
                  newServiceSize: "",
                  subPanelSize: "",
                  circuitCount: "",
                  ampRating: "",
                }),
              )
            }
            numColumns={1}
          />

          {/* New Service */}
          {isNewService && (
            <OptionGrid
              label="What size service do you need?"
              options={NEW_SERVICE_SIZES}
              selected={newServiceSize}
              onSelect={(val) =>
                dispatch(updateDockPowerDetails({ newServiceSize: val as any }))
              }
              numColumns={1}
            />
          )}

          {/* Sub-panel */}
          {isSubPanel && (
            <OptionGrid
              label="What size sub-panel do you need?"
              options={SUB_PANEL_SIZES}
              selected={subPanelSize}
              onSelect={(val) =>
                dispatch(updateDockPowerDetails({ subPanelSize: val as any }))
              }
              numColumns={1}
            />
          )}

          {/* 1-2 dedicated circuits */}
          {isDedicatedCircuits && (
            <>
              <OptionGrid
                label="Would you like 1 or 2 circuits"
                options={CIRCUIT_COUNTS}
                selected={circuitCount}
                onSelect={(val) =>
                  dispatch(updateDockPowerDetails({ circuitCount: val as any }))
                }
                numColumns={1}
              />
              <OptionGrid
                label="What amp rating for the circuit(s)?"
                options={AMP_RATINGS}
                selected={ampRating}
                onSelect={(val) =>
                  dispatch(updateDockPowerDetails({ ampRating: val as any }))
                }
                numColumns={1}
              />
            </>
          )}

          {/* Panel location + photo — সব service type এ */}
          {showPanelSection && (
            <>
              <OptionGrid
                label="Where is your electrical panel located?"
                options={PANEL_LOCATIONS}
                selected={panelLocation}
                onSelect={(val) =>
                  dispatch(
                    updateDockPowerDetails({ panelLocation: val as any }),
                  )
                }
                numColumns={1}
              />

              <PhotoUploadSection
                label="Please upload clear photo of electrical panel up close so we can see the numbers and about 10 ft away."
                photos={panelPhotos}
                onPhotosChange={(p) =>
                  dispatch(updateDockPowerDetails({ panelPhotos: p }))
                }
              />
            </>
          )}

          <GradientButton
            label="Continue"
            onPress={() =>
              router.push("/quote/dock-power/route-details" as any)
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
