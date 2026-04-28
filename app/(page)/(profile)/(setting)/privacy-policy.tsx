import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import Feather from "@expo/vector-icons/build/Feather";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const privacypolicy = () => {
  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* header */}
        <View className="flex-row justify-between items-center pb-2 ">
          <TouchableOpacity onPress={() => router.back()} className="">
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-2xl text-[#111827] font-Inter_Bold">
            Privacy Policy
          </Text>
          <View />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 "
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {/* content  */}
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default privacypolicy;
