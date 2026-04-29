import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const quickActions = [
  {
    id: "1",
    icon: "time-outline",
    label: "Resume Draft Quote",
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
  },
  {
    id: "2",
    icon: "checkmark-circle-outline",
    label: "View Submitted Quotes",
    iconColor: "#10B981",
    iconBg: "#D1FAE5",
  },
  {
    id: "3",
    icon: "document-text-outline",
    label: "Explore Quote Categories",
    iconColor: "#0EA5E9",
    iconBg: "#E0F2FE",
  },
];

const popularServices = [
  {
    id: "1",
    icon: "car-outline",
    label: "EV Charger\nInstallation",
    iconColor: "#0EA5E9",
    iconBg: "#E0F2FE",
  },
  {
    id: "2",
    icon: "flash-outline",
    label: "Service Call",
    iconColor: "#14B8A6",
    iconBg: "#CCFBF1",
  },
  {
    id: "3",
    icon: "home-outline",
    label: "Panel Upgrade",
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
  },
  {
    id: "4",
    icon: "construct-outline",
    label: "Generator\nInstallation",
    iconColor: "#8B5CF6",
    iconBg: "#EDE9FE",
  },
];

export default function QuotesScreen() {
  const renderQuickAction = ({ item }: { item: (typeof quickActions)[0] }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-white flex-row items-center px-[4%] py-[4%] mb-[2.5%] rounded-2xl"
      style={{
        shadowColor: "#94A3B8",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View
        className="w-9 h-9 rounded-full items-center justify-center mr-4"
        style={{ backgroundColor: item.iconBg }}
      >
        <Ionicons name={item.icon as any} size={18} color={item.iconColor} />
      </View>
      <Text className="text-[#1E293B] text-sm font-Inter_Medium flex-1">
        {item.label}
      </Text>
      <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
    </TouchableOpacity>
  );

  const renderService = ({ item }: { item: (typeof popularServices)[0] }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-white rounded-2xl items-center justify-center py-[6%]"
      style={{
        width: "47%",
        marginBottom: 12,
        shadowColor: "#94A3B8",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View
        className="w-11 h-11 rounded-xl items-center justify-center mb-3"
        style={{ backgroundColor: item.iconBg }}
      >
        <Ionicons name={item.icon as any} size={22} color={item.iconColor} />
      </View>
      <Text className="text-[#1E293B] text-[12.5px] font-Inter_Medium text-center leading-lg">
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <ScreenWrapper paddingHorizontal={0}>
        <View className="flex-1 bg-[#F0F6FF]">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {/* Header */}
            <View className="px-[4%] pt-[8%] pb-[4%]">
              <Text className="text-[#1E293B] text-[24px] font-Inter_Bold">
                Quotes
              </Text>
              <Text className="text-[#64748B] text-[13.5px] font-Inter_Regular mt-1">
                Request service and manage your quote requests
              </Text>
            </View>

            {/* New Quote Card */}
            <View className="mx-[4%] mb-[4%]">
              <View
                className="bg-white rounded-3xl px-[6%] py-[7%] items-center"
                style={{
                  shadowColor: "#94A3B8",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 12,
                  elevation: 4,
                }}
              >
                {/* Icon circle */}
                <View className="w-[68px] h-[68px] rounded-full bg-[#E0F7F7] items-center justify-center mb-4">
                  <Ionicons
                    name="document-text-outline"
                    size={32}
                    color="#0EA5E9"
                  />
                </View>

                <Text className="text-[#1E293B] text-[18px] font-Inter_Bold mb-2">
                  Start a new quote
                </Text>

                <Text className="text-[#64748B] text-[13px] font-Inter_Regular text-center leading-[19px] mb-6">
                  Choose a service and send us your request in just a few steps.
                </Text>

                {/* Gradient Button */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => router.push("/quote/choose-category")}
                  className="w-full rounded-2xl overflow-hidden"
                >
                  <LinearGradient
                    colors={["#0EA5E9", "#14B8A6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      paddingVertical: 14,
                      alignItems: "center",
                      borderRadius: 16,
                    }}
                  >
                    <Text className="text-white text-[15px] font-Inter_SemiBold">
                      New Quote
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Actions */}
            <View className="px-[4%] mb-[4%]">
              <FlatList
                data={quickActions}
                keyExtractor={(item) => item.id}
                renderItem={renderQuickAction}
                scrollEnabled={false}
              />
            </View>

            {/* Popular Services */}
            <View className="px-[4%] mb-[4%]">
              <Text className="text-[#1E293B] text-[16px] font-Inter_Bold mb-3">
                Popular Services
              </Text>
              <FlatList
                data={popularServices}
                keyExtractor={(item) => item.id}
                renderItem={renderService}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                scrollEnabled={false}
              />
            </View>

            {/* Need Help Banner */}
            <View className="mx-[4%]">
              <View
                className="rounded-3xl px-[6%] py-[6%]"
                style={{
                  backgroundColor: "#FFFBEB",
                  borderWidth: 1,
                  borderColor: "#FDE68A",
                }}
              >
                <Text className="text-[#1E293B] text-[15px] font-Inter_Bold mb-1">
                  Need help choosing?
                </Text>
                <Text className="text-[#64748B] text-[13px] font-Inter_Regular leading-[19px] mb-4">
                  Contact us and find the right option for your project
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="bg-white rounded-2xl py-[3.5%] items-center"
                  style={{
                    shadowColor: "#94A3B8",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    elevation: 2,
                  }}
                >
                  <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold">
                    Contact for Services
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScreenWrapper>
    </>
  );
}
