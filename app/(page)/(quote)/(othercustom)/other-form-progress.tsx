import Step1 from "@/src/components/quote/other/common/Step1";
import Step2 from "@/src/components/quote/other/common/Step2";
import Step3 from "@/src/components/quote/other/common/Step3";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Step Config ──────────────────────────────────────────────────────────────

const STEPS = [
  { component: Step1, title: "Contact" },
  { component: Step2, title: "Address" },
  { component: Step3, title: "Project" },
  // Add more steps here: { component: Step4, title: "..." }
];

// ─── Main Screen ──────────────────────────────────────────────────────────────

const OtherFormProgress = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const totalSteps = STEPS.length;
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const animateProgress = (nextStep: number) => {
    const nextPercent = ((nextStep + 1) / totalSteps) * 100;

    // Fade out current content
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep(nextStep);
      // Fade in next content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: nextPercent,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      animateProgress(currentStep + 1);
    } else {
      // Last step — submit / navigate
      //   router.push("/some-confirmation-screen");
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      animateProgress(currentStep - 1);
    } else {
      router.back();
    }
  };

  const CurrentStepComponent = STEPS[currentStep].component;

  // Initialize progress bar on mount
  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progressPercent,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* ── Header ── */}
        <View className="flex-row justify-between items-center pb-2">
          <TouchableOpacity onPress={goBack}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-2xl text-[#111827] font-Inter_Bold">Other</Text>
          <View />
        </View>

        {/* ── Progress Bar ── */}
        <View className="mb-5">
          {/* Step label */}
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xs text-[#6B7280] font-Inter_Medium">
              Step {currentStep + 1} of {totalSteps}
            </Text>
            <Text className="text-xs font-Inter_Bold text-[#38BDF8]">
              {progressPercent}%
            </Text>
          </View>

          {/* Track */}
          <View className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
            <Animated.View
              style={{ width: progressWidth }}
              className="h-full bg-[#38BDF8] rounded-full"
            />
          </View>

          {/* Step dots */}
          <View className="flex-row justify-between mt-2 px-0.5">
            {STEPS.map((step, index) => (
              <View key={index} className="items-center">
                <View
                  className={`w-2 h-2 rounded-full ${
                    index <= currentStep ? "bg-[#38BDF8]" : "bg-[#E5E7EB]"
                  }`}
                />
              </View>
            ))}
          </View>
        </View>

        {/* ── Step Content ── */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          <Animated.View style={{ opacity: fadeAnim }} className="flex-1">
            <CurrentStepComponent />
          </Animated.View>

          {/* ── Footer Buttons ── */}
          <View className="pt-3 gap-2">
            <TouchableOpacity
              onPress={goNext}
              className="bg-[#38BDF8] rounded-2xl py-4 items-center"
              activeOpacity={0.85}
            >
              <Text className="text-white font-Inter_Bold text-base">
                {currentStep === totalSteps - 1 ? "Submit" : "Continue"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default OtherFormProgress;
