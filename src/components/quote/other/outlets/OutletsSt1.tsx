import {
  IntendedUse,
  selectOutletsSt1,
  setIntendedUse,
  setOtherUseText,
  setQuantity,
} from "@/src/redux/slices/globalstore/outletsDataSlice";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const INTENDED_USES: IntendedUse[] = [
  "General Use",
  // "Freezer",
  // "Tools / Equipment",
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
        toValue: visible ? 120 : 0,
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
        height: heightAnim,
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
  const dispatch = useDispatch();
  const { intendedUse, otherUseText, quantity } = useSelector(selectOutletsSt1);

  const [quantityFocused, setQuantityFocused] = useState(false);
  // console.log(intendedUse);

  const animatedValues = useRef(
    INTENDED_USES.map(() => new Animated.Value(1)),
  ).current;

  const handleSelect = (item: IntendedUse, index: number) => {
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
    dispatch(setIntendedUse(item));
  };

  return (
    <View className="flex-1">
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
        <View className="self-start bg-[#EFF6FF] rounded-full px-3 py-1 mb-5">
          <Text className="text-[#60A5FA] text-[11px] font-Inter_SemiBold tracking-wide">
            Outlets
          </Text>
        </View>

        {/* Title */}
        <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-1">
          Outlet details
        </Text>
        <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-5">
          Tell us about the outlets you need so we can estimate accurately.
        </Text>

        {/* Intended Use */}
        <View className="mb-4">
          <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
            What is the intended use of the outlet?
          </Text>

          {INTENDED_USES.map((item, index) => {
            const isSelected = intendedUse === item;
            return (
              <Animated.View
                key={item}
                style={{ transform: [{ scale: animatedValues[index] }] }}
              >
                <Pressable
                  onPress={() => handleSelect(item, index)}
                  className="mb-2 rounded-xl px-4 py-4"
                  style={{
                    backgroundColor: isSelected ? "#60A5FA" : "#F8FAFC",
                    borderWidth: 1.5,
                    borderColor: isSelected ? "#60A5FA" : "#E5E7EB",
                  }}
                >
                  <Text
                    className={`text-base font-Inter_Medium ${
                      isSelected ? "text-white" : "text-[#1F2937]"
                    }`}
                  >
                    {item}
                  </Text>
                </Pressable>

                {item === "Other" && (
                  <OtherInput
                    visible={intendedUse === "Other"}
                    value={otherUseText}
                    onChangeText={(t) => dispatch(setOtherUseText(t))}
                  />
                )}
              </Animated.View>
            );
          })}
        </View>

        {/* Quantity */}
        <View>
          <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
            How many outlets do you need installed / replaced?
          </Text>

          <TextInput
            value={quantity}
            onChangeText={(v) => dispatch(setQuantity(v))}
            onFocus={() => setQuantityFocused(true)}
            onBlur={() => setQuantityFocused(false)}
            keyboardType="numeric"
            placeholder=""
            placeholderTextColor="#9CA3AF"
            className="font-Inter_Regular text-sm text-gray-800 bg-[#F8FAFC] rounded-xl px-4 py-4"
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
