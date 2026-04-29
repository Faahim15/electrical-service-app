// src/components/shared/OptionGrid.tsx
import { Text, TouchableOpacity, View } from "react-native";

interface OptionGridProps {
  label: string;
  required?: boolean;
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
  numColumns?: 2 | 1;
}

const OptionGrid = ({
  label,
  required = false,
  options,
  selected,
  onSelect,
  numColumns = 2,
}: OptionGridProps) => {
  const isFullWidth = numColumns === 1;

  return (
    <View className="mb-5">
      <View className="flex-row items-center mb-2">
        <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold">
          {label}
        </Text>
        {required && <Text className="text-red-500 ml-1 text-[13.5px]">*</Text>}
      </View>

      <View className="flex-row flex-wrap" style={{ gap: 10 }}>
        {options.map((option) => {
          const isSelected = selected === option;
          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.8}
              onPress={() => onSelect(option)}
              style={{
                width: isFullWidth ? "100%" : "48%",
                paddingVertical: 13,
                paddingHorizontal: 16,
                borderRadius: 12,
                backgroundColor: isSelected ? "#EEF9FF" : "#FFFFFF",
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
                style={{ color: isSelected ? "#0EA5E9" : "#475569" }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default OptionGrid;
