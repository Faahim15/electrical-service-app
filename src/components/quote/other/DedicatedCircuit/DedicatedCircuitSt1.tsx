import {
  setOtherCircuitText,
  setOtherPanelText,
  setSelectedCircuit,
  setSelectedPanel,
} from "@/src/redux/slices/globalstore/dedicatedCircuitDataSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const circuitOptions = ["Freezer", "RV", "Tools / Equipment", "Other"];
const panelLocations = [
  "Basement (Finished)",
  "Basement (Unfinished)",
  "Garage (Finished)",
  "Garage (Unfinished)",
  "Other (please specify)",
];

const DedicatedCircuitSt1 = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedCircuit = useSelector(
    (state: RootState) => state.dedicatedCircuitData.selectedCircuit,
  );
  const otherCircuitText = useSelector(
    (state: RootState) => state.dedicatedCircuitData.otherCircuitText,
  );
  const selectedPanel = useSelector(
    (state: RootState) => state.dedicatedCircuitData.selectedPanel,
  );
  const otherPanelText = useSelector(
    (state: RootState) => state.dedicatedCircuitData.otherPanelText,
  );

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputHeight = useRef(new Animated.Value(0)).current;
  const inputOpacity = useRef(new Animated.Value(0)).current;
  const inputHeight2 = useRef(new Animated.Value(0)).current;
  const inputOpacity2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCircuitSelect = (option: string) => {
    dispatch(setSelectedCircuit(option));
    Animated.parallel([
      Animated.timing(inputHeight, {
        toValue: option === "Other" ? 120 : 0,
        duration: option === "Other" ? 250 : 200,
        useNativeDriver: false,
      }),
      Animated.timing(inputOpacity, {
        toValue: option === "Other" ? 1 : 0,
        duration: option === "Other" ? 250 : 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePanelSelect = (location: string) => {
    dispatch(setSelectedPanel(location));
    Animated.parallel([
      Animated.timing(inputHeight2, {
        toValue: location === "Other (please specify)" ? 120 : 0,
        duration: location === "Other (please specify)" ? 250 : 200,
        useNativeDriver: false,
      }),
      Animated.timing(inputOpacity2, {
        toValue: location === "Other (please specify)" ? 1 : 0,
        duration: location === "Other (please specify)" ? 250 : 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const renderOption = (
    label: string,
    isSelected: boolean,
    onPress: () => void,
  ) => (
    <Pressable
      key={label}
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
        className={`text-base font-Inter_Medium ${isSelected ? "text-white" : "text-[#1F2937]"}`}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="self-start bg-[#EFF6FF] rounded-full px-3 py-1 mb-5">
          <Text className="text-[#60A5FA] text-[11px] font-Inter_SemiBold tracking-wide">
            Dedicated Circuit
          </Text>
        </View>

        <Animated.View style={{ opacity: fadeAnim }} className="pt-2 pb-4">
          <Text className="text-2xl font-Inter_Bold text-[#1F2937]">
            Intended use
          </Text>
        </Animated.View>

        {/* Circuit options */}
        <Animated.View style={{ opacity: fadeAnim }} className="pb-3">
          <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
            What do you need a dedicated circuit for?
          </Text>
          {circuitOptions.map((option) =>
            renderOption(option, selectedCircuit === option, () =>
              handleCircuitSelect(option),
            ),
          )}
          <Animated.View
            style={{
              height: inputHeight,
              opacity: inputOpacity,
              overflow: "hidden",
            }}
          >
            <TextInput
              value={otherCircuitText}
              onChangeText={(text) => dispatch(setOtherCircuitText(text))}
              placeholder="Please describe your intended use..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              className="bg-white rounded-2xl px-4 py-3 text-sm font-Inter_Regular text-[#334155] mt-2"
              style={{ borderWidth: 2, borderColor: "#60A5FA", height: 112 }}
            />
          </Animated.View>
        </Animated.View>

        {/* Panel location options */}
        <Animated.View style={{ opacity: fadeAnim }} className="pt-4 pb-3">
          <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
            Where is your electrical panel located?
          </Text>
          {panelLocations.map((location) =>
            renderOption(location, selectedPanel === location, () =>
              handlePanelSelect(location),
            ),
          )}
          <Animated.View
            style={{
              height: inputHeight2,
              opacity: inputOpacity2,
              overflow: "hidden",
            }}
          >
            <TextInput
              value={otherPanelText}
              onChangeText={(text) => dispatch(setOtherPanelText(text))}
              placeholder="Please describe panel location..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              className="bg-white rounded-2xl px-4 py-3 text-sm font-Inter_Regular text-[#334155] mt-2"
              style={{ borderWidth: 2, borderColor: "#60A5FA", height: 112 }}
            />
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default DedicatedCircuitSt1;
