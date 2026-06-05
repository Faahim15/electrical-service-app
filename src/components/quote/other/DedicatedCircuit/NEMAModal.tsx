import React from "react";
import { Image, Modal, Pressable, ScrollView, View } from "react-native";

const NEMAModal = ({
  visible = true,
  onClose,
}: {
  visible?: boolean;
  onClose?: () => void;
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 bg-[#0000006e]">
        {/* Close button */}
        <Pressable
          className="absolute top-10 right-4 z-10 w-10 h-10 rounded-full bg-[#0000005b] justify-center items-center"
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View className="w-[18px] h-[18px] justify-center items-center">
            <View className="absolute w-[18px] h-0.5 rounded bg-white rotate-45" />
            <View className="absolute w-[18px] h-0.5 rounded bg-white -rotate-45" />
          </View>
        </Pressable>

        {/* Scrollable image */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
          maximumZoomScale={3}
          minimumZoomScale={1}
        >
          <Image
            source={require("../../../../../assets/images/nema.png")}
            className="w-[80%]"
            resizeMode="contain"
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default NEMAModal;
