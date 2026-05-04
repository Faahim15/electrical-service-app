import { GradientPressable } from "@/src/components/shared/GradientPressable";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const TABS = ["All", "Quotes", "Reminders", "Guides"];

const GRADIENT_COLORS = [
  "#0EA5E9",
  "#0CA7E4",
  "#0AA8E0",
  "#09AADB",
  "#08ABD7",
  "#07ADD2",
  "#07AECD",
  "#08AFC9",
  "#08B1C4",
  "#0AB2BF",
  "#0BB3BA",
  "#0DB5B5",
  "#10B6B0",
  "#12B7AB",
  "#14B8A6",
] as const;

const ACTIVITIES = [
  {
    id: "1",
    type: "Quote",
    status: "Pending",
    statusColor: "#F59E0B",
    statusBg: "#FEF3C7",
    title: "EV Charger Installation",
    subtitle: "Submitted 2 days ago",
    icon: "document-text-outline",
    iconColor: "#3B82F6",
    iconBg: "#EFF6FF",
  },
  {
    id: "2",
    type: "Reminder",
    status: "Upcoming",
    statusColor: "#8B5CF6",
    statusBg: "#F3F0FF",
    title: "Smoke Detector Check",
    subtitle: "Due in 3 days",
    icon: "time-outline",
    iconColor: "#8B5CF6",
    iconBg: "#F3F0FF",
  },
  {
    id: "3",
    type: "Quote",
    status: "Completed",
    statusColor: "#10B981",
    statusBg: "#D1FAE5",
    title: "Panel Upgrade Quote",
    subtitle: "Completed 5 days ago",
    icon: "document-text-outline",
    iconColor: "#3B82F6",
    iconBg: "#EFF6FF",
  },
  {
    id: "4",
    type: "Guide",
    status: null,
    statusColor: "",
    statusBg: "",
    title: "Reset GFCI Outlet",
    subtitle: "Viewed yesterday",
    icon: "bulb-outline",
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
  },
  {
    id: "5",
    type: "Partner",
    status: null,
    statusColor: "",
    statusBg: "",
    title: "Licensed Electricians",
    subtitle: "Viewed 3 days ago",
    icon: "people-outline",
    iconColor: "#10B981",
    iconBg: "#D1FAE5",
  },
  {
    id: "6",
    type: "Reminder",
    status: "Upcoming",
    statusColor: "#8B5CF6",
    statusBg: "#F3F0FF",
    title: "Circuit Breaker Test",
    subtitle: "Due next week",
    icon: "time-outline",
    iconColor: "#8B5CF6",
    iconBg: "#F3F0FF",
  },
];

export default function RecentActivity() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredActivities =
    activeTab === "All"
      ? ACTIVITIES
      : ACTIVITIES.filter(
          (a) => a.type === activeTab.slice(0, -1) || a.type === activeTab,
        );

  return (
    <ScreenWrapper paddingHorizontal={0}>
      <View className="flex-1 ">
        {/* Header */}
        <View className="px-[4%] pt-[4%] pb-[4%] bg-white">
          <TouchableOpacity onPress={() => router.back()} className="mb-3">
            <Ionicons name="arrow-back" size={22} color="#1E293B" />
          </TouchableOpacity>
          <Text className="text-[#1E293B] text-[22px] font-Inter_Bold">
            Recent Activity
          </Text>
          <Text className="text-[#64748B] text-[13px] font-Inter_Regular mt-1">
            Pick up where you left off
          </Text>
        </View>

        {/* Tabs */}
        <View className="bg-white px-[4%] pb-3 border-b border-[#F1F5F9]">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {TABS.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={{ borderRadius: 999, overflow: "hidden" }}
                >
                  {activeTab === tab ? (
                    <LinearGradient
                      colors={GRADIENT_COLORS}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{ paddingHorizontal: 16, paddingVertical: 8 }}
                    >
                      <Text className="text-[13px] font-Inter_Medium text-white">
                        {tab}
                      </Text>
                    </LinearGradient>
                  ) : (
                    <View
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        backgroundColor: "#F1F5F9",
                      }}
                    >
                      <Text className="text-[13px] font-Inter_Medium text-[#64748B]">
                        {tab}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* List */}
        <FlatList
          data={filteredActivities}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
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
              <View className="flex-row items-center mb-3">
                {/* Icon */}
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: item.iconBg }}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={item.iconColor}
                  />
                </View>

                {/* Title + subtitle */}
                <View className="flex-1">
                  <View className="flex-row items-center gap-2 mb-[2px]">
                    <Text className="text-[#94A3B8] text-[11px] font-Inter_Medium">
                      {item.type}
                    </Text>
                    {item.status && (
                      <View
                        className="px-2 py-[2px] rounded-full"
                        style={{ backgroundColor: item.statusBg }}
                      >
                        <Text
                          className="text-[10.5px] font-Inter_SemiBold"
                          style={{ color: item.statusColor }}
                        >
                          {item.status}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-[#1E293B] text-[14px] font-Inter_SemiBold">
                    {item.title}
                  </Text>
                  <Text className="text-[#94A3B8] text-[12px] font-Inter_Regular mt-[2px]">
                    {item.subtitle}
                  </Text>
                </View>
              </View>

              {/* Gradient Button */}
              <GradientPressable
                label="View Details"
                onPress={() => router.push("/recent-activity/details" as any)}
              />
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
}
