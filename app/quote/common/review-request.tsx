import { GradientButton } from "@/src/components/onboarding/GradientButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
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
  const s = useSelector((state: RootState) => state.serviceDetails);
  const selectedCategory = useSelector(
    (state: RootState) => state.categoryRoute.selectedCategory,
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

          {/* Contact */}
          <SectionTitle title="Contact Details" />
          <ReviewRow label="Full Name" value={s.fullName} />
          <ReviewRow label="Email Address" value={s.email} />
          <ReviewRow label="Phone Number" value={s.phone} />
          <ReviewRow label="Preferred Contact" value={s.preferredContact} />

          {/* Address */}
          <SectionTitle title="Service Address" />
          <ReviewRow label="Street Address" value={s.streetAddress} />
          <ReviewRow label="Apartment / Unit" value={s.apartment} />
          <ReviewRow label="City" value={s.city} />
          <ReviewRow label="State" value={s.state} />
          <ReviewRow label="Zip Code" value={s.zipCode} />
          <ReviewRow
            label="Home Address"
            value={s.isHomeAddress ? "Yes" : "No"}
          />

          {/* Project Basics */}
          <SectionTitle title="Project Basics" />
          <ReviewRow label="Property Type" value={s.propertyType} />
          <ReviewRow label="Ownership Status" value={s.ownershipStatus} />
          <ReviewRow label="Timeline / Urgency" value={s.timeline} />

          {/* Project Details */}
          <SectionTitle title="Project Details" />
          <ReviewRow label="Issue Description" value={s.projectDetails} />

          {/* Scheduling */}
          <SectionTitle title="Scheduling" />
          <ReviewRow label="Preferred Time" value={s.preferredTime} />
          <ReviewRow
            label="Preferred Days"
            value={
              s.schedulingDays.length > 0 ? s.schedulingDays.join(", ") : ""
            }
          />

          {/* Photos */}
          <SectionTitle title="Photos" />
          <ReviewPhotos label="Panel Photos" photos={s.panelPhotos} />
          <ReviewPhotos label="Work Area Photos" photos={s.workAreaPhotos} />
          <ReviewPhotos
            label="Extra Reference Photos"
            photos={s.referencePhotos}
          />

          {/* Notes */}
          <SectionTitle title="Additional Notes" />
          <ReviewRow label="Notes" value={s.additionalNotes} />
          <ReviewRow
            label="Quick Tags"
            value={s.quickTags.length > 0 ? s.quickTags.join(", ") : ""}
          />

          <GradientButton
            label="Submit"
            onPress={() => router.push("/submit-success" as any)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
