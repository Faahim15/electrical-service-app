import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import ScreenWrapper from "../shared/ScreenWrapper";

const { width, height } = Dimensions.get("window");

export function AnimatedSplashScreen() {
  return (
    <ScreenWrapper paddingHorizontal={0}>
      <View className="flex-1 bg-[#F8FCFF] items-center justify-center overflow-hidden">
        {/* Radial Gradient Effect */}

        {/* Logo Container */}
        <View
          className="bg-white items-center justify-center mb-10"
          style={{
            width: width * 0.62,
            height: width * 0.35,
            borderRadius: 999,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.06,
            shadowRadius: 20,
            elevation: 5,
          }}
        >
          <Image
            source={require("../../../assets/images/splash-icon.png")}
            resizeMode="contain"
            style={{
              width: width * 0.32,
              height: width * 0.18,
            }}
          />
        </View>

        {/* Title */}
        <Text
          className="text-[#0F172A] text-center font-Inter_Bold "
          style={{
            fontSize: width * 0.1,
          }}
        >
          Four Elements
        </Text>

        {/* Subtitle */}
        <Text
          className="text-[#64748B] text-center mt-3 font-Inter_Regular"
          style={{
            fontSize: width * 0.052,
            lineHeight: width * 0.075,
          }}
        >
          Reliable electrical solutions,{"\n"}
          simplified.
        </Text>
      </View>
    </ScreenWrapper>
  );
}
