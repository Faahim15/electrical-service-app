import React from "react";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";

type CustomSvgProps = {
  xml: string;
  width?: number;
  height?: number;
};

const CustomSvg = ({ xml, width = 24, height = 24 }: CustomSvgProps) => {
  return (
    <View>
      <SvgXml xml={xml} width={width} height={height} />
    </View>
  );
};

export default CustomSvg;
