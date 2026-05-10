import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/** Selectable option row */
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
    outputRange: ["#374151", "#ffffff"],
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
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
          style={{
            color: textColor,
            fontFamily: "Inter_Medium",
            fontSize: 15,
          }}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const StarlinkSt1 = () => {
  const [hasEquipment, setHasEquipment] = useState<string | null>(null);
  const [expectedDate, setExpectedDate] = useState("");

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (hasEquipment === "no") {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [hasEquipment]);

  return (
    <View className="flex-1">
      <View>
        <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-24">
          <Text className="text-sm font-Inter_Medium text-[#60A5FA] ">
            Starlink
          </Text>
        </View>

        <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-2">
          Equipment status
        </Text>
        <Text className="text-sm font-Inter_Medium text-[#1F2937] mb-5">
          Do you have the Starlink equipment?
        </Text>

        <OptionRow
          label="Yes"
          selected={hasEquipment === "yes"}
          onPress={() => setHasEquipment("yes")}
        />
        <OptionRow
          label="No"
          selected={hasEquipment === "no"}
          onPress={() => setHasEquipment("no")}
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
              <Text className="text-sm font-Inter_Medium text-gray-700 mb-2">
                When do you expect to have the equipment?
              </Text>
              <TextInput
                value={expectedDate}
                onChangeText={setExpectedDate}
                placeholder=""
                placeholderTextColor="#9CA3AF"
                className="border border-gray-200 rounded-xl mb-4 px-4 py-4 font-Inter_Regular text-sm text-gray-800 bg-white"
              />
            </View>
          )}
        </Animated.View>
      </View>
    </View>
  );
};

export default StarlinkSt1;
