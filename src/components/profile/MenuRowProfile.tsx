import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Href, router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
type MenuRowProps = {
  emoji: string;
  route: Href;
  title: string;
  subtitle: string;
  delay: number;
};
const MenuRowProfile = ({
  emoji,
  route,
  title,
  subtitle,
  delay,
}: MenuRowProps) => {
  const translateX = useRef(new Animated.Value(60)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        delay,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{ transform: [{ translateX }, { scale }], opacity }}
      className="mb-3"
    >
      <TouchableOpacity
        onPress={() => router.push(route)}
        className="bg-white rounded-2xl px-4 py-3.5 flex-row items-center shadow-sm"
        style={{
          shadowColor: "#06B6D4",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <View className="mr-3">
          <LinearGradient
            colors={["#0EA5E91A", "#14B8A61A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 12,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SvgXml xml={emoji} width={24} height={24} color={"#0EA5E9"} />
          </LinearGradient>
        </View>
        {/* <MenuIcon emoji={emoji} /> */}
        <View className="flex-1">
          <Text className="text-base font-Inter_SemiBold text-[#0F172A]">
            {title}
          </Text>
          <Text className="text-sm text-[#475569] font-Inter_Medium mt-1">
            {subtitle}
          </Text>
        </View>
        <View>
          <Entypo name="chevron-small-right" size={24} color="#CBD5E1" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MenuRowProfile;
