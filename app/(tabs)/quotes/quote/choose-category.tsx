import CategoryItem from "@/src/components/profile/service_category/CategoryItem";
import CustomHeader from "@/src/components/shared/CustomHeader";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { SERVICE_CATEGORIES } from "@/src/constants/tabs.home.constant";
import { verticalScale } from "@/src/utils/Scaling";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const ListHeader = ({
  searchQuery,
  onSearch,
}: {
  searchQuery: string;
  onSearch: (text: string) => void;
}) => (
  <View>
    {/* Subtitle */}
    <Text className="font-Inter_Regular text-sm text-gray-500  mb-4 mt-2">
      Start by selecting the type of service you need
    </Text>

    {/* Search Bar */}
    <View
      className="flex-row items-center border-2 border-[#E2E8F0] bg-white rounded-xl  mb-5 px-4 h-12"
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
        className="flex-1 font-Inter_Regular bg-white text-[14px] text-gray-700 ml-2"
        placeholder="Search service type"
        placeholderTextColor="#BBBBBB"
        value={searchQuery}
        onChangeText={onSearch}
      />
    </View>
  </View>
);

const ListFooter = () => (
  <View className=" px-[3%] border border-[#C7D2FE] rounded-2xl py-[3%] bg-[#E0E7FF] mt-[2%] mb-[12%]">
    <Text className="font-Inter_SemiBold  text-base text-gray-900 mb-1">
      Not sure what to choose?
    </Text>
    <Text className="font-Inter_Regular text-sm text-[#4C51BF] mb-[2%]">
      Our team can help you determine the best{"\n"}service for your needs
    </Text>
    <Pressable
      onPress={() => router.push("/(tabs)/help/contact-details")}
      className="border border-gray-300 bg-white rounded-xl px-6 py-3 self-start"
    >
      <Text className="font-Inter_Medium text-sm text-[#4C51BF]">
        Contact Us
      </Text>
    </Pressable>
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
    <>
      <CustomHeader title="Choose a category" />
      <ScreenWrapper>
        <View className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
          >
            {/* Categories List */}
            <FlatList
              data={filteredCategories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CategoryItem item={item} />}
              ListHeaderComponent={
                <ListHeader
                  searchQuery={searchQuery}
                  onSearch={setSearchQuery}
                />
              }
              contentContainerStyle={{ paddingBottom: verticalScale(80) }}
              ListFooterComponent={<ListFooter />}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            />
          </KeyboardAvoidingView>
        </View>
      </ScreenWrapper>
    </>
  );
}
