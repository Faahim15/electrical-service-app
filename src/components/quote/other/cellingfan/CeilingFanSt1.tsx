import { useImagePicker } from "@/src/hook/useImagePicker";
import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import UploadArea from "../share/UploadArea";

type InstallationType = "replacement" | "new_install" | null;
type AreaOption =
  | "Attic above"
  | "Occupied space above"
  | "Crawlspace (unfinished)"
  | "Crawlspace (encapsulated)"
  | "Basement (unfinished)"
  | "Basement (finished)";

const AREA_OPTIONS: AreaOption[] = [
  "Attic above",
  "Occupied space above",
  "Crawlspace (unfinished)",
  "Crawlspace (encapsulated)",
  "Basement (unfinished)",
  "Basement (finished)",
];
type YesNo = "yes" | "no" | null;
type YesNoUnsure = "yes" | "no" | "unsure" | null;

const CeilingFanSt1 = () => {
  const [installationType, setInstallationType] =
    useState<InstallationType>(null);

  const [hasLightFixture, setHasLightFixture] = useState<YesNo>(null);
  const [preWired, setPreWired] = useState<YesNoUnsure>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cellingimage = useImagePicker();
  const scaleAnims = useRef<{ [key: string]: Animated.Value }>({}).current;
  const [selectedAreas, setSelectedAreas] = useState<AreaOption[]>([]);
  const getAnim = (key: string) => {
    if (!scaleAnims[key]) {
      scaleAnims[key] = new Animated.Value(1);
    }
    return scaleAnims[key];
  };

  const animatePress = (key: string, callback?: () => void) => {
    const anim = getAnim(key);
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };
  const toggleArea = (area: AreaOption) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  };

  const SelectButton = ({
    label,
    isSelected,
    onPress,
    animKey,
  }: {
    label: string;
    isSelected: boolean;
    onPress: () => void;
    animKey: string;
  }) => (
    <Animated.View style={{ transform: [{ scale: getAnim(animKey) }] }}>
      <TouchableOpacity
        onPress={() => {
          animatePress(animKey, onPress);
        }}
        className={`w-full py-4 px-4 rounded-lg mb-2 border ${
          isSelected
            ? "bg-[#60A5FA] border-[#60A5FA]"
            : "bg-white border-gray-200"
        }`}
        activeOpacity={0.85}
      >
        <Text
          className={`text-sm text-center ${
            isSelected
              ? "text-white font-Inter_SemiBold"
              : "text-[#1F2937] font-Inter_Medium"
          }`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View className="flex-1 ">
      <ScrollView
        className="flex-1 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Category tag */}
        <View className="mt-4 mb-3">
          <View className="self-start bg-blue-50 rounded-full px-3 py-1 mb-5 border border-blue-100">
            <Text className="font-Inter_SemiBold text-[11px] text-[#60A5FA] tracking-wide">
              Ceiling Fans
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text className="text-xl font-Inter_Bold text-gray-900 mb-1">
          Installation type
        </Text>
        <Text className="text-base text-[#1F2937] font-Inter_Medium mb-4">
          Is this a replacement or new install?
        </Text>

        <SelectButton
          label="Replacement"
          isSelected={installationType === "replacement"}
          onPress={() => setInstallationType("replacement")}
          animKey="replacement"
        />
        <SelectButton
          label="New install"
          isSelected={installationType === "new_install"}
          onPress={() => setInstallationType("new_install")}
          animKey="new_install"
        />

        {/* Photo Upload */}
        {installationType === "replacement" && (
          <UploadArea
            tittle="Please upload photos of your current fan"
            images={cellingimage.images}
            pickImage={cellingimage.pickImage}
            onRemove={cellingimage.onRemove}
          />
        )}
        {installationType === "new_install" && (
          <View>
            {/* Space above */}
            <Text className="text-base text-[#1F2937] font-Inter_Medium mb-3 mt-2">
              What is above / below the area the ceiling fan will be installed?
            </Text>

            <View className="flex-row flex-wrap gap-2 mb-4">
              {AREA_OPTIONS.map((area) => {
                const isSelected = selectedAreas.includes(area);
                return (
                  <TouchableOpacity
                    key={area}
                    onPress={() => toggleArea(area)}
                    activeOpacity={0.8}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 999,
                      backgroundColor: isSelected ? "#60A5FA" : "#ffffff",
                      borderWidth: 1,
                      borderColor: isSelected ? "#60A5FA" : "#E5E7EB",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        color: isSelected ? "#ffffff" : "#1F2937",
                        fontFamily: isSelected
                          ? "Inter_SemiBold"
                          : "Inter_Medium",
                      }}
                    >
                      {area}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Light fixture */}
            <Text className="text-base text-[#1F2937] font-Inter_Medium mb-3 mt-4">
              Is there a current light fixture where you want the fan installed?
            </Text>
            <SelectButton
              label="Yes"
              isSelected={hasLightFixture === "yes"}
              onPress={() => setHasLightFixture("yes")}
              animKey="light_yes"
            />
            <SelectButton
              label="No"
              isSelected={hasLightFixture === "no"}
              onPress={() => setHasLightFixture("no")}
              animKey="light_no"
            />

            {/* Pre-wired */}
            <Text className="text-base text-[#1F2937] font-Inter_Medium mb-3 mt-4">
              Was the area prewired for a ceiling fan?
            </Text>
            <SelectButton
              label="Yes"
              isSelected={preWired === "yes"}
              onPress={() => setPreWired("yes")}
              animKey="pre_yes"
            />
            <SelectButton
              label="No"
              isSelected={preWired === "no"}
              onPress={() => setPreWired("no")}
              animKey="pre_no"
            />
            <SelectButton
              label="I'm not sure"
              isSelected={preWired === "unsure"}
              onPress={() => setPreWired("unsure")}
              animKey="pre_unsure"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CeilingFanSt1;
