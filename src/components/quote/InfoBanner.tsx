import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface InfoBannerProps {
  message?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
}

const InfoBanner = ({
  message = "We'll use this address to schedule your service and provide accurate estimates",
  iconName = "location",
  iconColor = "#EF4444",
}: InfoBannerProps) => {
  return (
    <View
      className="flex-row items-start rounded-2xl px-4 py-3 mb-4"
      style={{ backgroundColor: "#EEF2FF" }}
    >
      <Ionicons
        name={iconName}
        size={16}
        color={iconColor}
        style={{ marginTop: 2, marginRight: 8 }}
      />
      <Text className="flex-1 font-Inter_Regular text-sm text-[#3730A3] leading-[20px]">
        {message}
      </Text>
    </View>
  );
};

export default InfoBanner;
