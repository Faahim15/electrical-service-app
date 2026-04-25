import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TextProps } from "react-native";

type AppTextProps = TextProps & {
  title: string;
};

const AppText = ({ title, style, ...rest }: AppTextProps) => {
  return (
    <MaskedView
      maskElement={
        <Text style={style} {...rest}>
          {title}
        </Text>
      }
    >
      <LinearGradient
        colors={[
          "#0EA5E9",
          "#0CA7E4",
          "#0AA8E0",
          "#09AADB",
          "#08ABD7",
          "#07ADD2",
          "#07AECD",
          "#08AFC9",
          "#08B1C4",
          "#0AB2BF",
          "#0BB3BA",
          "#0DB5B5",
          "#10B6B0",
          "#12B7AB",
          "#14B8A6",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[style, { opacity: 0 }]} {...rest}>
          {title}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default AppText;
