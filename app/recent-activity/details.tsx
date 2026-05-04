// src/app/recent-activity/details.tsx
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { scale, verticalScale } from "@/src/utils/Scaling";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const UPDATES = [
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
];

const ATTACHMENTS = [{ id: "1" }, { id: "2" }];

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

export default function ActivityDetails() {
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
            <View className="bg-[#FEF3C7] px-3 py-1 rounded-full">
              <Text className="text-[#F59E0B] text-[12px] font-Inter_SemiBold">
                Pending
              </Text>
            </View>
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
              Quote
            </Text>
            <Text className="text-[#1E293B] text-[18px] font-Inter_Bold mb-1">
              EV Charger Installation
            </Text>
            <Text className="text-[#94A3B8] text-[12px] font-Inter_Regular mb-4">
              Submitted 2 days ago
            </Text>
            <InfoRow label="Request ID" value="#EV-2048" />
            <InfoRow label="Date Created" value="Apr 8, 2024" />
            <InfoRow label="Last Updated" value="2 hours ago" />
            <InfoRow label="Service Type" value="EV Charger Installation" />
          </View>

          {/* Details Card */}
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
            <InfoRow
              label="Services Required"
              value="Level 2 EV Charger Installation (240V)"
            />
            <InfoRow
              label="Property Type"
              value="Residential – Single Family Home"
            />
            <InfoRow
              label="Current Progress"
              value="Pending final review and site assessment"
            />
            <InfoRow label="Submitted Photos" value="8 photos attached" />
            <InfoRow
              label="Estimated Follow-up"
              value="Within 1-2 business days"
            />
          </View>

          {/* Recent Updates */}
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
            {UPDATES.map((update, index) => (
              <View key={update.id} className="flex-row items-start mb-3">
                <View className="items-center mr-3">
                  <Ionicons
                    name={update.icon as any}
                    size={20}
                    color={update.iconColor}
                  />
                  {index < UPDATES.length - 1 && (
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

          {/* Attachments */}
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
              data={ATTACHMENTS}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
              renderItem={() => (
                <View
                  className="w-[80px] h-[80px] rounded-xl bg-[#F1F5F9] items-center justify-center"
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

          {/* Bottom buttons */}
          {/* <View className="flex-row gap-3 mt-2 mb-4">
          <TouchableOpacity className="flex-1 py-3 rounded-xl items-center border border-[#E2E8F0] bg-white">
            <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold">
              Download
            </Text>
          </TouchableOpacity>
          <View className="flex-1">
            <GradientPressable label="Share" />
          </View>
        </View> */}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
