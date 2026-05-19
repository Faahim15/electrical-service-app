import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import CeilingFanSt1 from "@/src/components/quote/other/cellingfan/CeilingFanSt1";
import CeilingFanSt2 from "@/src/components/quote/other/cellingfan/CeilingFanSt2";
import CeilingFanSt3 from "@/src/components/quote/other/cellingfan/CeilingFanSt3";
import CeilingFanSt4 from "@/src/components/quote/other/cellingfan/CeilingFanSt4";
import ReviewRequest from "@/src/components/quote/other/common/ReviewRequest";
import Step1 from "@/src/components/quote/other/common/Step1";
import Step2 from "@/src/components/quote/other/common/Step2";
import Step3 from "@/src/components/quote/other/common/Step3";
import DedicatedCircuitSt1 from "@/src/components/quote/other/DedicatedCircuit/DedicatedCircuitSt1";
import DedicatedCircuitSt2 from "@/src/components/quote/other/DedicatedCircuit/DedicatedCircuitSt2";
import DedicatedCircuitSt3 from "@/src/components/quote/other/DedicatedCircuit/DedicatedCircuitSt3";
import DedicatedCircuitSt4 from "@/src/components/quote/other/DedicatedCircuit/DedicatedCircuitSt4";
import DedicatedCircuitSt5 from "@/src/components/quote/other/DedicatedCircuit/DedicatedCircuitSt5";
import ExhaustFanSt1 from "@/src/components/quote/other/exhaustfan/ExhaustFanSt1";
import ExhaustFanSt2 from "@/src/components/quote/other/exhaustfan/ExhaustFanSt2";
import LightingSt1 from "@/src/components/quote/other/lighting/LightingSt1";
import LightingSt2 from "@/src/components/quote/other/lighting/LightingSt2";
import OutletsDedicatedCircuitSt2 from "@/src/components/quote/other/outlets/OutletsDedicatedCircuitSt2";
import OutletsDedicatedCircuitSt3 from "@/src/components/quote/other/outlets/OutletsDedicatedCircuitSt3";
import OutletsDedicatedCircuitSt4 from "@/src/components/quote/other/outlets/OutletsDedicatedCircuitSt4";
import OutletsSt1 from "@/src/components/quote/other/outlets/OutletsSt1";
import OutletsSt2 from "@/src/components/quote/other/outlets/OutletsSt2";
import OutletsSt4 from "@/src/components/quote/other/outlets/OutletsSt4";
import OutletsSt5 from "@/src/components/quote/other/outlets/OutletsSt5";
import StarlinkSt1 from "@/src/components/quote/other/starlink/StarlinkSt1";
import StarlinkSt2 from "@/src/components/quote/other/starlink/StarlinkSt2";
import StarlinkSt3 from "@/src/components/quote/other/starlink/StarlinkSt3";
import StarlinkSt4 from "@/src/components/quote/other/starlink/StarlinkSt4";
import SwitchesSt1 from "@/src/components/quote/other/switches/SwitchesSt1";
import SwitchesSt2 from "@/src/components/quote/other/switches/SwitchesSt2";
import SwitchesSt3 from "@/src/components/quote/other/switches/SwitchesSt3";
import SwitchesSt4 from "@/src/components/quote/other/switches/SwitchesSt4";
import WholeHomeSt1 from "@/src/components/quote/other/WholeHome/WholeHomeSt1";
import WholeHomeSt2 from "@/src/components/quote/other/WholeHome/WholeHomeSt2";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { selectOutletsSt1 } from "@/src/redux/slices/globalstore/outletsDataSlice";
import { RootState } from "@/src/redux/store";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

// ─── Step type ────────────────────────────────────────────────────────────────

type StepConfig = { component: React.ComponentType; title: string };

// ─── Common Steps (always shown) ─────────────────────────────────────────────

const COMMON_STEPS: StepConfig[] = [
  { component: Step1, title: "Contact" },
  { component: Step2, title: "Address" },
  { component: Step3, title: "Project" },
];

const Final_step: StepConfig[] = [
  { component: ReviewRequest, title: "Project" },
];

// ─── Category-specific steps (all values are arrays) ─────────────────────────

