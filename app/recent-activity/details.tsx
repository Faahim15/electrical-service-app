import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { scale, verticalScale } from "@/src/utils/Scaling";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ── Static updates config per activity id ──────────────────────────────────

const UPDATES_MAP: Record<
  string,
  { id: string; icon: string; iconColor: string; label: string; time: string }[]
> = {
  "1": [
    {
      id: "1",
      icon: "checkmark-circle",
      iconColor: "#10B981",
      label: "Quote submitted",
      time: "Apr 8, 2024 at 2:50 PM",
    },
    {
      id: "2",
      icon: "image-outline",
      iconColor: "#0EA5E9",
      label: "Photos uploaded",
      time: "Apr 8, 2024 at 3:22 PM",
    },
    {
      id: "3",
      icon: "time-outline",
      iconColor: "#F59E0B",
      label: "Pending team review",
      time: "in progress",
    },
    {
      id: "4",
      icon: "calendar-outline",
      iconColor: "#8B5CF6",
      label: "Site assessment scheduled!",
      time: "Pending",
    },
  ],
  "2": [
    {
      id: "1",
      icon: "checkmark-circle",
      iconColor: "#10B981",
      label: "Appointment confirmed",
      time: "Apr 10, 2024 at 9:00 AM",
    },
    {
      id: "2",
      icon: "time-outline",
      iconColor: "#F59E0B",
      label: "Technician assigned",
      time: "in progress",
    },
    {
      id: "3",
      icon: "calendar-outline",
      iconColor: "#8B5CF6",
      label: "Scheduled visit",
      time: "Apr 13, 2024",
    },
  ],
  "3": [
    {
      id: "1",
      icon: "eye-outline",
      iconColor: "#0EA5E9",
      label: "Guide viewed",
      time: "Yesterday at 6:30 PM",
    },
    {
      id: "2",
      icon: "checkmark-circle",
      iconColor: "#10B981",
      label: "Steps completed",
      time: "Yesterday at 6:45 PM",
    },
  ],
};

const DETAILS_MAP: Record<string, { label: string; value: string }[]> = {
  "1": [
    {
      label: "Services Required",
      value: "Level 2 EV Charger Installation (240V)",
    },
    { label: "Property Type", value: "Residential – Single Family Home" },
    {
      label: "Current Progress",
      value: "Pending final review and site assessment",
    },
    { label: "Submitted Photos", value: "8 photos attached" },
    { label: "Estimated Follow-up", value: "Within 1-2 business days" },
  ],
  "2": [
    { label: "Service Type", value: "Smoke Detector Inspection" },
    { label: "Property Type", value: "Residential" },
    { label: "Current Progress", value: "Technician assigned, visit upcoming" },
    { label: "Estimated Follow-up", value: "Within 3 days" },
  ],
  "3": [
    { label: "Guide", value: "GFCI Reset – Step by Step" },
    { label: "Category", value: "Safety & Maintenance" },
    { label: "Status", value: "Completed" },
    { label: "Last Viewed", value: "Yesterday" },
  ],
};

const ATTACHMENTS_MAP: Record<string, { id: string }[]> = {
  "1": [{ id: "1" }, { id: "2" }],
  "2": [{ id: "1" }],
  "3": [],
};

// ── Sub-components ──────────────────────────────────────────────────────────

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between py-[10px] border-b border-[#F1F5F9]">
    <Text className="text-[#94A3B8] text-[12.5px] font-Inter_Regular flex-1">
      {label}
    </Text>
    <Text
      className="text-[#1E293B] text-[12.5px] font-Inter_Medium flex-1"
      style={{ textAlign: "right" }}
    >
      {value}
    </Text>
  </View>
);

// ── Screen ──────────────────────────────────────────────────────────────────

