import {
  setExpectedDate,
  setHasEquipment,
} from "@/src/redux/slices/globalstore/StarlinkDataSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const OptionRow = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const bgAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: selected ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  const bg = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ffffff", "#60A5FA"],
  });
  const textColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#1F2937", "#ffffff"],
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={{
          backgroundColor: bg,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: selected ? "#60A5FA" : "#E5E7EB",
          paddingVertical: 14,
          paddingHorizontal: 16,
          marginBottom: 10,
        }}
      >
        <Animated.Text
          style={{ color: textColor }}
          className="font-Inter_Medium text-base"
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

const StarlinkSt1 = () => {
  const dispatch = useDispatch<AppDispatch>();

  const hasEquipment = useSelector(
    (state: RootState) => state.starlinkData.hasEquipment,
  );
  const expectedDate = useSelector(
    (state: RootState) => state.starlinkData.expectedDate,
  );

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: hasEquipment === "no" ? 1 : 0,
      duration: hasEquipment === "no" ? 300 : 200,
      useNativeDriver: true,
    }).start();
  }, [hasEquipment]);

  return (
    <View className="flex-1">
      <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-24">
        <Text className="text-sm font-Inter_Medium text-[#60A5FA]">
          Starlink
        </Text>
      </View>

      <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-2">
        Equipment status
      </Text>
      <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-5">
        Do you have the Starlink equipment?
      </Text>

      <OptionRow
        label="Yes"
        selected={hasEquipment === "yes"}
        onPress={() => dispatch(setHasEquipment("yes"))}
      />
      <OptionRow
        label="No"
        selected={hasEquipment === "no"}
        onPress={() => dispatch(setHasEquipment("no"))}
      />

      <Animated.View
        style={{
          opacity: slideAnim,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-10, 0],
              }),
            },
          ],
        }}
      >
        {hasEquipment === "no" && (
          <View className="mt-3">
            <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-2">
              When do you expect to have the equipment?
            </Text>
            <TextInput
              value={expectedDate}
              onChangeText={(text) => dispatch(setExpectedDate(text))}
              placeholder=""
              placeholderTextColor="#9CA3AF"
              className="border border-gray-200 rounded-xl mb-4 px-4 py-4 font-Inter_Regular text-sm text-[#1F2937] bg-white"
            />
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default StarlinkSt1;
