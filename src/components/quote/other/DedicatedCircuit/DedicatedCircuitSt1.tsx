import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const DedicatedCircuitSt1 = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const inputHeight = useRef(new Animated.Value(0)).current;
  const inputOpacity = useRef(new Animated.Value(0)).current;

  const inputHeight2 = useRef(new Animated.Value(0)).current;
  const inputOpacity2 = useRef(new Animated.Value(0)).current;

  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [otherText, setOtherText] = useState("");
  const [otherPanelText, setOtherPanelText] = useState("");

  const circuitOptions = [
    "EV charger",
    "Freezer",
    "RV",
    "Tools / Equipment",
    "Accessory Building",
    "Dock Power",
    "Other",
  ];

  const panelLocations = [
    "Basement (Finished)",
    "Basement (Unfinished)",
    "Garage (Finished)",
    "Garage (Unfinished)",
    "Other (please specify)",
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCircuitSelect = (option: string) => {
    setSelectedCircuit(option);

    if (option === "Other") {
      Animated.parallel([
        Animated.timing(inputHeight, {
          toValue: 120,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(inputOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(inputHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(inputOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const handlePanelSelect = (location: string) => {
    setSelectedPanel(location);

    if (location === "Other (please specify)") {
      Animated.parallel([
        Animated.timing(inputHeight2, {
          toValue: 120,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(inputOpacity2, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(inputHeight2, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(inputOpacity2, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const renderOption = (
    label: string,
    isSelected: boolean,
    onPress: () => void,
  ) => (
    <TouchableOpacity
      key={label}
      activeOpacity={0.75}
      onPress={onPress}
      className={`rounded-2xl px-4 py-4 mb-2 ${isSelected ? "bg-[#60A5FA]" : "bg-white"}`}
      style={{
        shadowColor: isSelected ? "#14B8A6" : "#0EA5E9",
        shadowOpacity: isSelected ? 0.25 : 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        borderWidth: 2,
        borderColor: isSelected ? "#60A5FA" : "transparent",
      }}
    >
      <Text
        className={`font-Inter_Regular text-sm ${isSelected ? "text-white" : "text-[#334155]"}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header tag */}
        <View className="self-start bg-[#EFF6FF] rounded-full px-3 py-1 mb-5">
          <Text className="text-[#60A5FA] text-[11px] font-Inter_SemiBold tracking-wide ">
            Dedicated Circuit
          </Text>
        </View>

        {/* Heading */}
        <Animated.View style={{ opacity: fadeAnim }} className="pt-2 pb-4">
          <Text className="text-[#0F172A] text-2xl font-Inter_Bold">
            Intended use
          </Text>
        </Animated.View>

        {/* Section 1 */}
        <Animated.View style={{ opacity: fadeAnim }} className="pb-3">
          <Text className="text-[#0F172A] text-base mb-3 font-Inter_Medium">
            What do you need a dedicated circuit for?
          </Text>
          {circuitOptions.map((option) =>
            renderOption(option, selectedCircuit === option, () =>
              handleCircuitSelect(option),
            ),
          )}

          {/* Animated "Other" input */}
          <Animated.View
            style={{
              height: inputHeight,
              opacity: inputOpacity,
              overflow: "hidden",
            }}
          >
            <TextInput
              value={otherText}
              onChangeText={setOtherText}
              placeholder="Please describe your intended use..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              className="bg-white rounded-2xl px-4 py-3 text-sm font-Inter_Regular text-[#334155] mt-2"
              style={{
                borderWidth: 2,
                borderColor: "#60A5FA",
                height: 112,
              }}
            />
          </Animated.View>
        </Animated.View>

        {/* Section 2 */}
        <Animated.View style={{ opacity: fadeAnim }} className="pt-4 pb-3">
          <Text
            className="text-[#0F172A] text-[15px] mb-3"
            style={{ fontFamily: "Inter_SemiBold" }}
          >
            Where is your electrical panel located?
          </Text>
          {panelLocations.map((location) =>
            renderOption(location, selectedPanel === location, () =>
              handlePanelSelect(location),
            ),
          )}

          {/* Animated "Other" input */}
          <Animated.View
            style={{
              height: inputHeight2,
              opacity: inputOpacity2,
              overflow: "hidden",
            }}
          >
            <TextInput
              value={otherPanelText}
              onChangeText={setOtherPanelText}
              placeholder="Please describe panel location..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              className="bg-white rounded-2xl px-4 py-3 text-sm font-Inter_Regular text-[#334155] mt-2"
              style={{
                borderWidth: 2,
                borderColor: "#60A5FA",
                height: 112,
              }}
            />
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default DedicatedCircuitSt1;
