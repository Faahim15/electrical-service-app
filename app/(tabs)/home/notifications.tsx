// src/app/notifications/index.tsx
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { verticalScale } from "@/src/utils/Scaling";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const NOTIFICATIONS = [
  {
    id: "1",
    icon: "checkmark-circle",
    iconColor: "#0EA5E9",
    iconBg: "#EFF6FF",
    title: "Quote submitted successfully",
    body: "Your EV charger installation quote has been received. We'll review and respond within 24 hours.",
    time: "2 hours ago",
    tag: "Quotes",
    tagColor: "#0EA5E9",
    tagBg: "#EFF6FF",
    unread: true,
  },
  {
    id: "2",
    icon: "notifications-outline",
    iconColor: "#8B5CF6",
    iconBg: "#F3F0FF",
    title: "Smoke detector reminder due tomorrow",
    body: "Time to test your smoke detectors. This monthly check keeps your home safe.",
    time: "4 hours ago",
    tag: "Reminders",
    tagColor: "#8B5CF6",
    tagBg: "#F3F0FF",
    unread: true,
  },
  {
    id: "3",
    icon: "flash-outline",
    iconColor: "#10B981",
    iconBg: "#D1FAE5",
    title: "EV charger quote update",
    body: "Your quote has been reviewed and is ready for your approval.",
    time: "1 day ago",
    tag: "Quotes",
    tagColor: "#0EA5E9",
    tagBg: "#EFF6FF",
    unread: false,
  },
  {
    id: "4",
    icon: "leaf-outline",
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
    title: "Safety tip: Spring electrical check",
    body: "Spring is here! Check outdoor outlets, GFCI protection, and landscape lighting.",
    time: "2 days ago",
    tag: "Tips",
    tagColor: "#F59E0B",
    tagBg: "#FEF3C7",
    unread: false,
  },
  {
    id: "5",
    icon: "document-text-outline",
    iconColor: "#3B82F6",
    iconBg: "#EFF6FF",
    title: "Panel upgrade quote completed",
    body: "Great news! Your electrical panel upgrade quote is complete and available to view.",
    time: "3 days ago",
    tag: "Quotes",
    tagColor: "#0EA5E9",
    tagBg: "#EFF6FF",
    unread: false,
  },
  {
    id: "6",
    icon: "time-outline",
    iconColor: "#8B5CF6",
    iconBg: "#F3F0FF",
    title: "GFCI outlet test reminder",
    body: "Monthly GFCI test due this week. Takes just 2 minutes to ensure safety.",
    time: "4 days ago",
    tag: "Reminders",
    tagColor: "#8B5CF6",
    tagBg: "#F3F0FF",
    unread: false,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <ScreenWrapper paddingHorizontal={0}>
      <View className="flex-1 pt-[4%] ">
        {/* Header */}
        <View className="bg-white px-[4%] pt-[4%] pb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Pressable onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={22} color="#1E293B" />
              </Pressable>
              <Text className="text-[#1E293B] text-[20px] font-Inter_Bold">
                Notifications
              </Text>
            </View>
            <Pressable onPress={markAllRead}>
              <Text className="text-[#0EA5E9] text-[13px] font-Inter_Medium">
                Mark all read
              </Text>
            </Pressable>
          </View>
        </View>

        {/* List */}
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 16,
            gap: 10,
            paddingBottom: verticalScale(100),
          }}
          renderItem={({ item }) => (
            <Pressable
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 14,
                shadowColor: "#94A3B8",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
                borderLeftWidth: item.unread ? 3 : 0,
                borderLeftColor: item.unread ? "#0EA5E9" : "transparent",
              }}
            >
              <View className="flex-row items-start gap-3">
                {/* Icon */}
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mt-[2px]"
                  style={{ backgroundColor: item.iconBg }}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={item.iconColor}
                  />
                </View>

                {/* Content */}
                <View className="flex-1">
                  <View className="flex-row items-start justify-between gap-2">
                    <Text
                      className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold flex-1"
                      numberOfLines={2}
                    >
                      {item.title}
                    </Text>
                    {/* Unread dot */}
                    {item.unread && (
                      <View
                        className="w-2 h-2 rounded-full mt-[5px]"
                        style={{ backgroundColor: "#0EA5E9" }}
                      />
                    )}
                  </View>

                  <Text
                    className="text-[#64748B] text-[12.5px] font-Inter_Regular mt-1 leading-[18px]"
                    numberOfLines={3}
                  >
                    {item.body}
                  </Text>

                  {/* Footer */}
                  <View className="flex-row items-center justify-between mt-2">
                    <Text className="text-[#94A3B8] text-[11.5px] font-Inter_Regular">
                      {item.time}
                    </Text>
                    <View
                      className="px-2 py-[3px] rounded-full"
                      style={{ backgroundColor: item.tagBg }}
                    >
                      <Text
                        className="text-[10.5px] font-Inter_SemiBold"
                        style={{ color: item.tagColor }}
                      >
                        {item.tag}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </ScreenWrapper>
  );
}
