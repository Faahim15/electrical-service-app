import {
  selectSwitchesInstallType,
  selectSwitchesQuantity,
  setInstallType,
  setQuantity,
} from "@/src/redux/slices/globalstore/switchesDataSlice";
import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SwitchesSt1 = () => {
  const quantity = useSelector(selectSwitchesQuantity);
  const installType = useSelector(selectSwitchesInstallType);
  const dispatch = useDispatch();

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
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View className="mt-4 mb-3">
          <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-24">
            <Text className="text-sm font-Inter_Medium text-[#60A5FA]">
              Switches
            </Text>
          </View>
        </View>

        <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-5">
          Switch details
        </Text>

        {/* Quantity */}
        <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-2">
          How many switches do you need installed / replaced?
        </Text>
        <TextInput
          className="border border-[#E5E7EB] rounded-xl px-4 py-4 font-Inter_Regular text-gray-800 text-sm bg-white mb-5"
          onChangeText={(v) => dispatch(setQuantity(v))}
          value={quantity}
          keyboardType="numeric"
          placeholderTextColor="#9CA3AF"
        />

        {/* Install Type */}
        <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
          Is this a new install or replacement?
        </Text>

        {["New install", "Replacement"].map((item, index) => {
          const isSelected = installType === item;
          return (
            <Animated.View
              key={item}
              style={{ transform: [{ scale: installAnims[index] }] }}
            >
              <Pressable
                onPress={() => {
                  animatePressIn(installAnims[index]);
                  dispatch(setInstallType(item));
                }}
                className="mb-2 rounded-xl border px-4 py-4"
                style={{
                  backgroundColor: isSelected ? "#60A5FA" : "#ffffff",
                  borderColor: isSelected ? "#60A5FA" : "#E5E7EB",
                }}
              >
                <Text
                  className={`font-Inter_Medium text-base ${
                    isSelected ? "text-white" : "text-[#1F2937]"
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            </Animated.View>
          );
        })}

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
};

export default SwitchesSt1;
