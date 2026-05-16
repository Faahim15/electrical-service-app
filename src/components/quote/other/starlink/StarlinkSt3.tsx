import { AppDispatch } from "@/src/redux/store";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import PhotoUploadSection from "../../PhotoUploadSection";
const StarlinkSt3 = () => {
  const [room, setRoom] = useState("");
  const [above, setAbove] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const aboveOptions = [
    "Attic above",
    "Occupied space above",
    "Crawlspace (unfinished)",
    "Crawlspace (finished)",
    "Basement (unfinished)",
    "Basement (finished)",
  ];

  const toggleAbove = (opt: string) => {
    setAbove((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt],
    );
  };
  const [photos, setPhotos] = useState<string[]>([]);

  return (
    <View className="flex-1">
      <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-24">
        <Text className="text-sm font-Inter_Medium text-[#60A5FA] ">
          Starlink
        </Text>
      </View>
      <Text className="text-2xl font-Inter_Bold text-gray-900 mb-2">
        Router location
      </Text>
      <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
        What room do you want the WiFi router in?
      </Text>

      <TextInput
        value={room}
        onChangeText={setRoom}
        placeholder="Room name"
        placeholderTextColor="#9CA3AF"
        className="border border-gray-200 rounded-xl px-4 py-4 font-Inter_Regular text-sm text-gray-900 bg-white mb-5"
      />

      <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
        What is above / below the room?
      </Text>

      <View className="flex-row flex-wrap gap-2 mb-4">
        {aboveOptions.map((opt) => {
          const sel = above.includes(opt);
          return (
            <TouchableOpacity
              key={opt}
              onPress={() => toggleAbove(opt)}
              activeOpacity={0.8}
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
                style={{
                  color: sel ? "#fff" : "#1F2937",
                  fontSize: 14,
                }}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <PhotoUploadSection
        label="Upload photo of room to install WiFi router"
        photos={photos}
        onPhotosChange={setPhotos}
      />
    </View>
  );
};

export default StarlinkSt3;
