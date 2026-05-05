import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { DotsIndicator } from "@/src/components/onboarding/DotsIndicator";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import { SlideContent } from "@/src/components/onboarding/SlideContent";
import { slides } from "@/src/components/onboarding/Slides";

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = width * 0.2;
const DURATION = 300;
const TOTAL = slides.length;

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const updateIndex = (nextIndex: number) => {
    setCurrentIndex(nextIndex);
  };

  const animateTo = useCallback((nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= TOTAL) return;

    updateIndex(nextIndex);

    translateX.value = withTiming(-nextIndex * width, {
      duration: DURATION,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      "worklet";
      startX.value = translateX.value;
    })
    .onUpdate((e) => {
      "worklet";
      const proposed = startX.value + e.translationX;
      const minVal = -(TOTAL - 1) * width;
      translateX.value = Math.max(minVal - 50, Math.min(50, proposed));
    })
    .onEnd((e) => {
      "worklet";
      const swipedLeft =
        e.translationX < -SWIPE_THRESHOLD || e.velocityX < -500;
      const swipedRight = e.translationX > SWIPE_THRESHOLD || e.velocityX > 500;

      const currentIndexUI = Math.round(Math.abs(startX.value / width));
      let next = currentIndexUI;

      if (swipedLeft && currentIndexUI < TOTAL - 1) {
        next = currentIndexUI + 1;
      } else if (swipedRight && currentIndexUI > 0) {
        next = currentIndexUI - 1;
      }

      translateX.value = withTiming(-next * width, {
        duration: DURATION,
        easing: Easing.out(Easing.cubic),
      });

      runOnJS(updateIndex)(next);
    });

  const stripStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const slide = slides[currentIndex] || slides[0];

  return (
    <View className="flex-1 bg-[#F0F9FF]">
      <StatusBar barStyle="dark-content" />

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            { flexDirection: "row", width: width * TOTAL, flex: 1 },
            stripStyle,
          ]}
        >
          {slides.map((s) => (
            <View key={s.id} style={{ width }}>
              <SlideContent slide={s} />
            </View>
          ))}
        </Animated.View>
      </GestureDetector>

      <View className="px-[5%] pt-[5%] bg-[#F0F9FF]">
        <GradientButton
          label={slide.primaryBtn}
          onPress={() => animateTo(currentIndex + 1)}
        />

        {slide.secondaryBtn && (
          <TouchableOpacity
            onPress={() => {
              if (currentIndex === 0) animateTo(TOTAL - 1);
              else if (currentIndex === TOTAL - 1) router.push("/auth/sign-in");
              else animateTo(currentIndex - 1);
            }}
            activeOpacity={0.7}
            className="items-center py-3"
          >
            <Text
              style={{
                fontFamily: "Inter-Medium",
                fontSize: 15,
                color: slide.id === "5" ? "#0EA5E9" : "#9CA3AF",
              }}
            >
              {slide.secondaryBtn}
            </Text>
          </TouchableOpacity>
        )}

        <DotsIndicator total={TOTAL} active={currentIndex} />
      </View>
    </View>
  );
}
