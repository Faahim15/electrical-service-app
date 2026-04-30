import { GradientButton } from "@/src/components/onboarding/GradientButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { SERVICE_CATEGORIES } from "@/src/constants/tabs.home.constant";
import { RootState } from "@/src/redux/store";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const ReviewRow = ({ label, value }: { label: string; value: string }) => (
  <View
    className="bg-white rounded-2xl px-4 py-4 mb-3"
    style={{
      shadowColor: "#94A3B8",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.07,
      shadowRadius: 4,
      elevation: 1,
    }}
  >
    <Text className="text-[#94A3B8] text-[11.5px] font-Inter_Medium mb-1">
      {label}
    </Text>
    <Text className="text-[#1E293B] text-[14px] font-Inter_SemiBold">
      {value || "None provided"}
    </Text>
  </View>
);

const ReviewPhotos = ({
  label,
  photos,
}: {
  label: string;
  photos: string[];
}) => {
  if (photos.length === 0)
    return <ReviewRow label={label} value="No photos added" />;
  return (
    <View
      className="bg-white rounded-2xl px-4 py-4 mb-3"
      style={{
        shadowColor: "#94A3B8",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 1,
      }}
    >
      <Text className="text-[#94A3B8] text-[11.5px] font-Inter_Medium mb-2">
        {label}
      </Text>
      <FlatList
        data={photos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: 64, height: 64, borderRadius: 8 }}
            contentFit="cover"
          />
        )}
      />
    </View>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <Text className="text-[#0EA5E9] text-[12px] font-Inter_SemiBold uppercase tracking-widest mb-2 mt-2">
    {title}
  </Text>
);

export default function ReviewRequest() {
  // Common data
  const selectedCategoryId = useSelector(
    (state: RootState) => state.serviceForm.selectedCategoryId,
  );
  const contactDetails = useSelector(
    (state: RootState) => state.serviceForm.contactDetails,
  );
  const serviceAddress = useSelector(
    (state: RootState) => state.serviceForm.serviceAddress,
  );
  const projectBasics = useSelector(
    (state: RootState) => state.serviceForm.projectBasics,
  );
  const categoryData = useSelector(
    (state: RootState) => state.serviceForm.categoryData,
  );

  // Category title SERVICE_CATEGORIES থেকে নাও
  const selectedCategory = SERVICE_CATEGORIES.find(
    (c) => c.id === selectedCategoryId,
  );

  return (
    <ScreenWrapper paddingHorizontal={20}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <StepProgressBar currentStep={8} />

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

          <Text className="text-[#1E293B] text-[22px] font-Inter_Bold mb-1">
            Review your request
          </Text>
          <Text className="text-[#64748B] text-[13.5px] font-Inter_Regular mb-5">
            Check your answers before sending
          </Text>

          {/* Contact — সব category র জন্য same */}
          <SectionTitle title="Contact Details" />
          <ReviewRow label="Full Name" value={contactDetails.fullName} />
          <ReviewRow label="Email Address" value={contactDetails.email} />
          <ReviewRow label="Phone Number" value={contactDetails.phone} />
          <ReviewRow
            label="Preferred Contact"
            value={contactDetails.preferredContact}
          />

          {/* Address — সব category র জন্য same */}
          <SectionTitle title="Service Address" />
          <ReviewRow
            label="Street Address"
            value={serviceAddress.streetAddress}
          />
          <ReviewRow
            label="Apartment / Unit"
            value={serviceAddress.apartment}
          />
          <ReviewRow label="City" value={serviceAddress.city} />
          <ReviewRow label="State" value={serviceAddress.state} />
          <ReviewRow label="Zip Code" value={serviceAddress.zipCode} />
          <ReviewRow
            label="Home Address"
            value={serviceAddress.isHomeAddress ? "Yes" : "No"}
          />

          {/* Project Basics — সব category র জন্য same */}
          <SectionTitle title="Project Basics" />
          <ReviewRow label="Property Type" value={projectBasics.propertyType} />
          <ReviewRow
            label="Ownership Status"
            value={projectBasics.ownershipStatus}
          />
          <ReviewRow
            label="Timeline / Urgency"
            value={projectBasics.timeline}
          />

          {/* Category Specific — id দিয়ে আলাদা করা */}
          {categoryData?.categoryId === "1" && categoryData.details && (
            <>
              <SectionTitle title="Project Details" />
              <ReviewRow
                label="Issue Description"
                value={categoryData.details.projectDetails}
              />

              <SectionTitle title="Scheduling" />
              <ReviewRow
                label="Preferred Time"
                value={categoryData.details.preferredTime}
              />
              <ReviewRow
                label="Preferred Days"
                value={categoryData.details.schedulingDays.join(", ")}
              />

              <SectionTitle title="Photos" />
              <ReviewPhotos
                label="Panel Photos"
                photos={categoryData.details.panelPhotos}
              />
              <ReviewPhotos
                label="Work Area Photos"
                photos={categoryData.details.workAreaPhotos}
              />
              <ReviewPhotos
                label="Extra Reference Photos"
                photos={categoryData.details.referencePhotos}
              />

              <SectionTitle title="Additional Notes" />
              <ReviewRow
                label="Notes"
                value={categoryData.details.additionalNotes}
              />
              <ReviewRow
                label="Quick Tags"
                value={categoryData.details.quickTags.join(", ")}
              />
            </>
          )}

          {categoryData?.categoryId === "2" && categoryData.details && (
            <>
              <SectionTitle title="EV Charger Details" />
              <ReviewRow
                label="Charger Type"
                value={categoryData.details.chargerType}
              />
              <ReviewRow
                label="NEMA Config"
                value={categoryData.details.nemaConfig}
              />
              <ReviewRow
                label="Providing Charger"
                value={categoryData.details.providingCharger}
              />
              <ReviewRow
                label="Charger Status"
                value={categoryData.details.chargerStatus}
              />

              <SectionTitle title="Installation" />
              <ReviewRow
                label="Installation Location"
                value={categoryData.details.installationLocation}
              />
              <ReviewRow
                label="Panel Location"
                value={categoryData.details.panelLocation}
              />
              <ReviewRow
                label="Panel Distance"
                value={categoryData.details.panelDistance}
              />

              <SectionTitle title="Photos" />
              <ReviewPhotos
                label="Charger Area Photos"
                photos={categoryData.details.chargerAreaPhotos}
              />
              <ReviewPhotos
                label="Panel Photos"
                photos={categoryData.details.panelPhotos}
              />

              <SectionTitle title="Additional Info" />
              <ReviewRow
                label="Additional Info"
                value={categoryData.details.additionalInfo}
              />
            </>
          )}

          <GradientButton
            label="Submit"
            onPress={() => router.push("/submit-success" as any)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