export default function ActivityDetails() {
  const { id, title, subtitle, badge, badgeColor } = useLocalSearchParams<{
    id: string;
    title: string;
    subtitle: string;
    badge: string;
    badgeColor: string;
  }>();

  const updates = UPDATES_MAP[id] ?? [];
  const details = DETAILS_MAP[id] ?? [];
  const attachments = ATTACHMENTS_MAP[id] ?? [];

  const badgeBg = badgeColor ? badgeColor + "20" : "#F1F5F9";

  return (
    <ScreenWrapper paddingHorizontal={0}>
      <View className="flex-1">
        {/* Header */}
        <View className="bg-white px-[4%] pt-[4%] pb-4">
          <TouchableOpacity onPress={() => router.back()} className="mb-3">
            <Ionicons name="arrow-back" size={22} color="#1E293B" />
          </TouchableOpacity>
          <View className="flex-row items-center justify-between">
            <Text className="text-[#1E293B] text-[20px] font-Inter_Bold flex-1">
              Activity Details
            </Text>
            {badge ? (
              <View
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: badgeBg }}
              >
                <Text
                  className="text-[12px] font-Inter_SemiBold"
                  style={{ color: badgeColor }}
                >
                  {badge}
                </Text>
              </View>
            ) : null}
          </View>
          <Text className="text-[#94A3B8] text-[12px] font-Inter_Regular mt-1">
            Review the full details for this item
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, gap: 12 }}
        >
          {/* Main Card */}
          <View
            className="bg-white rounded-2xl px-4 py-4"
            style={{
              shadowColor: "#94A3B8",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <Text className="text-[#94A3B8] text-[11px] font-Inter_Medium mb-1">
              Activity
            </Text>
            <Text className="text-[#1E293B] text-[18px] font-Inter_Bold mb-1">
              {title}
            </Text>
            <Text className="text-[#94A3B8] text-[12px] font-Inter_Regular mb-4">
              {subtitle}
            </Text>
            <InfoRow label="Request ID" value={`#ACT-${id}00${id}`} />
            <InfoRow label="Status" value={badge || "Completed"} />
          </View>

          {/* Details Card */}
          {details.length > 0 && (
            <View
              className="bg-white rounded-2xl px-4 py-4"
              style={{
                shadowColor: "#94A3B8",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text className="text-[#1E293B] text-[15px] font-Inter_Bold mb-3">
                Details
              </Text>
              {details.map((row) => (
                <InfoRow key={row.label} label={row.label} value={row.value} />
              ))}
            </View>
          )}

          {/* Recent Updates */}
          {updates.length > 0 && (
            <View
              className="bg-white rounded-2xl px-4 py-4"
              style={{
                shadowColor: "#94A3B8",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text className="text-[#1E293B] text-[15px] font-Inter_Bold mb-3">
                Recent Updates
              </Text>
              {updates.map((update, index) => (
                <View key={update.id} className="flex-row items-start mb-3">
                  <View className="items-center mr-3">
                    <Ionicons
                      name={update.icon as any}
                      size={20}
                      color={update.iconColor}
                    />
                    {index < updates.length - 1 && (
                      <View
                        style={{
                          width: 1.5,
                          flex: 1,
                          marginTop: 4,
                          backgroundColor: "#E2E8F0",
                          minHeight: 20,
                        }}
                      />
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className="text-[#1E293B] text-[13px] font-Inter_SemiBold">
                      {update.label}
                    </Text>
                    <Text className="text-[#94A3B8] text-[11.5px] font-Inter_Regular mt-[2px]">
                      {update.time}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Attachments */}
          {attachments.length > 0 && (
            <View
              className="bg-white rounded-2xl px-4 py-4"
              style={{
                shadowColor: "#94A3B8",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text className="text-[#1E293B] text-[15px] font-Inter_Bold mb-3">
                Attachments
              </Text>
              <FlatList
                data={attachments}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
                renderItem={() => (
                  <View
                    className="rounded-xl bg-[#F1F5F9] items-center justify-center"
                    style={{
                      width: scale(80),
                      height: verticalScale(80),
                      borderWidth: 1,
                      borderColor: "#E2E8F0",
                    }}
                  >
                    <Ionicons name="image-outline" size={28} color="#94A3B8" />
                  </View>
                )}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