const CATEGORY_STEP_MAP: Record<string, StepConfig[]> = {
  "Whole Home Surge Protection": [
    { component: WholeHomeSt1, title: "Whole Home Surge Protection" },
    { component: WholeHomeSt2, title: "Whole Home Surge Protection" },
  ],
  "Starlink Installation": [
    { component: StarlinkSt1, title: "Starlink Installation" },
    { component: StarlinkSt2, title: "Starlink Installation" },
    { component: StarlinkSt3, title: "Starlink Installation" },
    { component: StarlinkSt4, title: "Starlink Installation" },
  ],
  "Dedicated Circuit": [
    { component: DedicatedCircuitSt1, title: "Dedicated Circuit" },
    { component: DedicatedCircuitSt2, title: "Dedicated Circuit" },
    { component: DedicatedCircuitSt3, title: "Dedicated Circuit" },
    { component: DedicatedCircuitSt4, title: "Dedicated Circuit" },
    { component: DedicatedCircuitSt5, title: "Dedicated Circuit" },
  ],
  "Exhaust Fan": [
    { component: ExhaustFanSt1, title: "Exhaust Fan" },
    { component: ExhaustFanSt2, title: "Exhaust Fan" },
  ],
  Outlets: [
    { component: OutletsSt1, title: "Outlets" },
    { component: OutletsSt2, title: "Outlets" },
    // { component: OutletsSt3, title: "Outlets" },
    { component: OutletsSt4, title: "Outlets" },
    { component: OutletsSt5, title: "Outlets" },

    { component: OutletsDedicatedCircuitSt2, title: "Outlets" },
    { component: OutletsDedicatedCircuitSt3, title: "Outlets" },
    { component: OutletsDedicatedCircuitSt4, title: "Outlets" },
  ],
  Switches: [
    { component: SwitchesSt1, title: "Switches" },
    { component: SwitchesSt2, title: "Switches" },
    { component: SwitchesSt3, title: "Switches" },
    { component: SwitchesSt4, title: "Switches" },
  ],
  Lighting: [
    { component: LightingSt1, title: "Lighting" },
    { component: LightingSt2, title: "Lighting" },
  ],
  "Ceiling Fan": [
    { component: CeilingFanSt1, title: "Ceiling Fan" },
    { component: CeilingFanSt2, title: "Ceiling Fan" },
    { component: CeilingFanSt3, title: "Ceiling Fan" },
    { component: CeilingFanSt4, title: "Ceiling Fan" },
  ],
};
// ─── Category-specific steps ──────────────────────────────────────────────────

const getStarlinkSteps = (dishLocation: string | null): StepConfig[] => [
  { component: StarlinkSt1, title: "Starlink Installation" },
  { component: StarlinkSt2, title: "Starlink Installation" },
  ...(dishLocation === "roof"
    ? [{ component: StarlinkSt3, title: "Starlink Installation" }]
    : []),
  { component: StarlinkSt4, title: "Starlink Installation" },
];

const getOutletsSteps = (intendedUse: string | null): StepConfig[] => [
  { component: OutletsSt1, title: "Outlets" },

  ...(intendedUse?.includes("Freezer") ||
  intendedUse?.includes("Tools / Equipment")
    ? [
        { component: OutletsDedicatedCircuitSt2, title: "Outlets" },
        { component: OutletsDedicatedCircuitSt3, title: "Outlets" },
        { component: OutletsDedicatedCircuitSt4, title: "Outlets" },
        { component: OutletsSt5, title: "Outlets" },
      ]
    : [
        { component: OutletsSt2, title: "Outlets" },
        { component: OutletsSt4, title: "Outlets" },
        { component: OutletsSt5, title: "Outlets" },
      ]),
];

// ─── Main Screen ──────────────────────────────────────────────────────────────

const OtherFormProgress = () => {
  const category = useSelector(
    (state: RootState) => state.otherCategoryRoute.selectedOtherCategory,
  );
  const { dishLocation, hasMounting, images } = useSelector(
    (state: RootState) => state.starlinkRoute,
  );
  const { intendedUse } = useSelector(selectOutletsSt1);

  const selectedTitle = category?.title ?? "";

  // Spread category-specific steps after common steps
  const STEPS: StepConfig[] =
    selectedTitle === "Whole Home Surge Protection"
      ? [
          ...COMMON_STEPS,
          ...(CATEGORY_STEP_MAP["Whole Home Surge Protection"] ?? []),
          ...Final_step,
        ]
      : selectedTitle === "Starlink Installation"
        ? [...COMMON_STEPS, ...getStarlinkSteps(dishLocation), ...Final_step]
        : selectedTitle === "Outlets"
          ? [...COMMON_STEPS, ...getOutletsSteps(intendedUse), ...Final_step]
          : [
              ...COMMON_STEPS,
              ...(CATEGORY_STEP_MAP[selectedTitle] ?? []),
              ...Final_step,
            ];

  const [currentStep, setCurrentStep] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const totalSteps = STEPS.length;
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  const animateProgress = (nextStep: number) => {
    const nextPercent = ((nextStep + 1) / totalSteps) * 100;

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setCurrentStep(nextStep);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    Animated.timing(progressAnim, {
      toValue: nextPercent,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  console.log("selected title ==============", selectedTitle);
  console.log(
    "resolved steps ==============",
    STEPS.map((s) => s.title),
  );
  console.log(dishLocation);

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      animateProgress(currentStep + 1);
    } else {
      // Last step — submit / navigate
      router.push("/submit-quote-request");
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
          <Text className="text-2xl text-[#111827] font-Inter_Bold"></Text>
          <View />
        </View>

        {/* ── Progress Bar ── */}
        <View className="mb-5">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm text-[#64748B] font-Inter_Medium">
              Step {currentStep + 1} of {totalSteps}
            </Text>
            <Text className="text-sm font-Inter_Medium text-[#0EA5E9]">
              {progressPercent}%
            </Text>
          </View>

          <View className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
            <Animated.View
              style={{ width: progressWidth }}
              className="h-full rounded-full overflow-hidden"
            >
              <LinearGradient
                colors={["#0EA5E9", "#14B8A6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
              />
            </Animated.View>
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
          <GradientButton
            label={currentStep === totalSteps - 1 ? "Submit" : "Continue"}
            onPress={goNext}
          />
          {currentStep === totalSteps - 1 ? (
            <SavedEditAction title={"Edit"} onPress={goBack} />
          ) : (
            <Pressable>
              <SavedEditAction
                title={"Save for Later"}
                onPress={() => router.push("/saved-draft")}
              />
            </Pressable>
          )}
          <View className="h-24" />
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default OtherFormProgress;
