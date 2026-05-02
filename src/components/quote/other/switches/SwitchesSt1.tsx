import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SwitchesSt1 = () => {
  const [quantity, setQuantity] = useState("");
  const [installType, setInstallType] = useState("New install");

  const installAnims = useRef(
    ["New install", "Replacement"].map(() => new Animated.Value(1)),
  ).current;
  const continueAnim = useRef(new Animated.Value(1)).current;

  const animatePressIn = (anim: Animated.Value) => {
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View className="flex-1 ">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View className="mt-4 mb-3">
          <View
            className="self-start px-3 py-1 rounded-full border"
            style={{ borderColor: "#06B6D4" }}
          >
            <Text
              className="font-Inter_Medium text-xs"
              style={{ color: "#06B6D4" }}
            >
              Switches
            </Text>
          </View>
        </View>

        <Text className="font-Inter_Bold text-2xl text-gray-900 mb-5">
          Switch details
        </Text>

        {/* Quantity */}
        <Text className="font-Inter_SemiBold text-gray-800 text-sm mb-2">
          How many switches do you need installed / replaced?
        </Text>
        <TextInput
          className="border border-gray-200 rounded-xl px-4 py-3 font-Inter_Regular text-gray-800 text-sm bg-white mb-5"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholderTextColor="#9CA3AF"
        />

        {/* Install Type */}
        <Text className="font-Inter_SemiBold text-gray-800 text-sm mb-3">
          Is this a new install or replacement?
        </Text>

        {["New install", "Replacement"].map((item, index) => {
          const isSelected = installType === item;
          return (
            <Animated.View
              key={item}
              style={{ transform: [{ scale: installAnims[index] }] }}
            >
              <TouchableOpacity
                onPress={() => {
                  animatePressIn(installAnims[index]);
                  setInstallType(item);
                }}
                activeOpacity={0.85}
                className="mb-2 rounded-xl border px-4 py-4"
                style={{
                  backgroundColor: isSelected ? "#06B6D4" : "#ffffff",
                  borderColor: isSelected ? "#06B6D4" : "#E5E7EB",
                }}
              >
                <Text
                  className={`font-Inter_Medium text-sm ${
                    isSelected ? "text-white" : "text-gray-700"
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
};

export default SwitchesSt1;
