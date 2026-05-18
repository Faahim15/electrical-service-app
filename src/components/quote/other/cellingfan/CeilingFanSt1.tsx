// import {

// } from "@/src/redux/slices/ceilingFanDataSlice";
import {
  addReplacementPhotos,
  setHasLightFixture,
  setInstallationType,
  setPreWired,
  toggleSelectedArea,
} from "@/src/redux/slices/globalstore/cellingfanDataSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import React, { useRef } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PhotoUploadSection from "../../PhotoUploadSection";

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

const CeilingFanSt1 = () => {
  const dispatch = useDispatch<AppDispatch>();

  const installationType = useSelector(
    (state: RootState) => state.ceilingFanData.installationType,
  );
  const replacementPhotos = useSelector(
    (state: RootState) => state.ceilingFanData.replacementPhotos,
  );
  const selectedAreas = useSelector(
    (state: RootState) => state.ceilingFanData.selectedAreas,
  );
  const hasLightFixture = useSelector(
    (state: RootState) => state.ceilingFanData.hasLightFixture,
  );
  const preWired = useSelector(
    (state: RootState) => state.ceilingFanData.preWired,
  );

  const scaleAnims = useRef<{ [key: string]: Animated.Value }>({}).current;

  const getAnim = (key: string) => {
    if (!scaleAnims[key]) scaleAnims[key] = new Animated.Value(1);
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
        onPress={() => animatePress(animKey, onPress)}
        className={`w-full py-4 px-4 rounded-lg mb-2 border ${
          isSelected
            ? "bg-[#60A5FA] border-[#60A5FA]"
            : "bg-white border-gray-200"
        }`}
        activeOpacity={0.85}
      >
        <Text
          className={`text-base font-Inter_Medium ${
            isSelected ? "text-white" : "text-[#1F2937]"
          }`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="mt-4 mb-3">
          <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-32 mb-2">
            <Text className="text-sm font-Inter_Medium text-[#60A5FA]">
              Ceiling Fans
            </Text>
          </View>
        </View>

        <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-1">
          Installation type
        </Text>
        <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-4">
          Is this a replacement or new install?
        </Text>

        <SelectButton
          label="Replacement"
          isSelected={installationType === "replacement"}
          onPress={() => dispatch(setInstallationType("replacement"))}
          animKey="replacement"
        />
        <SelectButton
          label="New install"
          isSelected={installationType === "new_install"}
          onPress={() => dispatch(setInstallationType("new_install"))}
          animKey="new_install"
        />

        {installationType === "replacement" && (
          <PhotoUploadSection
            label="Please upload photos of your current fan"
            photos={replacementPhotos}
            onPhotosChange={(newPhotos) =>
              dispatch(
                addReplacementPhotos(
                  newPhotos.filter((p) => !replacementPhotos.includes(p)),
                ),
              )
            }
          />
        )}

        {installationType === "new_install" && (
          <View>
            <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3 mt-2">
              What is above / below the area the ceiling fan will be installed?
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
              {AREA_OPTIONS.map((area) => {
                const isSelected = selectedAreas.includes(area);
                return (
                  <TouchableOpacity
                    key={area}
                    onPress={() => dispatch(toggleSelectedArea(area))}
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
                      className="font-Inter_Medium text-sm"
                      style={{ color: isSelected ? "#ffffff" : "#1F2937" }}
                    >
                      {area}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3 mt-4">
              Is there a current light fixture where you want the fan installed?
            </Text>
            <SelectButton
              label="Yes"
              isSelected={hasLightFixture === "yes"}
              onPress={() => dispatch(setHasLightFixture("yes"))}
              animKey="light_yes"
            />
            <SelectButton
              label="No"
              isSelected={hasLightFixture === "no"}
              onPress={() => dispatch(setHasLightFixture("no"))}
              animKey="light_no"
            />

            <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3 mt-4">
              Was the area prewired for a ceiling fan?
            </Text>
            <SelectButton
              label="Yes"
              isSelected={preWired === "yes"}
              onPress={() => dispatch(setPreWired("yes"))}
              animKey="pre_yes"
            />
            <SelectButton
              label="No"
              isSelected={preWired === "no"}
              onPress={() => dispatch(setPreWired("no"))}
              animKey="pre_no"
            />
            <SelectButton
              label="I'm not sure"
              isSelected={preWired === "unsure"}
              onPress={() => dispatch(setPreWired("unsure"))}
              animKey="pre_unsure"
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CeilingFanSt1;
