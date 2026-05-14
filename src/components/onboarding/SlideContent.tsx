import { OnboardingSlide } from "@/src/types/onboarding.types";
import React from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { SvgXml } from "react-native-svg";
import { Chip } from "./Chip";
import { ListRow } from "./Listrow";

interface SlideContentProps {
  slide: OnboardingSlide;
}

export const SlideContent = ({ slide }: SlideContentProps) => {
  const { width, height } = useWindowDimensions();

  // Screen size onujayi adaptive sizing
  const isSmallDevice = height < 700;
  const svgHeight = isSmallDevice ? height * 0.22 : 220;

  return (
    <View style={{ width }} className="flex-1 px-[5%]">
      {/* SVG Image Container */}
      <View className="items-center mt-[5%] mb-[4%]" style={{ flexShrink: 1 }}>
        <SvgXml xml={slide.svg} width={width * 0.82} height={svgHeight} />
      </View>

      {/* Text Content */}
      <Text
        className="font-Inter_Bold text-gray-900 mb-2"
        style={{
          fontSize: isSmallDevice ? 20 : 24,
          lineHeight: isSmallDevice ? 28 : 32,
        }}
      >
        {slide.title}
      </Text>

      <Text
        className="font-Inter_Regular text-gray-500 mb-4"
        style={{ fontSize: 14, lineHeight: 22 }}
      >
        {slide.description}
      </Text>

      {/* Chips Section */}
      {slide.chips && (
        <View className="flex-row flex-wrap mb-2">
          {slide.chips.map((chip) => (
            <Chip key={chip.label} {...chip} />
          ))}
        </View>
      )}

      {/* List Items Section */}
      {slide.listItems && (
        <View className="mb-2">
          {slide.listItems.map((item) => (
            <ListRow key={item.title} item={item} />
          ))}
        </View>
      )}

      {/* Note Section */}
      {slide.note && (
        <View className="bg-gray-100 rounded-xl px-4 py-3 mb-4">
          <Text className="text-xs text-gray-500 font-Inter_Regular text-center">
            {slide.note}
          </Text>
        </View>
      )}
    </View>
  );
};
