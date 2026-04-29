import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { GradientButton } from "../onboarding/GradientButton";
import CustomHeader from "./CustomHeader";
import ScreenWrapper from "./ScreenWrapper";

type BestForItem = {
  id: string;
  text: string;
};

type ProvideItem = {
  id: string;
  text: string;
};

type StepItem = {
  id: string;
  step: number;
  label: string;
};

type ServiceDetailPageProps = {
  iconName: string;
  iconColor?: string;
  iconBg?: string;
  title: string;
  subtitle: string;
  bestForItems: BestForItem[];
  provideItems: ProvideItem[];
  estimatedTime: string;
  estimatedTimeSubtitle: string;
  steps: StepItem[];
  onStartQuote?: () => void;
  onBackToCategories?: () => void;
};

export default function ServiceDetailPage({
  iconName = "flash-outline",
  iconColor = "#14B8A6",
  iconBg = "#E0F7F7",
  title = "Service Call",
  subtitle = "Fast response for electrical repairs, troubleshooting, and emergency fixes.",
  bestForItems = [
    { id: "1", text: "Electrical issues or outages" },
    { id: "2", text: "Circuit breaker problems" },
    { id: "3", text: "Outlet or switch repairs" },
    { id: "4", text: "Safety inspections" },
  ],
  provideItems = [
    { id: "1", text: "Description of the issue" },
    { id: "2", text: "Photos of the problem area" },
    { id: "3", text: "Property access details" },
  ],
  estimatedTime = "Takes about 2–3 minutes",
  estimatedTimeSubtitle = "Quick and easy process",
  steps = [
    { id: "1", step: 1, label: "Contact details" },
    { id: "2", step: 2, label: "Project information" },
    { id: "3", step: 3, label: "Photo upload" },
    { id: "4", step: 4, label: "Review & submit" },
  ],
  onStartQuote,
  onBackToCategories,
}: ServiceDetailPageProps) {
  const stepColors = ["#0EA5E9", "#14B8A6", "#8B5CF6", "#F59E0B"];

  return (
    <>
      <ScreenWrapper paddingHorizontal={0}>
        <CustomHeader title={title} />

        <View className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {/* Hero */}
            <View className="items-center px-[8%] pt-[4%] pb-[6%]">
              <View
                className="w-[72px] h-[72px] rounded-full items-center justify-center mb-5"
                style={{ backgroundColor: iconBg }}
              >
                <Ionicons name={iconName as any} size={34} color={iconColor} />
              </View>
              <Text className="text-[#1E293B] text-[22px] font-Inter_Bold text-center mb-2">
                {title}
              </Text>
              <Text className="text-[#64748B] text-[13.5px] font-Inter_Regular text-center leading-[21px]">
                {subtitle}
              </Text>
            </View>

            {/* Best For */}
            <View
              className="mx-[4%] mb-[3%] bg-white rounded-2xl px-[5%] py-[5%]"
              style={{
                shadowColor: "#94A3B8",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text className="text-[#1E293B] text-[14px] font-Inter_Bold mb-3">
                Best for
              </Text>
              <FlatList
                data={bestForItems}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View className="flex-row items-center mb-[10px]">
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={18}
                      color="#14B8A6"
                    />
                    <Text className="text-[#475569] text-[13px] font-Inter_Regular ml-2 flex-1">
                      {item.text}
                    </Text>
                  </View>
                )}
              />
            </View>

            {/* What you may need to provide */}
            <View
              className="mx-[4%] mb-[3%] bg-white rounded-2xl px-[5%] py-[5%]"
              style={{
                shadowColor: "#94A3B8",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text className="text-[#1E293B] text-[14px] font-Inter_Bold mb-3">
                What you may need to provide
              </Text>
              <FlatList
                data={provideItems}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View className="flex-row items-center mb-[10px]">
                    <View
                      className="w-[7px] h-[7px] rounded-full mr-3"
                      style={{ backgroundColor: "#0EA5E9" }}
                    />
                    <Text className="text-[#475569] text-[13px] font-Inter_Regular flex-1">
                      {item.text}
                    </Text>
                  </View>
                )}
              />

              {/* Time estimate badge */}
              <View className="mt-2 flex-row items-center bg-[#EEF9FF] rounded-xl px-[4%] py-[3%]">
                <Ionicons name="time-outline" size={18} color="#0EA5E9" />
                <View className="ml-3">
                  <Text className="text-[#0EA5E9] text-[13px] font-Inter_SemiBold">
                    {estimatedTime}
                  </Text>
                  <Text className="text-[#64748B] text-[11.5px] font-Inter_Regular">
                    {estimatedTimeSubtitle}
                  </Text>
                </View>
              </View>
            </View>

            {/* Simple 4-step process */}
            <View className="mx-[4%] mb-[3%]">
              <Text className="text-[#1E293B] text-[15px] font-Inter_Bold mb-3">
                Simple {steps.length}-step process
              </Text>
              <FlatList
                data={steps}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <View
                    className="bg-white flex-row items-center px-[5%] py-[4%] rounded-2xl mb-[2.5%]"
                    style={{
                      shadowColor: "#94A3B8",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.07,
                      shadowRadius: 5,
                      elevation: 2,
                    }}
                  >
                    <View
                      className="w-7 h-7 rounded-full items-center justify-center mr-4"
                      style={{
                        backgroundColor:
                          stepColors[index % stepColors.length] + "22",
                      }}
                    >
                      <Text
                        className="text-[12px] font-Inter_Bold"
                        style={{ color: stepColors[index % stepColors.length] }}
                      >
                        {item.step}
                      </Text>
                    </View>
                    <Text className="text-[#1E293B] text-[13.5px] font-Inter_Medium flex-1">
                      {item.label}
                    </Text>
                  </View>
                )}
              />
            </View>
          </ScrollView>

          {/* Bottom CTA */}
          <View
            className="absolute bottom-0 left-0 right-0 bg-[#F0F6FF] px-[4%] pt-[3%] pb-[8%]"
            style={{
              shadowColor: "#94A3B8",
              shadowOffset: { width: 0, height: -3 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <GradientButton
              label="Start Quote"
              onPress={() => router.push("/quote/common/contact-details")}
            />

            {/* <TouchableOpacity
              activeOpacity={0.7}
              onPress={onBackToCategories ?? (() => router.back())}
              className="items-center"
            >
              <Text className="text-[#64748B] text-[13px] font-Inter_Medium">
                Back to Categories
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScreenWrapper>
    </>
  );
}
