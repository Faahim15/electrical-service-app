import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface PhotoUploadSectionProps {
  label: string;
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
}

const PhotoUploadSection = ({
  label,
  photos,
  onPhotosChange,
}: PhotoUploadSectionProps) => {
  const [previewUri, setPreviewUri] = useState<string | null>(null);

  const pickFromGallery = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission required", "Allow access to your photo library.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri);
      onPhotosChange([...photos, ...uris]);
    }
  };

  const pickFromCamera = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission required", "Allow access to your camera.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled) {
      onPhotosChange([...photos, result.assets[0].uri]);
    }
  };

  const showPickerOptions = () => {
    Alert.alert("Add Photo", "Choose a source", [
      { text: "Camera", onPress: pickFromCamera },
      { text: "Gallery", onPress: pickFromGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const removePhoto = (index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  return (
    <View
      className="bg-white rounded-2xl px-4 py-4 mb-4"
      style={{
        shadowColor: "#94A3B8",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      {/* Header */}
      <View className="items-center mb-3">
        <Ionicons name="cloud-upload-outline" size={28} color="#0EA5E9" />
        <Text className="text-[#1E293B] text-[14px] font-Inter_SemiBold mt-2">
          {label}
        </Text>
      </View>

      {/* Photos FlatList */}
      {photos.length > 0 && (
        <FlatList
          data={photos}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ gap: 8, marginBottom: 12 }}
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setPreviewUri(item)}
              >
                <Image
                  source={{ uri: item }}
                  style={{ width: 80, height: 80, borderRadius: 10 }}
                  contentFit="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removePhoto(index)}
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  backgroundColor: "#EF4444",
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="close" size={12} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Choose File Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={showPickerOptions}
        style={{
          borderWidth: 1,
          borderColor: "#BAE6FD",
          borderRadius: 10,
          paddingVertical: 9,
          alignItems: "center",
          backgroundColor: "#EEF9FF",
        }}
      >
        <Text className="text-[#0EA5E9] text-[13px] font-Inter_SemiBold">
          Choose File
        </Text>
      </TouchableOpacity>

      {/* Full Screen Preview Modal */}
      <Modal
        visible={!!previewUri}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewUri(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#000000CC",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setPreviewUri(null)}
            style={{ position: "absolute", top: 52, right: 20, zIndex: 10 }}
          >
            <Ionicons name="close-circle" size={36} color="white" />
          </TouchableOpacity>
          {previewUri && (
            <Image
              source={{ uri: previewUri }}
              style={{
                width: SCREEN_WIDTH - 32,
                height: SCREEN_WIDTH - 32,
                borderRadius: 16,
              }}
              contentFit="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default PhotoUploadSection;
