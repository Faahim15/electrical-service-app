import CustomHeader from "@/src/components/shared/CustomHeader";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "1",
    title: "Service Call",
    description: "Quick repairs and electrical\ntroubleshooting",
    iconName: "flash-outline",
    iconBg: "#E8F8F5",
    iconColor: "#2DC99C",
  },
  {
    id: "2",
    title: "EV Charger Installation",
    description: "Home EV charger setup\nWith safe wiring support",
    iconName: "home-outline",
    iconBg: "#E8F3FD",
    iconColor: "#4A90D9",
  },
  {
    id: "3",
    title: "Panel Upgrade",
    description: "Upgrade your panel\nFor safer, stronger power",
    iconName: "cube-outline",
    iconBg: "#F0EDFB",
    iconColor: "#7B61FF",
  },
  {
    id: "4",
    title: "Remodeling",
    description: "Electrical work for\nHome remodel projects",
    iconName: "hammer-outline",
    iconBg: "#FEF3E8",
    iconColor: "#F5A623",
  },
  {
    id: "5",
    title: "Accessory Building /\nShed Power",
    description: "Power for sheds and\nDetached buildings",
    iconName: "business-outline",
    iconBg: "#F5F5F5",
    iconColor: "#888888",
  },
  {
    id: "6",
    title: "Hot Tub Installation",
    description: "Safe electrical setup For\nhot tubs and swim spas",
    iconName: "water-outline",
    iconBg: "#E8F3FD",
    iconColor: "#4A90D9",
  },
  {
    id: "7",
    title: "Dock Power",
    description: "Power solutions for\nDocks and waterfront use",
    iconName: "power-outline",
    iconBg: "#E8F8F5",
    iconColor: "#2DC99C",
  },
  {
    id: "8",
    title: "Electrical Inspection",
    description: "Inspect your system\nFor safety and issues",
    iconName: "document-text-outline",
    iconBg: "#FDF0F8",
    iconColor: "#C94AA0",
  },
  {
    id: "9",
    title: "Generator Installation",
    description: "Backup power setup\nFor homes and buildings",
    iconName: "battery-charging-outline",
    iconBg: "#F5F5F5",
    iconColor: "#888888",
  },
  {
    id: "10",
    title: "New Construction",
    description: "Electrical work for\nNew build projects",
    iconName: "grid-outline",
    iconBg: "#F5F5F5",
    iconColor: "#888888",
  },
  {
    id: "11",
    title: "Solar Installation",
    description: "Electrical support for\nSolar system projects",
    iconName: "sunny-outline",
    iconBg: "#FEF9E8",
    iconColor: "#F5C623",
  },
  {
    id: "12",
    title: "Other Custom Service",
    description: "Custom electrical help\nFor unique projects",
    iconName: "document-outline",
    iconBg: "#F0EDFB",
    iconColor: "#7B61FF",
  },
];

const CategoryItem = ({ item }: { item: ServiceCategory }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    className="flex-row items-center bg-white rounded-2xl mx-[4%] mb-3 px-4 py-4"
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
    }}
  >
    {/* Icon Container */}
    <View
      className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
      style={{ backgroundColor: item.iconBg }}
    >
      <Ionicons name={item.iconName} size={22} color={item.iconColor} />
    </View>

    {/* Text Content */}
    <View className="flex-1">
      <Text
        className="font-Inter_SemiBold text-[15px] text-gray-900 leading-5"
        numberOfLines={2}
      >
        {item.title}
      </Text>
      <Text
        className="font-Inter_Regular text-[13px] text-gray-500 mt-0.5 leading-[18px]"
        numberOfLines={2}
      >
        {item.description}
      </Text>
    </View>

    {/* Chevron */}
    <Ionicons name="chevron-forward" size={18} color="#BBBBBB" />
  </TouchableOpacity>
);

const ListHeader = ({
  searchQuery,
  onSearch,
}: {
  searchQuery: string;
  onSearch: (text: string) => void;
}) => (
  <View>
    {/* Subtitle */}
    <Text className="font-Inter_Regular text-[13px] text-gray-500 mx-[4%] mb-4 mt-2">
      Start by selecting the type of service you need
    </Text>

    {/* Search Bar */}
    <View
      className="flex-row items-center bg-white rounded-xl mx-[4%] mb-5 px-4 h-12"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
      }}
    >
      <Ionicons name="search-outline" size={18} color="#AAAAAA" />
      <TextInput
        className="flex-1 font-Inter_Regular text-[14px] text-gray-700 ml-2"
        placeholder="Search service type"
        placeholderTextColor="#BBBBBB"
        value={searchQuery}
        onChangeText={onSearch}
      />
    </View>
  </View>
);

const ListFooter = () => (
  <View className="mx-[4%] mt-4 mb-8">
    <Text className="font-Inter_SemiBold text-[15px] text-gray-900 mb-1">
      Not sure what to choose?
    </Text>
    <Text className="font-Inter_Regular text-[13px] text-blue-500 mb-4">
      Our team can help you determine the best{"\n"}service for your needs
    </Text>
    <TouchableOpacity
      activeOpacity={0.8}
      className="border border-gray-300 rounded-xl px-6 py-3 self-start"
    >
      <Text className="font-Inter_Medium text-[14px] text-gray-700">
        Contact Us
      </Text>
    </TouchableOpacity>
  </View>
);

export default function ChooseCategoryScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = SERVICE_CATEGORIES.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View className="flex-1 bg-[#F4F6FA]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <CustomHeader title="Choose a category" />

        {/* Categories List */}
        <FlatList
          data={filteredCategories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CategoryItem item={item} />}
          ListHeaderComponent={
            <ListHeader searchQuery={searchQuery} onSearch={setSearchQuery} />
          }
          ListFooterComponent={<ListFooter />}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </View>
  );
}
