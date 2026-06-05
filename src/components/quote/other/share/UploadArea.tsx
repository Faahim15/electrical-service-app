import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const UploadArea = ({
  tittle,
  images,
  pickImage,
  onRemove,
}: {
  tittle: string;
  images: string[];
  pickImage: () => void;
  onRemove: (uri: string) => void;
}) => (
  <View className="bg-white rounded-2xl p-6 mb-5 shadow-sm">
    <View className="items-center mb-4">
      <View className="w-12 h-12 bg-[#EFF6FF] rounded-full items-center justify-center mb-4">
        <Feather name="upload" size={22} color="#60A5FA" />
      </View>
      <Text className="text-[#1F2937] text-sm font-Inter_Regular text-center leading-5 mb-4">
        {tittle}
      </Text>
      <Pressable onPress={pickImage}>
        <LinearGradient
          colors={["#EFF6FF", "#EFF6FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 16,
            paddingHorizontal: 28,
            paddingVertical: 10,
          }}
        >
          <Text className="text-[#60A5FA] text-sm font-Inter_SemiBold">
            Choose File
          </Text>
        </LinearGradient>
      </Pressable>
    </View>

    {images.length > 0 && (
      <View className="flex-row flex-wrap gap-2 mt-2">
        {images.map((uri) => (
          <View
            key={uri}
            className="relative w-[88px] h-[88px] rounded-xl overflow-hidden"
          >
            <Image
              source={{ uri }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <Pressable
              onPress={() => onRemove(uri)}
              className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full items-center justify-center"
            >
              <Feather name="x" size={11} color="#fff" />
            </Pressable>
          </View>
        ))}
      </View>
    )}
  </View>
);

export default UploadArea;
