import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { setAdditionalNotes } from "@/src/redux/slices/globalstore/wholeHomeDataSlice";
import { RootState } from "@/src/redux/store";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const WholeHomeSt2 = () => {
  const dispatch = useDispatch();
  const additionalNotes = useSelector(
    (state: RootState) => state.wholeHomeData.additionalNotes,
  );
  const breadcrumbAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const notesAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (ref: Animated.Value, delay: number) =>
      Animated.timing(ref, {
        toValue: 1,
        duration: 500,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      });

    Animated.stagger(100, [
      animate(breadcrumbAnim, 0),
      animate(titleAnim, 0),
      animate(subtitleAnim, 0),
      animate(cardAnim, 0),
      animate(notesAnim, 0),
    ]).start();
  }, []);

  const fadeSlideDown = (anim: Animated.Value, offset = -14) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [offset, 0],
        }),
      },
    ],
  });

  return (
    <ScrollView
      className="flex-1 "
      contentContainerStyle={{ paddingTop: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Breadcrumb */}
      <Animated.View
        style={fadeSlideDown(breadcrumbAnim)}
        className="self-start bg-[#EFF6FF] px-3 py-2 rounded-full mb-4"
      >
        <Text className="text-[#60A5FA] text-sm font-Inter_Medium">
          Whole Home Surge Protection
        </Text>
      </Animated.View>

      {/* Additional Notes */}

      <TextAreaInput
        label="Additional notes (optional)"
        placeholder="Any additional information you'd like to share"
        value={additionalNotes}
        onChangeText={(text) => dispatch(setAdditionalNotes(text))}
      />
    </ScrollView>
  );
};

export default WholeHomeSt2;
