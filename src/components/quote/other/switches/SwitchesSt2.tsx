import {
  selectSwitchesPhotos,
  setPhotos,
} from "@/src/redux/slices/globalstore/switchesDataSlice";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PhotoUploadSection from "../../PhotoUploadSection";

const SwitchesSt2 = () => {
  const photos = useSelector(selectSwitchesPhotos);
  const dispatch = useDispatch();

  return (
    <View className="flex-1 ">
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View className="mt-4 mb-3">
          <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-24">
            <Text className="text-sm font-Inter_Medium text-[#60A5FA]">
              Switches
            </Text>
          </View>
        </View>

        <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-5">
          Photos
        </Text>

        {/* Photo Upload */}
        <PhotoUploadSection
          label="Please upload a photo of where the switch(es) will be installed"
          photos={photos}
          onPhotosChange={(newPhotos) => dispatch(setPhotos(newPhotos))}
        />

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
};

export default SwitchesSt2;
