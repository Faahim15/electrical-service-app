import React, { useEffect, useRef, useState } from "react";
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

// ─── OtherInput — animated reveal ─────────────────────────────────────────────
const OtherInput = ({
  visible,
  value,
  onChangeText,
}: {
  visible: boolean;
  value: string;
  onChangeText: (t: string) => void;
}) => {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: visible ? 120 : 0, // animate to exact px height
        duration: 280,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: visible ? 1 : 0,
        duration: 220,
        useNativeDriver: false,
      }),
    ]).start();
  }, [visible]);

  return (
    <Animated.View
      style={{
        height: heightAnim, // direct height, not maxHeight
        opacity: opacityAnim,
        overflow: "hidden",
        marginBottom: visible ? 8 : 0,
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Please describe the intended use..."
        placeholderTextColor="#9CA3AF"
        multiline
        textAlignVertical="top"
        className="font-Inter_Regular text-sm text-gray-800 bg-white rounded-xl px-4 py-3 flex-1"
        style={{
          borderWidth: 1.5,
          borderColor: focused ? "#60A5FA" : "#E5E7EB",
        }}
      />
    </Animated.View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const OutletsSt1 = () => {
  const [selectedUse, setSelectedUse] = useState("General Use");
  const [otherText, setOtherText] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityFocused, setQuantityFocused] = useState(false);

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

  return (
    <View className="flex-1 bg-[#EFF6FF]">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 40,
        }}
      >
        {/* Badge */}
        <View className="self-start bg-blue-50 rounded-full px-3 py-1 mb-5 border border-blue-100">
          <Text className="font-Inter_SemiBold text-[11px] text-[#60A5FA] tracking-wide">
            Outlets
          </Text>
        </View>

        {/* Title */}
        <Text className="font-Inter_Bold text-2xl text-gray-900 mb-1">
          Outlet details
        </Text>
        <Text className="font-Inter_Regular text-[13px] text-slate-500 mb-5">
          Tell us about the outlets you need so we can estimate accurately.
        </Text>

        {/* Card */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <Text className="font-Inter_SemiBold text-gray-800 text-sm mb-3">
            What is the intended use of the outlet?
          </Text>

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
                  className="mb-2 rounded-xl px-4 py-4"
                  style={{
                    backgroundColor: isSelected ? "#60A5FA" : "#F8FAFC",
                    borderWidth: 1.5,
                    borderColor: isSelected ? "#60A5FA" : "#E5E7EB",
                  }}
                >
                  <Text
                    className={`text-sm ${
                      isSelected
                        ? "font-Inter_SemiBold text-white"
                        : "font-Inter_Medium text-gray-700"
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>

                {/* Animated "Other" input — slides open under the Other row */}
                {item === "Other" && (
                  <OtherInput
                    visible={selectedUse === "Other"}
                    value={otherText}
                    onChangeText={setOtherText}
                  />
                )}
              </Animated.View>
            );
          })}
        </View>

        {/* Quantity Card */}
        <View className="bg-white rounded-2xl p-4 shadow-sm">
          <Text className="font-Inter_SemiBold text-gray-800 text-sm mb-3">
            How many outlets do you need installed / replaced?
          </Text>

          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            onFocus={() => setQuantityFocused(true)}
            onBlur={() => setQuantityFocused(false)}
            keyboardType="numeric"
            placeholder="e.g.  2"
            placeholderTextColor="#9CA3AF"
            className="font-Inter_Regular text-sm text-gray-800 bg-[#F8FAFC] rounded-xl px-4 py-3"
            style={{
              borderWidth: 1.5,
              borderColor: quantityFocused ? "#60A5FA" : "#E5E7EB",
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default OutletsSt1;
