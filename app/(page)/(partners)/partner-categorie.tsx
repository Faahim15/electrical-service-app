import PartnerCard from "@/src/components/pratner/PartnerCard";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { RootState } from "@/src/redux/store";
import { Feather } from "@expo/vector-icons";
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
import { useSelector } from "react-redux";

const PARTNERS = [
  {
    id: "1",
    name: "JSM INDUSTRIAL",
    category: "Accessory Building / Structure",
    phone: "(540) 446-8919",
    website: null,
  },
  {
    id: "2",
    name: "Superior Building",
    category: "Accessory Building / Structure",
    phone: "(540) 269-2696",
    website: "https://www.superiorbuildings.net/",
  },
];

const Partnercategorie = () => {
  const headerSlide = useRef(new Animated.Value(-30)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const heroBannerSlide = useRef(new Animated.Value(20)).current;
  const heroBannerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerSlide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(heroBannerSlide, {
        toValue: 0,
        duration: 500,
        delay: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heroBannerOpacity, {
        toValue: 1,
        duration: 500,
        delay: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const category = useSelector(
    (state: RootState) => state.partners.selectedCategory,
  );

  //   console.log("Selected Category in PartnerCard:", category);

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* ── Header ── */}
        <Animated.View
          style={{
            transform: [{ translateY: headerSlide }],
            opacity: headerOpacity,
          }}
          className="flex-row justify-between items-center pb-2 px-4"
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-xl text-[#111827] font-Inter_Bold">
            {category?.title}
          </Text>
          <View />
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {/* ── Hero Banner ── */}
          <Animated.View
            className="mx-4 mb-4 bg-white rounded-2xl px-4 py-4 mt-3"
            style={[
              {
                transform: [{ translateY: heroBannerSlide }],
                opacity: heroBannerOpacity,
              },
              {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 4,
                elevation: 2,
              },
            ]}
          >
            <View className="flex-row items-center gap-3 mb-2">
              <View className="w-12 h-12 bg-amber-50 rounded-xl items-center justify-center">
                <Text style={{ fontSize: 26 }}>{category?.emoji}</Text>
              </View>
              <Text className="text-[17px] font-Inter_Bold text-[#0F172A] flex-1 leading-snug">
                {category?.title}
              </Text>
            </View>
            <Text className="text-[13px] font-Inter_Regular text-[#64748B] leading-relaxed">
              {category?.description}
            </Text>
          </Animated.View>

          {/* ── Partner Cards ── */}
          {PARTNERS.map((item, index) => (
            <PartnerCard key={item.id} item={item} index={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Partnercategorie;
