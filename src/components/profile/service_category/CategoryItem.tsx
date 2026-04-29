import { setSelectedRouteCategory } from "@/src/redux/slices/categoryRouteSlice";
import { ServiceCategory } from "@/src/types/tabs.home.types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

const CategoryItem = ({ item }: { item: ServiceCategory }) => {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(setSelectedRouteCategory(item));
    router.push("/quote/service-details");
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className="flex-row border border-green-50 items-center bg-white rounded-2xl  mb-3 px-4 py-4"
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
};

export default CategoryItem;
