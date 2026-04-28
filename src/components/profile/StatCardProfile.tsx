import React, { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";
type StatCardProps = { value: number; label: string; delay: number };
const StatCardProfile = ({ value, label, delay }: StatCardProps) => {
  const scale = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        opacity,
        flex: 1,
        shadowColor: "#06B6D4",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}
      className="bg-white rounded-2xl mx-1 py-4 items-center shadow-sm"
    >
      <Text className="text-2xl font-bold text-[#0F172A]">{value}</Text>
      <Text className="text-xs font-Inter_Regular text-[#475569] mt-0.5">
        {label}
      </Text>
    </Animated.View>
  );
};

export default StatCardProfile;
