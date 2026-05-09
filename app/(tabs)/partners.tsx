import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { setSelectedCategory } from "@/src/redux/slices/partnersRouterSlice";
import { Entypo } from "@expo/vector-icons";
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
import { useDispatch } from "react-redux";
interface Category {
  id: string;
  title: string;
  description: string;
  partners: number;
  emoji: string;
}
const CATEGORIES: Category[] = [
  {
    id: "1",
    title: "Accessory Building / Structure",
    description:
      "Contact our trusted partners for your accessory building/structure needs.",
    partners: 2,
    emoji: "🏗️",
  },
  {
    id: "2",
    title: "Automotive",
    description: "Contact our trusted partners for your Automotive needs.",
    partners: 3,
    emoji: "🚗",
  },
  {
    id: "3",
    title: "Excavation",
    description: "Contact our trusted partners for your Excavation needs.",
    partners: 1,
    emoji: "🚜",
  },
  {
    id: "4",
    title: "Gas",
    description: "Contact our trusted partners for your Gas needs.",
    partners: 2,
    emoji: "🔥",
  },
  {
    id: "5",
    title: "Graphic Design / Printing",
    description: "Graphic Design needs.",
    partners: 2,
    emoji: "🖨️",
  },
  {
    id: "6",
    title: "Home Builders",
    description:
      "Contact our trusted partners for your new home building needs.",
    partners: 2,
    emoji: "🏠",
  },
  {
    id: "7",
    title: "Home Improvement",
    description:
      "Contact our trusted partners for your home improvement needs.",
    partners: 5,
    emoji: "🔨",
  },
  {
    id: "8",
    title: "HVAC",
    description: "Contact our trusted partners for your HVAC needs.",
    partners: 2,
    emoji: "❄️",
  },
  {
    id: "9",
    title: "Painting",
    description: "Contact our trusted partners for your painting needs.",
    partners: 1,
    emoji: "🎨",
  },
  {
    id: "10",
    title: "Plumbing",
    description: "Contact our trusted partners for your plumbing needs.",
    partners: 2,
    emoji: "🔧",
  },
  {
    id: "11",
    title: "Property Management",
    description:
      "Contact our trusted partners for your property management needs.",
    partners: 2,
    emoji: "🏢",
  },
  {
    id: "12",

    title: "Septic",
    description: "Contact our trusted partners for your Septic needs.",
    partners: 1,
    emoji: "💧",
  },
  {
    id: "13",

    title: "Solar",
    description: "Solar needs",
    partners: 1,
    emoji: "☀️",
  },
];

const CategoryCard = ({
  item,
  index,
}: {
  item: (typeof CATEGORIES)[0];
  index: number;
}) => {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.97)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 450,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 450,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay: index * 60,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }),
    ]).start();
  }, []);

  const dispatch = useDispatch();

  const handleRoute = () => {
    dispatch(setSelectedCategory(item));
    router.push("/partner-categorie");
  };
  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        opacity: opacityAnim,
      }}
      className="mb-3"
    >
      <TouchableOpacity
        activeOpacity={0.75}
        className="bg-white rounded-2xl  px-4 py-4 flex-row items-center shadow-sm"
        style={{
          shadowColor: "#06B6D4",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 2,
        }}
        onPress={handleRoute}
      >
        <View className="w-11 h-11 rounded-xl bg-slate-50 items-center justify-center mr-3">
          <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
        </View>

        <View className="flex-1 mr-2">
          <Text
            className="text-[15px] font-Inter_Bold text-[#101828] leading-snug mb-0.5"
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            className="text-[13px] font-Inter_Regular text-[#6A7282] leading-snug mb-1"
            numberOfLines={2}
          >
            {item.description}
          </Text>
          <Text className="text-[13px] font-Inter_Regular text-[#0092B8]">
            {item.partners} partners available
          </Text>
        </View>

        <View className="w-6 h-6 items-center justify-center">
          <Entypo name="chevron-small-right" size={24} color="#99A1AF" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Partners = () => {
  const headerSlide = useRef(new Animated.Value(-30)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerSlide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1 px-4">
        <Animated.View
          style={{
            transform: [{ translateY: headerSlide }],
            opacity: headerOpacity,
          }}
          className="pb-4"
        >
          <Text className="text-2xl font-Inter_Bold text-[#0F172A]">
            Partners Categories
          </Text>
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {CATEGORIES.map((item, index) => (
            <CategoryCard key={item.id} item={item} index={index} />
          ))}
          <View className="h-80" />
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Partners;
