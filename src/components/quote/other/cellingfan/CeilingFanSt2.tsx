import TextAreaInput from "@/src/components/shared/TextAreaInput";
// import {

// } from "@/src/redux/slices/ceilingFanDataSlice";
import {
  addFanPhotos,
  setCeilingHeight,
  setFanDescription,
  setProvidingFan,
} from "@/src/redux/slices/globalstore/cellingfanDataSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import React, { useRef } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PhotoUploadSection from "../../PhotoUploadSection";

const CeilingFanSt2 = () => {
  const dispatch = useDispatch<AppDispatch>();

  const providingFan = useSelector(
    (state: RootState) => state.ceilingFanData.providingFan,
  );
  const fanPhotos = useSelector(
    (state: RootState) => state.ceilingFanData.fanPhotos,
  );
  const fanDescription = useSelector(
    (state: RootState) => state.ceilingFanData.fanDescription,
  );
  const ceilingHeight = useSelector(
    (state: RootState) => state.ceilingFanData.ceilingHeight,
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
        className={`w-full py-3 px-4 rounded-lg mb-2 border ${
          isSelected
            ? "bg-[#60A5FA] border-[#60A5FA]"
            : "bg-white border-gray-200"
        }`}
        activeOpacity={0.85}
      >
        <Text
          className={`text-base font-medium ${
            isSelected ? "text-white" : "text-gray-700"
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
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-32 mb-2">
          <Text className="text-sm font-Inter_Medium text-[#60A5FA]">
            Ceiling Fans
          </Text>
        </View>

        <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-1">
          Fan details
        </Text>
        <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-4">
          Will you be providing the new ceiling fan?
        </Text>

        <SelectButton
          label="Yes"
          isSelected={providingFan === "yes"}
          onPress={() => dispatch(setProvidingFan("yes"))}
          animKey="fan_yes"
        />
        <SelectButton
          label="No"
          isSelected={providingFan === "no"}
          onPress={() => dispatch(setProvidingFan("no"))}
          animKey="fan_no"
        />

        {providingFan === "yes" && (
          <PhotoUploadSection
            label="Please upload a photo of your new ceiling fan"
            photos={fanPhotos}
            onPhotosChange={(newPhotos) =>
              dispatch(
                addFanPhotos(newPhotos.filter((p) => !fanPhotos.includes(p))),
              )
            }
          />
        )}

        {providingFan !== "yes" && (
          <TextAreaInput
            label="Please describe the fan you want"
            placeholder="Any additional information you'd like to share"
            value={fanDescription}
            onChangeText={(text) => dispatch(setFanDescription(text))}
          />
        )}

        <Text className="text-base font-Inter_SemiBold text-[#1F2937] my-2">
          How tall is the ceiling where the fan will be installed?
        </Text>
        <TextInput
          value={ceilingHeight}
          onChangeText={(text) => dispatch(setCeilingHeight(text))}
          placeholder="E.g., 8 feet"
          placeholderTextColor="#9CA3AF"
          className="border border-gray-200 bg-white rounded-lg px-4 py-4 text-sm text-gray-700 font-Inter_Regular"
        />
      </ScrollView>
    </View>
  );
};

export default CeilingFanSt2;
