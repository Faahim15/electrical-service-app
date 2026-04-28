import ProfileEditForm from "@/src/components/profile/profileEdit/ProfileEditForm";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const editprofile = () => {
  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* header */}
        <View className="flex-row justify-between items-center pb-2 ">
          <TouchableOpacity onPress={() => router.back()} className="">
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-2xl text-[#111827] font-Inter_Bold">
            Edit Profile
          </Text>
          <View />
        </View>

        {/* content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 "
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <LinearGradient
            colors={["#0EA5E9", "#14B8A6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingHorizontal: 18,
              paddingVertical: 15,
              borderRadius: 24,
              overflow: "hidden",
              shadowColor: "#0EA5E9",
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.35,
              shadowRadius: 20,
              elevation: 10,
              marginTop: 20,
            }}
          >
            {/* ==============The main content of the card */}

            <View className="flex-row items-center ">
              <View className="w-[66px] h-[66px] bg-white rounded-[18px] items-center justify-center mr-4 shadow-md elevation-6">
                <Text className="text-[22px] font-extrabold text-[#0EA5E9] tracking-[1px]">
                  AM
                </Text>
              </View>

              <View className="gap-[2px]">
                <Text className="text-white text-[20px] font-Inter_Bold leading-[24px]">
                  Ashley Martinez
                </Text>
                <Text className="text-[#FFFFFFE5] text-[13.5px] font-Inter_Medium">
                  Update your profile information
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* form data */}
          <ProfileEditForm />
          <View className="h-98" />
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default editprofile;
