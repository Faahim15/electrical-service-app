import TextAreaInput from "@/src/components/shared/TextAreaInput";
import {
  selectSwitchesAdditionalNotes,
  setAdditionalNotes,
} from "@/src/redux/slices/globalstore/switchesDataSlice";
import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SwitchesSt4 = () => {
  const dispatch = useDispatch();
  const additionalNotes = useSelector(selectSwitchesAdditionalNotes);

  const titleAnim = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(-12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.spring(titleY, {
        toValue: 0,
        speed: 20,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Badge */}
      <Animated.View
        style={{ opacity: titleAnim, transform: [{ translateY: titleY }] }}
      >
        <View className="mt-4 mb-3">
          <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-24">
            <Text className="text-sm font-Inter_Medium text-[#60A5FA]">
              Switches
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Additional Information */}
      <Animated.View style={{ opacity: titleAnim }}>
        <TextAreaInput
          label="Additional notes (optional)"
          placeholder="Any additional information you'd like to share"
          value={additionalNotes}
          onChangeText={(v) => dispatch(setAdditionalNotes(v))}
        />
      </Animated.View>
    </ScrollView>
  );
};

export default SwitchesSt4;
