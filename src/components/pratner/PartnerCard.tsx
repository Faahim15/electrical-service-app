import { setSelectedDetail } from "@/src/redux/slices/parnerDetailsSlice";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Linking, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

interface PartnerItem {
  id: string;
  name: string;
  category: string;
  phone: string;
  website: string | null;
}

const PartnerCard = ({ item, index }: { item: PartnerItem; index: number }) => {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 450,
        delay: 300 + index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 450,
        delay: 300 + index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  const dispatch = useDispatch();
  const handleView = () => {
    dispatch(setSelectedDetail(item));
    router.push("/partner-details");
  };

  return (
    <Animated.View
      style={{ transform: [{ translateY: slideAnim }], opacity: opacityAnim }}
      className="mb-3 mx-4"
    >
      <View
        className="bg-white rounded-2xl px-4 py-4"
        style={{
          shadowColor: "#06B6D4",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        {/* Name + Favourite */}
        <View className="flex-row items-start justify-between mb-0.5">
          <Text className="text-[15px] font-Inter_Bold text-[#0F172A] flex-1 mr-2">
            {item.name}
          </Text>
          <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Feather name="heart" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Category */}
        <Text className="text-[13px] font-Inter_Regular text-[#64748B] mb-3">
          {item.category}
        </Text>

        {/* Phone */}
        <TouchableOpacity
          className="flex-row items-center mb-1.5"
          onPress={() => Linking.openURL(`tel:${item.phone}`)}
        >
          <Feather name="phone" size={14} color="#64748B" />
          <Text className="text-[13px] font-Inter_Regular text-[#0F172A] ml-2">
            {item.phone}
          </Text>
        </TouchableOpacity>

        {/* Website (conditional) */}
        {item.website && (
          <TouchableOpacity
            className="flex-row items-center mb-3"
            onPress={() => Linking.openURL(item.website!)}
          >
            <Feather name="globe" size={14} color="#64748B" />
            <Text
              className="text-[13px] font-Inter_Regular text-[#0F172A] ml-2"
              numberOfLines={1}
            >
              {item.website}
            </Text>
          </TouchableOpacity>
        )}

        {/* Divider */}
        <View className="h-px bg-slate-100 my-3" />

        {/* Action buttons */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            className="flex-row items-center justify-center border border-slate-200 rounded-xl px-4 py-2.5 gap-1.5"
            onPress={() => Linking.openURL(`tel:${item.phone}`)}
          >
            <Feather name="phone" size={14} color="#0F172A" />
            <Text className="text-[13px] font-Inter_SemiBold text-[#0F172A]">
              Call
            </Text>
          </TouchableOpacity>

          {item.website && (
            <TouchableOpacity
              className="flex-row items-center justify-center border border-slate-200 rounded-xl px-4 py-2.5 gap-1.5"
              onPress={() => Linking.openURL(item.website!)}
            >
              <Feather name="globe" size={14} color="#0F172A" />
              <Text className="text-[13px] font-Inter_SemiBold text-[#0F172A]">
                Website
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className="flex-1 bg-[#2DD4BF] rounded-xl py-2.5 items-center justify-center"
            onPress={handleView}
          >
            <Text className="text-[13px] font-Inter_SemiBold text-white">
              View Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default PartnerCard;
