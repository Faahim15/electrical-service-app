import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import Feather from "@expo/vector-icons/build/Feather";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const faqData = [
  {
    id: 1,
    question: "How do I start a quote?",
    answer:
      "Choose a service category, review the intro page, and tap Start Quote to begin.",
    defaultOpen: true,
  },
  {
    id: 2,
    question: "Can I save my quote and finish later?",
    answer:
      "Yes, your quote is automatically saved. You can return anytime and continue from where you left off.",
    defaultOpen: false,
  },
  {
    id: 3,
    question: "What information do I need to provide for a quote?",
    answer:
      "You will need to provide details about your property, the service required, and your contact information.",
    defaultOpen: false,
  },
  {
    id: 4,
    question: "How long does it take to complete a quote request?",
    answer:
      "Most quote requests take just a few minutes to complete depending on the complexity of the service.",
    defaultOpen: false,
  },
];

const FAQCard = ({
  item,
  index,
}: {
  item: (typeof faqData)[0];
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(item.defaultOpen);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;
  const answerHeight = useRef(
    new Animated.Value(item.defaultOpen ? 1 : 0),
  ).current;
  const rotateAnim = useRef(
    new Animated.Value(item.defaultOpen ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay: index * 100,
        useNativeDriver: true,
        tension: 60,
        friction: 8,
      }),
    ]).start();
  }, []);

  const toggle = () => {
    const toValue = isOpen ? 0 : 1;
    setIsOpen(!isOpen);
    Animated.parallel([
      Animated.spring(answerHeight, {
        toValue,
        useNativeDriver: false,
        tension: 60,
        friction: 10,
      }),
      Animated.spring(rotateAnim, {
        toValue,
        useNativeDriver: false,
        tension: 60,
        friction: 10,
      }),
    ]).start();
  };

  const maxHeight = answerHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120],
  });

  const opacity = answerHeight.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY }] }}
      className="mb-3"
    >
      <View
        className="bg-white rounded-2xl px-4 pt-4"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        {/* Question row */}
        <Pressable
          onPress={toggle}
          className="flex-row items-start justify-between pb-4"
        >
          <Text className="text-[15px] font-Inter_Bold text-[#111827] flex-1 mr-3 leading-[22px]">
            {item.question}
          </Text>
          {isOpen ? (
            <Feather name="minus" size={18} color="#06B6D4" />
          ) : (
            <Feather name="plus" size={18} color="#9CA3AF" />
          )}
        </Pressable>

        {/* Answer - animated */}
        <Animated.View style={{ maxHeight, opacity, overflow: "hidden" }}>
          <View className="pb-4">
            <Text className="text-[13px] text-[#6B7280] font-Inter_Regular leading-[20px]">
              {item.answer}
            </Text>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const faqs = () => {
  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* header */}
        <View className="flex-row justify-between items-center pb-2 ">
          <Pressable onPress={() => router.back()} className="">
            <Feather name="arrow-left" size={24} color="#111827" />
          </Pressable>
          <Text className="text-2xl text-[#111827] font-Inter_Bold">FAQS</Text>
          <View />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 "
          contentContainerStyle={{ paddingBottom: 32, paddingTop: 8 }}
        >
          {/* content  */}
          {faqData.map((item, index) => (
            <FAQCard key={item.id} item={item} index={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default faqs;
