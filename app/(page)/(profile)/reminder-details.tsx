import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { RootState } from "@/src/redux/store";
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
import { useSelector } from "react-redux";

const Reminderdetails = () => {
  const reminder = useSelector(
    (state: RootState) => state.reminderDetails.selectedReminder,
  );
  console.log(reminder);
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const card1Anim = useRef(new Animated.Value(0)).current;
  const card2Anim = useRef(new Animated.Value(0)).current;
  const card3Anim = useRef(new Animated.Value(0)).current;
  const card4Anim = useRef(new Animated.Value(0)).current;
  const btnAnim = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.stagger(100, [
      Animated.timing(card1Anim, {
        toValue: 1,
        duration: 350,
        delay: 150,
        useNativeDriver: true,
      }),
      Animated.timing(card2Anim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(card3Anim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(card4Anim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(btnAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const makeCardStyle = (anim: Animated.Value, delay = 0) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  });

  const handleDeletePress = () => {
    Animated.sequence([
      Animated.timing(btnScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(btnScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* header */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
          className="flex-row justify-between items-center pb-2"
        >
          <TouchableOpacity onPress={() => router.back()} className="">
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-2xl text-[#111827] font-Inter_Bold">
            Reminder Details
          </Text>
          <View />
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32, gap: 12 }}
        >
          {/* Reminder Title Card */}
          <Animated.View
            style={makeCardStyle(card1Anim)}
            className="bg-white rounded-2xl px-4 py-4 mt-3"
          >
            <Text className="text-xs text-gray-400 mb-1 font-Inter_Regular">
              Reminder Title
            </Text>
            <Text className="text-base text-[#111827] font-Inter_Bold">
              {reminder?.title}
            </Text>
          </Animated.View>

          {/* Frequency + Next Due Date Card */}
          <Animated.View
            style={makeCardStyle(card2Anim)}
            className="bg-white rounded-2xl px-4 py-4"
          >
            {/* Frequency Row */}
            <View className="flex-row items-center gap-3 pb-3 border-b border-gray-100">
              <Feather name="clock" size={18} color="#9CA3AF" />
              <View>
                <Text className="text-xs text-gray-400 font-Inter_Regular">
                  Frequency
                </Text>
                <Text className="text-sm text-[#111827] font-Inter_SemiBold mt-0.5">
                  {reminder?.frequency}
                </Text>
              </View>
            </View>

            {/* Next Due Date Row */}
            <View className="flex-row items-center gap-3 pt-3">
              <Feather name="calendar" size={18} color="#9CA3AF" />
              <View>
                <Text className="text-xs text-gray-400 font-Inter_Regular">
                  Next Due Date
                </Text>
                <Text className="text-sm text-[#111827] font-Inter_SemiBold mt-0.5">
                  April 15, 2026
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Status Card */}
          <Animated.View
            style={makeCardStyle(card3Anim)}
            className="bg-white rounded-2xl px-4 py-4"
          >
            <Text className="text-xs text-gray-400 mb-2 font-Inter_Regular">
              Status
            </Text>
            <View className="self-start bg-cyan-50   rounded-full px-4 py-1">
              <Text className="text-sm text-gray-700 font-Inter_SemiBold">
                {reminder?.status}
              </Text>
            </View>
          </Animated.View>

          {/* Notes Card */}
          <Animated.View
            style={makeCardStyle(card4Anim)}
            className="bg-white rounded-2xl px-4 py-4 min-h-[80px]"
          >
            <Text className="text-base text-[#111827] font-Inter_Bold">
              Notes
            </Text>
          </Animated.View>

          {/* Delete Button */}
          <Animated.View
            style={[
              makeCardStyle(btnAnim),
              { transform: [{ scale: btnScale }] },
            ]}
            className="mt-2"
          >
            <TouchableOpacity
              onPress={handleDeletePress}
              activeOpacity={0.85}
              className="bg-red-50 border border-red-200 rounded-2xl py-4 flex-row items-center justify-center gap-2"
            >
              <Feather name="trash-2" size={18} color="#EF4444" />
              <Text className="text-base text-red-500 font-Inter_SemiBold">
                Delete Reminder
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Reminderdetails;
