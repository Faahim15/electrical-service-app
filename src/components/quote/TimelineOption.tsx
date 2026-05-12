// src/components/shared/TimelineOption.tsx
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type TimelineItem = {
  label: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
};

const TIMELINE_OPTIONS: TimelineItem[] = [
  {
    label: "As soon as possible",
    tag: "Urgent",
    tagColor: "#EF4444",
    tagBg: "#FEF2F2",
    iconName: "warning-outline",
    iconColor: "#EF4444",
  },
  {
    label: "This week",
    tag: "Soon",
    tagColor: "#F59E0B",
    tagBg: "#FFFBEB",
    iconName: "time-outline",
    iconColor: "#F59E0B",
  },
  {
    label: "This month",
    tag: "Planned",
    tagColor: "#8B5CF6",
    tagBg: "#F5F3FF",
    iconName: "calendar-outline",
    iconColor: "#8B5CF6",
  },
  {
    label: "Flexible",
    tag: "No rush",
    tagColor: "#64748B",
    tagBg: "#F1F5F9",
    iconName: "leaf-outline",
    iconColor: "#64748B",
  },
];

interface TimelineOptionProps {
  selected: string;
  onSelect: (val: string) => void;
}

const TimelineOption = ({ selected, onSelect }: TimelineOptionProps) => {
  return (
    <View className="mb-5">
      <View className="flex-row items-center mb-2">
        <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold">
          Timeline / Urgency
        </Text>
        <Text className="text-red-500 ml-1 text-[13.5px]">*</Text>
      </View>

      <View style={{ gap: 10 }}>
        {TIMELINE_OPTIONS.map((item) => {
          const isSelected = selected === item.label;
          return (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.8}
              onPress={() => onSelect(item.label)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 13,
                paddingHorizontal: 16,
                borderRadius: 12,
                backgroundColor: isSelected ? "#0EA5E9" : "#FFFFFF",
                borderWidth: 1.5,
                borderColor: isSelected ? "#0EA5E9" : "#E2E8F0",
                shadowColor: "#94A3B8",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: isSelected ? 0 : 0.07,
                shadowRadius: 3,
                elevation: isSelected ? 0 : 1,
              }}
            >
              <Text
                className="text-[13.5px] font-Inter_Medium"
                style={{ color: isSelected ? "#FFFFFF" : "#475569" }}
              >
                {item.label}
              </Text>

              <View
                className="flex-row items-center px-2 py-1 rounded-full"
                style={{ backgroundColor: item.tagBg, gap: 4 }}
              >
                <Ionicons
                  name={item.iconName}
                  size={12}
                  color={item.iconColor}
                />
                <Text
                  className="text-[11px] font-Inter_SemiBold"
                  style={{ color: item.tagColor }}
                >
                  {item.tag}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TimelineOption;
