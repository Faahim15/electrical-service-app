import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { setAdditionalNotes } from "@/src/redux/slices/globalstore/dedicatedCircuitDataSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import React, { useRef } from "react";
import { Animated, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const DedicatedCircuitSt5 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const additionalNotes = useSelector(
    (state: RootState) => state.dedicatedCircuitData.additionalNotes,
  );

  const titleAnim = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(-12)).current;

  React.useEffect(() => {
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
      contentContainerStyle={{ paddingTop: 24, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={{ opacity: titleAnim, transform: [{ translateY: titleY }] }}
      >
        <View className="self-start bg-[#EFF6FF] rounded-full px-3 py-1 mb-5">
          <Text className="text-[#60A5FA] text-[11px] font-Inter_SemiBold tracking-wide">
            Dedicated Circuit
          </Text>
        </View>
      </Animated.View>

      <Animated.View style={{ opacity: titleAnim }}>
        <TextAreaInput
          label="Additional notes (optional)"
          placeholder="Any additional information you'd like to share"
          value={additionalNotes}
          onChangeText={(text) => dispatch(setAdditionalNotes(text))}
        />
      </Animated.View>
    </ScrollView>
  );
};

export default DedicatedCircuitSt5;
