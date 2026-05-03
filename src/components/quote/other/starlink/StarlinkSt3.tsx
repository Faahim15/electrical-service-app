import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
const UploadArea = ({ label }: { label: string }) => (
  <View className="border border-dashed border-gray-300 rounded-xl p-5 items-center mt-2 mb-4 bg-gray-50">
    <MaterialCommunityIcons
      name="file-image-plus-outline"
      size={24}
      color="#4b5563"
    />
    <Text className="text-gray-500 font-Inter_Regular text-xs text-center mb-3">
      {label}
    </Text>
    <TouchableOpacity
      className="border border-gray-300 rounded-full px-5 py-1.5"
      activeOpacity={0.7}
    >
      <Text className="text-gray-500 font-Inter_Regular text-xs">
        Choose File
      </Text>
    </TouchableOpacity>
  </View>
);
const StarlinkSt3 = () => {
  const [room, setRoom] = useState("");
  const [above, setAbove] = useState<string[]>([]);

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

  return (
    <View className="flex-1">
      <Text className="text-xs font-Inter_Medium text-cyan-500 mb-1">
        Starlink
      </Text>
      <Text className="text-2xl font-Inter_Bold text-gray-900 mb-2">
        Router location
      </Text>
      <Text className="text-sm font-Inter_Regular text-gray-600 mb-5">
        What room do you want the WiFi router in?
      </Text>

      <TextInput
        value={room}
        onChangeText={setRoom}
        placeholder="Room name"
        placeholderTextColor="#9CA3AF"
        className="border border-gray-200 rounded-xl px-4 py-3 font-Inter_Regular text-sm text-gray-800 bg-white mb-5"
      />

      <Text className="text-sm font-Inter_Medium text-gray-700 mb-3">
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
                backgroundColor: sel ? "#3B82F6" : "#F3F4F6",
                borderRadius: 8,
                paddingVertical: 8,
                paddingHorizontal: 12,
                marginBottom: 6,
              }}
            >
              <Text
                style={{
                  color: sel ? "#fff" : "#374151",
                  fontFamily: "Inter_Regular",
                  fontSize: 13,
                }}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <UploadArea label="Upload photo of room to install WiFi router" />
    </View>
  );
};

export default StarlinkSt3;
