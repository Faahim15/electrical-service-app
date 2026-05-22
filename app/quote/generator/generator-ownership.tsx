import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateGeneratorDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const KW_OUTPUTS = [
  "Small (2kW - 4kW)",
  "Medium (4kW – 7kW)",
  "Large (7kW – 10kW+)",
  "I'm not sure",
];
const BACKUP_OPTIONS = [
  "Whole panel with interlock",
  "Dedicated generator panel",
  "Unsure",
];
const PANEL_DISTANCES = [
  "Less than 25 ft",
  "25 – 55 ft",
  "50 – 100 ft",
  "More than 100 ft",
  "Unsure",
];
const PANEL_LOCATIONS = [
  "Basement (Finished)",
  "Basement (Unfinished)",
  "Garage (Finished)",
  "Garage (Unfinished)",
  "Other (please specify)",
];
const PURCHASE_SIZES = [
  "Small (2kW - 4kW)",
  "Medium (4kW – 7kW)",
  "Large (7kW – 10kW+)",
  "I'm not sure",
];

export default function GeneratorOwnership() {
  const dispatch = useDispatch();

  const hasGenerator = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details)
      return data.details.hasGenerator;
    return "" as const;
  });

  const kwOutput = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details) return data.details.kwOutput;
    return "" as const;
  });

  const backupInstallation = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details)
      return data.details.backupInstallation;
    return "" as const;
  });

  const generatorPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details)
      return data.details.generatorPhotos;
    return [];
  });

  const panelDistance = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details)
      return data.details.panelDistance;
    return "" as const;
  });

  const panelLocation = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details)
      return data.details.panelLocation;
    return "" as const;
  });

  const purchaseSize = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details)
      return data.details.purchaseSize;
    return "" as const;
  });

  const hasExisting = hasGenerator === "Yes";
  const isPurchasing = hasGenerator === "No";

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
          <StepProgressBar currentStep={5} totalSteps={7} />
          <CategoryTag title="Generator Installation" />

          <AuthHeading title="Generator ownership" subtitle="" />

          <OptionGrid
            label="Do you already have the generator?"
            options={["Yes", "No"]}
            selected={hasGenerator}
            onSelect={(val) =>
              dispatch(
                updateGeneratorDetails({
                  hasGenerator: val as any,
                  kwOutput: "",
                  backupInstallation: "",
                  generatorPhotos: [],
                  panelDistance: "",
                  panelLocation: "",
                  purchaseSize: "",
                }),
              )
            }
            numColumns={1}
          />

          {/* Yes — already have generator */}
          {hasExisting && (
            <>
              <OptionGrid
                label="What is the kW output for this generator?"
                options={KW_OUTPUTS}
                selected={kwOutput}
                onSelect={(val) =>
                  dispatch(updateGeneratorDetails({ kwOutput: val as any }))
                }
                numColumns={1}
              />

              <OptionGrid
                label="What is your preferred back-up installation?"
                options={BACKUP_OPTIONS}
                selected={backupInstallation}
                onSelect={(val) =>
                  dispatch(
                    updateGeneratorDetails({ backupInstallation: val as any }),
                  )
                }
                numColumns={1}
              />

              {/* <PhotoUploadSection
                label="upload photo of the receptacle on the generator"
                photos={generatorPhotos}
                onPhotosChange={(p) =>
                  dispatch(updateGeneratorDetails({ generatorPhotos: p }))
                }
              /> */}

              <OptionGrid
                label="What is the approximate distance of the electrical panel from inlet location?"
                options={PANEL_DISTANCES}
                selected={panelDistance}
                onSelect={(val) =>
                  dispatch(
                    updateGeneratorDetails({ panelDistance: val as any }),
                  )
                }
                numColumns={1}
              />

              <OptionGrid
                label="Where is your electrical panel located?"
                options={PANEL_LOCATIONS}
                selected={panelLocation}
                onSelect={(val) =>
                  dispatch(
                    updateGeneratorDetails({ panelLocation: val as any }),
                  )
                }
                numColumns={1}
              />
              {/* Show TextAreaInput only when "Other" is selected */}
              {panelLocation === "Other (please specify)" && (
                <TextAreaInput
                  label="Please specify location"
                  placeholder="Describe where the panel is located..."
                  value={""} // You might want to add a specific 'otherPanelLocation' field to your Redux slice later
                  onChangeText={(text) => {
                    // For now, we can append it or handle it via a new state field
                    // If you want to save the specific text, you'll need a field in GeneratorDetails
                    console.log("Specified location:", text);
                  }}
                />
              )}
            </>
          )}

          {/* No — purchasing */}
          {isPurchasing && (
            <>
              <OptionGrid
                label="What size generator will you be purchasing?"
                options={PURCHASE_SIZES}
                selected={purchaseSize}
                onSelect={(val) =>
                  dispatch(updateGeneratorDetails({ purchaseSize: val as any }))
                }
                numColumns={1}
              />

              <OptionGrid
                label="What is your preferred back-up installation?"
                options={BACKUP_OPTIONS}
                selected={backupInstallation}
                onSelect={(val) =>
                  dispatch(
                    updateGeneratorDetails({ backupInstallation: val as any }),
                  )
                }
                numColumns={1}
              />
              {/* <PhotoUploadSection
                label="Upload photo of where your generator inlet will be"
                photos={generatorPhotos}
                onPhotosChange={(p) =>
                  dispatch(updateGeneratorDetails({ generatorPhotos: p }))
                }
              /> */}
              <OptionGrid
                label="What is the approximate distance of the electrical panel from inlet location?"
                options={PANEL_DISTANCES}
                selected={panelDistance}
                onSelect={(val) =>
                  dispatch(
                    updateGeneratorDetails({ panelDistance: val as any }),
                  )
                }
                numColumns={1}
              />

              <OptionGrid
                label="Where is your electrical panel located?"
                options={PANEL_LOCATIONS}
                selected={panelLocation}
                onSelect={(val) =>
                  dispatch(
                    updateGeneratorDetails({ panelLocation: val as any }),
                  )
                }
                numColumns={1}
              />
              {(panelLocation === "Other (please specify)" ||
                (!PANEL_LOCATIONS.includes(panelLocation) &&
                  panelLocation !== "")) && (
                <TextAreaInput
                  label="Please specify location"
                  placeholder="Describe where the panel is located..."
                  value={
                    PANEL_LOCATIONS.includes(panelLocation) ? "" : panelLocation
                  }
                  onChangeText={(text) =>
                    dispatch(
                      updateGeneratorDetails({ panelLocation: text as any }),
                    )
                  }
                />
              )}
            </>
          )}
          <View className="mt-[3%]">
            <GradientButton
              label="Continue"
              onPress={() => router.push("/quote/generator/photos-needed")}
            />
          </View>
          <SavedEditAction />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
