import { Image } from "expo-image";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { ReviewRow } from "./ReviewRow";

export const ReviewPhotos = ({
  label,
  photos,
}: {
  label: string;
  photos: string[];
}) => {
  if (photos.length === 0)
    return <ReviewRow label={label} value="No photos added" />;
  return (
    <View
      className="bg-white rounded-2xl px-4 py-4 mb-3"
      style={{
        shadowColor: "#94A3B8",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 1,
      }}
    >
      <Text className="text-[#94A3B8] text-[11.5px] font-Inter_Medium mb-2">
        {label}
      </Text>
      <FlatList
        data={photos}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: 64, height: 64, borderRadius: 8 }}
            contentFit="cover"
          />
        )}
      />
    </View>
  );
};
