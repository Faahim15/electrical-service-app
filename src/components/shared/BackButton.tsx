import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

const BackButton = () => {
  return (
    <Pressable
      onPress={() => router.back()}
      className="w-10 h-10 items-center justify-center"
    >
      <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
    </Pressable>
  );
};

export default BackButton;
