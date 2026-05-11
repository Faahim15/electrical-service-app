import { useImagePicker } from "@/src/hook/useImagePicker";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import UploadArea from "../share/UploadArea";

const SwitchesSt2 = () => {
  const outletImages = useImagePicker();

  return (
    <View className="flex-1 ">
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View className="mt-4 mb-3">
          <View
            className="self-start px-3 py-1 rounded-full border"
            style={{ borderColor: "#60A5FA" }}
          >
            <Text
              className="font-Inter_Medium text-xs"
              style={{ color: "#60A5FA" }}
            >
              Switches
            </Text>
          </View>
        </View>

        <Text className="font-Inter_Bold text-2xl text-gray-900 mb-5">
          Photos
        </Text>

        {/* Photo Upload */}
        <UploadArea
          tittle="Please upload photos of where the outlet(s) will be installed."
          images={outletImages.images}
          pickImage={outletImages.pickImage}
          onRemove={outletImages.onRemove}
        />

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
};

export default SwitchesSt2;
