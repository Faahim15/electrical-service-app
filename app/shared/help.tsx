import CustomHeader from "@/src/components/shared/CustomHeader";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const contactItems = [
  {
    id: "1",
    type: "emergency",
    icon: "call-outline",
    title: "Emergency Line",
    subtitle: "540-623-7599 opt. 1",
  },
  {
    id: "2",
    type: "location",
    icon: "location-outline",
    title: "Come See Us",
    subtitle: "11169 Journal Pkwy King George, VA 22485",
  },
  {
    id: "3",
    type: "email",
    icon: "mail-outline",
    title: "Email Us",
    subtitle: "theAteam@feecva.com",
  },
  {
    id: "4",
    type: "safety",
    icon: "warning-outline",
    title: "Safety First",
    subtitle:
      "Turn off power and stop if you notice burning smells, sparks, heat, or visible damage. Your safety is our priority.",
  },
];

const NeedHelpScreen = () => {
  const renderContactItem = ({ item }: { item: (typeof contactItems)[0] }) => {
    const isEmergency = item.type === "emergency";
    const isSafety = item.type === "safety";

    if (isEmergency) {
      return (
        <LinearGradient
          colors={["#0EA5E9", "#14B8A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 16, marginBottom: 12 }}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            className="flex-row items-center px-[5%] py-[4.5%]"
          >
            <View className="w-10 h-10 rounded-full bg-[#FFFFFF30] items-center justify-center mr-4">
              <Ionicons name="call-outline" size={20} color="white" />
            </View>
            <View>
              <Text className="text-white text-[15px] font-Inter_Bold">
                {item.title}
              </Text>
              <Text className="text-[#FFFFFFCC] text-[13px] font-Inter_Medium mt-[2px]">
                {item.subtitle}
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      );
    }

    if (isSafety) {
      return (
        <View
          className="bg-red-50 rounded-2xl px-[5%] py-[4.5%] flex-row mb-3"
          style={{ borderWidth: 1, borderColor: "#FEE2E2" }}
        >
          <View className="w-9 h-9 rounded-full bg-red-100 items-center justify-center mr-3 mt-[2px]">
            <Ionicons name="warning-outline" size={18} color="#EF4444" />
          </View>
          <View className="flex-1">
            <Text className="text-[#1E293B] text-[15px] font-Inter_Bold mb-[4px]">
              {item.title}
            </Text>
            <Text className="text-[#64748B] text-[13px] font-Inter_Regular leading-[19px]">
              {item.subtitle}
            </Text>
          </View>
        </View>
      );
    }

    const iconColor =
      item.type === "location"
        ? "#0EA5E9"
        : item.type === "email"
          ? "#0EA5E9"
          : "#0EA5E9";

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-white rounded-2xl px-[5%] py-[4.5%] flex-row items-center mb-3"
        style={{
          shadowColor: "#94A3B8",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        <View className="w-9 h-9 rounded-full bg-sky-50 items-center justify-center mr-3">
          <Ionicons name={item.icon as any} size={18} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className="text-[#1E293B] text-[15px] font-Inter_Bold">
            {item.title}
          </Text>
          <Text className="text-[#64748B] text-[13px] font-Inter_Medium mt-[2px]">
            {item.subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* Header */}
      <CustomHeader title="Need Help?" />
      <ScreenWrapper>
        <View className="flex-1 ">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32 }}
          >
            {/* Warning icon + description */}
            <View className="items-center px-[8%] pt-[4%] pb-[6%]">
              <View className="w-[72px] h-[72px] rounded-full bg-red-100 items-center justify-center mb-5">
                <Ionicons name="warning-outline" size={36} color="#EF4444" />
              </View>
              <Text className="text-[#475569] text-[14px] font-Inter_Regular text-center leading-[22px]">
                If you're dealing with a power issue or urgent electrical
                concern, contact our team right away.
              </Text>
            </View>

            {/* Contact Cards */}
            <View className="px-[4%]">
              <FlatList
                data={contactItems}
                keyExtractor={(item) => item.id}
                renderItem={renderContactItem}
                scrollEnabled={false}
              />
            </View>

            {/* Office Information */}
            <View
              className="mx-[4%] mt-1 bg-white rounded-2xl px-[5%] py-[4%]"
              style={{
                shadowColor: "#94A3B8",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 3,
              }}
            >
              <Text className="text-[#1E293B] text-[15px] font-Inter_Bold mb-3">
                Office Information
              </Text>

              <View className="flex-row items-start">
                <View className="w-8 h-8 rounded-full bg-sky-50 items-center justify-center mr-3 mt-[1px]">
                  <Ionicons name="time-outline" size={16} color="#0EA5E9" />
                </View>
                <View>
                  <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold mb-[3px]">
                    Business Hours
                  </Text>
                  <Text className="text-[#64748B] text-[13px] font-Inter_Regular leading-[19px]">
                    Mon-Fri: 8:00 AM - 5:00 PM
                  </Text>
                  <Text className="text-[#64748B] text-[13px] font-Inter_Regular">
                    Sat-Sun: Closed
                  </Text>
                </View>
              </View>
            </View>
            <View className="h-40" />
          </ScrollView>
        </View>
      </ScreenWrapper>
    </>
  );
};

export default NeedHelpScreen;
