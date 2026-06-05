// src/components/shared/QuickTags.tsx
import { Pressable, Text, View } from "react-native";

interface QuickTagsProps {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
}

const QuickTags = ({ tags, selected, onToggle }: QuickTagsProps) => {
  return (
    <View className="mb-5">
      <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold mb-3">
        Quick tags
      </Text>
      <View className="flex-row flex-wrap" style={{ gap: 10 }}>
        {tags.map((tag) => {
          const isSelected = selected.includes(tag);
          return (
            <Pressable
              key={tag}
              onPress={() => onToggle(tag)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: isSelected ? "#EEF9FF" : "#FFFFFF",
                borderWidth: 1.5,
                borderColor: isSelected ? "#0EA5E9" : "#E2E8F0",
              }}
            >
              <Text
                className="text-[12.5px] font-Inter_Medium"
                style={{ color: isSelected ? "#0EA5E9" : "#64748B" }}
              >
                {tag}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default QuickTags;
