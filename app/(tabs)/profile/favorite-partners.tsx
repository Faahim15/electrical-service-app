import { partners } from "@/data/Partnersdatabase";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { setSelectedDetail } from "@/src/redux/slices/parnerDetailsSlice";
import { setSelectedCategory } from "@/src/redux/slices/partnersRouterSlice";
import Feather from "@expo/vector-icons/build/Feather";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const partnersItem = [
  {
    id: "1",
    name: "King George Mechanical",
    partnerId: "king-george-mechanical-hvac", // ✅ fixed
    category: "HVAC",
    phone: "(540) 663-3509",
    website: "kgmheatingandair.com",
    emoji: "❄️",
    categoryData: {
      id: "8",
      title: "HVAC",
      description: "Contact our trusted partners for your HVAC needs.",
      partners: 2,
      emoji: "❄️",
    },
  },
  {
    id: "2",
    name: "Ovanova",
    partnerId: "ovanova", // ✅ already correct
    category: "Solar",
    phone: "(910) 250-9973",
    website: "ovanova.co",
    emoji: "☀️",
    categoryData: {
      id: "13",
      title: "Solar",
      description: "Solar needs",
      partners: 1,
      emoji: "☀️",
    },
  },
  {
    id: "3",
    name: "Cusick's Plumbing",
    partnerId: "cusicks-plumbing", // ✅ fixed
    category: "Plumbing",
    phone: "(540) 413-6575",
    website: "cusicksplumbing.weebly.com",
    emoji: "🔧",
    categoryData: {
      id: "10",
      title: "Plumbing",
      description: "Contact our trusted partners for your plumbing needs.",
      partners: 2,
      emoji: "🔧",
    },
  },
  {
    id: "4",
    name: "Gray Construction",
    partnerId: "gray-construction", // ✅ already correct
    category: "Home Builders",
    phone: "(804) 214-9108",
    website: "grayconstructioninc.net",
    emoji: "🏠",
    categoryData: {
      id: "6",
      title: "Home Builders",
      description:
        "Contact our trusted partners for your new home building needs.",
      partners: 2,
      emoji: "🏠",
    },
  },
];

type PartnerItem = (typeof partnersItem)[0];

const PartnerCard = ({
  partner,
  index,
}: {
  partner: PartnerItem;
  index: number;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const dispatch = useDispatch();

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

  const handleThePatner = () => {
    const categoryPartner = partners.find((p) => p.id === partner.partnerId);

    if (!categoryPartner) {
      console.warn("❌ Partner not found! id tried:", partner.partnerId);
      console.log(
        "✅ Available ids:",
        partners.map((p) => p.id),
      );
      return;
    }

    dispatch(setSelectedCategory(partner.categoryData));
    dispatch(setSelectedDetail(categoryPartner));
    router.push("/partner-details");
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
      className="mb-3"
    >
      <Pressable
        onPress={handleThePatner}
        className="bg-white rounded-2xl px-4 py-4"
      >
        {/* Top row: star icon + name + chevron */}
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-3 flex-1">
            <View className="w-11 h-11 rounded-xl bg-slate-50 items-center justify-center mr-3">
              <Text style={{ fontSize: 24 }}>{partner.emoji}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base text-[#111827] font-Inter_Bold mb-1">
                {partner.name}
              </Text>
              <View className="self-start bg-blue-50 rounded-full px-3 py-0.5">
                <Text className="text-xs text-[#6B7280] font-Inter_Regular">
                  {partner.category}
                </Text>
              </View>
            </View>
          </View>
          <Feather name="chevron-right" size={18} color="#9CA3AF" />
        </View>

        <View className="flex-row items-center gap-3">
          <View className="w-11 h-11 rounded-xl items-center justify-center mr-3" />
          <View>
            <View className="flex-row items-center gap-2 mb-1.5">
              <Feather name="phone" size={14} color="#9CA3AF" />
              <Text className="text-sm text-gray-500 font-Inter_Regular">
                {partner.phone}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Feather name="globe" size={14} color="#9CA3AF" />
              <Text className="text-sm text-gray-500 font-Inter_Regular">
                {partner.website}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
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
        <Animated.View
          style={{
            opacity: headerFade,
            transform: [{ translateY: headerSlide }],
          }}
          className="flex-row justify-between items-center pb-2"
        >
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </Pressable>
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
          {partnersItem.map((partner, index) => (
            <PartnerCard key={partner.id} partner={partner} index={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Favoritepartners;
