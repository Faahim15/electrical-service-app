import {
  addRouterPhotos,
  setRouterRoom,
  toggleAboveOption,
} from "@/src/redux/slices/globalstore/StarlinkDataSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PhotoUploadSection from "../../PhotoUploadSection";

const ABOVE_OPTIONS = [
  "Attic above",
  "Occupied space above",
  "Crawlspace (unfinished)",
  "Crawlspace (finished)",
  "Basement (unfinished)",
  "Basement (finished)",
];

const StarlinkSt3 = () => {
  const dispatch = useDispatch<AppDispatch>();

  const routerRoom = useSelector(
    (state: RootState) => state.starlinkData.routerRoom,
  );
  const aboveOptions = useSelector(
    (state: RootState) => state.starlinkData.aboveOptions,
  );
  const routerPhotos = useSelector(
    (state: RootState) => state.starlinkData.routerPhotos,
  );

  return (
    <View className="flex-1">
      <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-24">
        <Text className="text-sm font-Inter_Medium text-[#60A5FA]">
          Starlink
        </Text>
      </View>

      <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-2">
        Router location
      </Text>
      <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
        What room do you want the WiFi router in?
      </Text>

      <TextInput
        value={routerRoom}
        onChangeText={(text) => dispatch(setRouterRoom(text))}
        placeholder=""
        placeholderTextColor="#9CA3AF"
        className="border border-gray-200 rounded-xl px-4 py-4 font-Inter_Regular text-sm text-gray-900 bg-white mb-5"
      />

      <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
        What is above / below the room?
      </Text>

      <View className="flex-row flex-wrap gap-2 mb-4">
        {ABOVE_OPTIONS.map((opt) => {
          const sel = aboveOptions.includes(opt);
          return (
            <Pressable
              key={opt}
              onPress={() => dispatch(toggleAboveOption(opt))}
              style={{
                backgroundColor: sel ? "#3B82F6" : "#FFFFFF",
                borderRadius: 50,
                paddingVertical: 8,
                paddingHorizontal: 20,
                marginBottom: 6,
              }}
              className="border border-[#E5E7EB]"
            >
              <Text
                className="font-Inter_Regular"
                style={{ color: sel ? "#fff" : "#1F2937", fontSize: 14 }}
              >
                {opt}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <PhotoUploadSection
        label="Upload photo of room to install WiFi router"
        photos={routerPhotos}
        onPhotosChange={(newPhotos) =>
          dispatch(
            addRouterPhotos(newPhotos.filter((p) => !routerPhotos.includes(p))),
          )
        }
      />
    </View>
  );
};

export default StarlinkSt3;
