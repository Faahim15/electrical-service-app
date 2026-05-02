import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const INTENDED_USES = [
  "General Use",
  "EV Charger",
  "Freezer",
  "Tools / Equipment",
  "Other",
];

const OutletsSt1 = () => {
  const [selectedUse, setSelectedUse] = useState("General Use");
  const [quantity, setQuantity] = useState("");

  const animatedValues = useRef(
    INTENDED_USES.map(() => new Animated.Value(1)),
  ).current;

  const handleSelect = (item: string, index: number) => {
    Animated.sequence([
      Animated.timing(animatedValues[index], {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    setSelectedUse(item);
  };

  const continueAnim = useRef(new Animated.Value(1)).current;

  const handleContinuePress = () => {
    Animated.sequence([
      Animated.timing(continueAnim, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(continueAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View className="mt-4 mb-2">
          <View
            className="self-start px-3 py-1 rounded-full border border-cyan-400"
            style={{ borderColor: "#06B6D4" }}
          >
            <Text
              className="font-Inter_Medium text-xs"
              style={{ color: "#06B6D4" }}
            >
              Outlets
            </Text>
          </View>
        </View>

        <Text className="font-Inter_Bold text-2xl text-gray-900 mb-5">
          Outlet details
        </Text>

        <Text className="font-Inter_SemiBold text-gray-800 text-sm mb-3">
          What is the intended use of the outlet?
        </Text>

        {/* Use Options */}
        {INTENDED_USES.map((item, index) => {
          const isSelected = selectedUse === item;
          return (
            <Animated.View
              key={item}
              style={{ transform: [{ scale: animatedValues[index] }] }}
            >
              <TouchableOpacity
                onPress={() => handleSelect(item, index)}
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

        <Text className="font-Inter_SemiBold text-gray-800 text-sm mt-5 mb-2">
          How many outlets do you need installed / replaced?
        </Text>

        <TextInput
          className="border border-gray-200 rounded-xl px-4 py-3 font-Inter_Regular text-gray-800 text-sm bg-white mb-6"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholder=""
          placeholderTextColor="#9CA3AF"
        />
      </ScrollView>
    </View>
  );
};

export default OutletsSt1;
