import { setSelectedDetail } from "@/src/redux/slices/parnerDetailsSlice";
import { AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Linking, Pressable, Text, View } from "react-native";

import { useDispatch } from "react-redux";

interface PartnerItem {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  tagline: string;
  trustedPartnerVerified: boolean;
  whyWeRecommendThem: string[];
  contact: {
    phone?: string;
    website?: string;
  };
}

const PartnerCard = ({ item, index }: { item: PartnerItem; index: number }) => {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [islove, setIslove] = useState(false);
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

  const handleWebsite = (url: string | undefined) => {
    if (!url) return;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://www." + url;
    }
    Linking.openURL(url);
  };

  return (
    <Animated.View
      style={{ transform: [{ translateY: slideAnim }], opacity: opacityAnim }}
      className="mb-3"
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
          <Text className="text-base font-Inter_Bold text-[#0F172A] flex-1 mr-2">
            {item.name}
          </Text>
          <Pressable
            onPress={() => setIslove(!islove)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {islove ? (
              <AntDesign name="heart" size={22} color="#991b1b" />
            ) : (
              <Feather name="heart" size={22} color="#9CA3AF" />
            )}
          </Pressable>
        </View>

        {/* Category */}
        <Text className="text-sm font-Inter_Regular text-[#64748B] mb-3">
          {item.category}
        </Text>

        {/* Phone */}
        <Pressable
          className="flex-row items-center mb-1.5"
          onPress={() => Linking.openURL(`tel:${item.contact.phone}`)}
        >
          <Feather name="phone" size={14} color="#64748B" />
          <Text className="text-sm font-Inter_Regular text-[#0F172A] ml-2">
            {item.contact.phone}
          </Text>
        </Pressable>

        {/* Website (conditional) */}
        {item?.contact?.website && (
          <Pressable
            className="flex-row items-center mb-3"
            onPress={() => Linking.openURL(item?.contact?.website!)}
          >
            <View>
              <Feather name="globe" size={14} color="#64748B" />
            </View>
            <View className="flex-1 flex-row flex-wrap">
              <Text className="text-sm font-Inter_Regular text-[#0F172A] ml-2 flex-shrink flex-wrap">
                {item?.contact?.website}
              </Text>
            </View>
          </Pressable>
        )}

        {/* Divider */}
        <View className="h-px bg-slate-100 my-3" />

        {/* Action buttons */}
        <View className="flex-row gap-2">
          <Pressable
            className="flex-row items-center justify-center border border-slate-200 rounded-xl px-4 py-4 gap-1.5"
            onPress={() => Linking.openURL(`tel:${item.contact.phone}`)}
          >
            <Feather name="phone" size={14} color="#0F172A" />
            <Text className="text-sm font-Inter_SemiBold text-[#0F172A]">
              Call
            </Text>
          </Pressable>

          <Pressable className="flex-1 " onPress={handleView}>
            <LinearGradient
              colors={["#0EA5E9", "#14B8A6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 16 }}
              className="py-4 items-center"
            >
              <Text className="font-Inter_SemiBold text-sm text-white">
                View Detais
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
        {item?.contact?.website && (
          <Pressable
            onPress={() => handleWebsite(item?.contact?.website)}
            className="flex-row items-center justify-center border border-slate-200 rounded-xl px-4 py-4 gap-1.5 mt-3"
          >
            <Feather name="globe" size={14} color="#0F172A" />
            <Text className="text-sm font-Inter_SemiBold text-[#0F172A]">
              Website
            </Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

export default PartnerCard;
