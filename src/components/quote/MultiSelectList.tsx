// src/components/shared/MultiSelectList.tsx
import { Pressable, Text, View } from "react-native";

interface MultiSelectListProps {
  label: string;
  required?: boolean;
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
}

const MultiSelectList = ({
  label,
  required = false,
  options,
  selected,
  onToggle,
}: MultiSelectListProps) => {
  return (
    <View className="mb-5">
      <View className="flex-row items-center mb-2">
        <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold">
          {label}
        </Text>
        {required && <Text className="text-red-500 ml-1">*</Text>}
      </View>
      <View style={{ gap: 10 }}>
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <Pressable
              key={option}
              onPress={() => onToggle(option)}
              style={{
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
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default MultiSelectList;
