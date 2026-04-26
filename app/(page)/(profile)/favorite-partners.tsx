import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import Feather from "@expo/vector-icons/build/Feather";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const partners = [
  {
    id: "1",
    name: "King George Mechanical",
    category: "HVAC Services",
    phone: "(555) 123-4567",
    website: "kinggeorgemech.com",
  },
  {
    id: "2",
    name: "Ovanova",
    category: "Solar",
    phone: "(555) 234-5678",
    website: "ovanova.com",
  },
  {
    id: "3",
    name: "Cusick's Plumbing",
    category: "Plumbing Services",
    phone: "(555) 345-6789",
    website: "cusicksplumbing.com",
  },
  {
    id: "4",
    name: "Gray Construction",
    category: "Home Builder",
    phone: "(555) 456-7890",
    website: "grayconstruction.com",
  },
];

const PartnerCard = ({
  partner,
  index,
}: {
  partner: (typeof partners)[0];
  index: number;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.97,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
      className="mb-3"
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {}}
        className="bg-white rounded-2xl px-4 py-4"
      >
        {/* Top row: star icon + name + chevron */}
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-3 flex-1">
            {/* Star Icon */}
            <View className="w-11 h-11 rounded-xl bg-yellow-50 items-center justify-center">
              <Feather name="star" size={20} color="#F59E0B" />
            </View>

            {/* Name + Badge */}
            <View className="flex-1">
              <Text className="text-base text-[#111827] font-Inter_Bold mb-1">
                {partner.name}
              </Text>
              <View className="self-start bg-blue-50 rounded-full px-3 py-0.5">
                <Text className="text-xs text-blue-400 font-Inter_Regular">
                  {partner.category}
                </Text>
              </View>
            </View>
          </View>

          <Feather name="chevron-right" size={18} color="#9CA3AF" />
        </View>

        {/* Divider */}
        <View className="h-px bg-gray-100 my-2" />

        {/* Phone */}
        <View className="flex-row items-center gap-2 mb-1.5">
          <Feather name="phone" size={14} color="#9CA3AF" />
          <Text className="text-sm text-gray-500 font-Inter_Regular">
            {partner.phone}
          </Text>
        </View>

        {/* Website */}
        <View className="flex-row items-center gap-2">
          <Feather name="globe" size={14} color="#9CA3AF" />
          <Text className="text-sm text-gray-500 font-Inter_Regular">
            {partner.website}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Favoritepartners = () => {
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(headerSlide, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* header */}
        <Animated.View
          style={{
            opacity: headerFade,
            transform: [{ translateY: headerSlide }],
          }}
          className="flex-row justify-between items-center pb-2"
        >
          <TouchableOpacity onPress={() => router.back()} className="">
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-2xl text-[#111827] font-Inter_Bold">
            Favorite Partners
          </Text>
          <View />
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32, paddingTop: 8 }}
        >
          {/* content */}
          {partners.map((partner, index) => (
            <PartnerCard key={partner.id} partner={partner} index={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Favoritepartners;
