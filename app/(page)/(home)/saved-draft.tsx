import { GradientButton } from "@/src/components/onboarding/GradientButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const drafts = [
  {
    id: "1",
    title: "EV Charger Installation",
    lastEdited: "April 3, 2026",
    progress: 44,
    route: "/quote/ev-charger/ev-projectDetails",
  },
  {
    id: "2",
    title: "Panel Upgrade / Replacement",
    lastEdited: "April 1, 2026",
    progress: 67,
    route: "/quote/panel-upgrade/panel-location",
  },
];

const SavedDraft = () => {
  const headerSlide = useRef(new Animated.Value(-30)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;

  const cardAnims = useRef(
    drafts.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(24),
    })),
  ).current;

  const [draftList, setDraftList] = useState(drafts);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.88)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerSlide, {
          toValue: 0,
          duration: 380,
          useNativeDriver: true,
        }),
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 380,
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(
        120,
        cardAnims.map((anim) =>
          Animated.parallel([
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 350,
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateY, {
              toValue: 0,
              duration: 350,
              useNativeDriver: true,
            }),
          ]),
        ),
      ),
    ]).start();
  }, []);

  const openDeleteModal = (id: string) => {
    setDeleteTarget(id);
    modalOpacity.setValue(0);
    modalScale.setValue(0.88);
    Animated.parallel([
      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(modalScale, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.timing(modalOpacity, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setDeleteTarget(null);
    });
  };

  const confirmDelete = () => {
    setDraftList((prev) => prev.filter((d) => d.id !== deleteTarget));
    closeModal();
  };

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* Header */}
        <Animated.View
          style={{
            transform: [{ translateY: headerSlide }],
            opacity: headerOpacity,
          }}
          className="flex-row items-center px-4 pt-2 pb-3"
        >
          <TouchableOpacity onPress={() => router.back()} className="p-1 mr-2">
            <Feather name="arrow-left" size={22} color="#0F172A" />
          </TouchableOpacity>
          <Text className="text-xl text-[#0F172A] font-Inter_Bold">
            Saved Drafts
          </Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.Text className="text-[#475569] text-sm px-4 mb-4">
          Finish your quote requests anytime
        </Animated.Text>

        {/* Draft Cards */}
        <View className="px-4 gap-y-3">
          {draftList.map((draft, index) => {
            const anim = cardAnims[drafts.findIndex((d) => d.id === draft.id)];
            return (
              <Animated.View
                key={draft.id}
                style={{
                  opacity: anim.opacity,
                  transform: [{ translateY: anim.translateY }],
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: 18,
                  shadowColor: "#0EA5E9",
                  shadowOpacity: 0.08,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 3 },
                  elevation: 3,
                }}
              >
                {/* Title Row */}
                <View className="flex-row justify-between items-start mb-1">
                  <Text className="text-[#0F172A] font-Inter_SemiBold text-base  flex-1 pr-2">
                    {draft.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => openDeleteModal(draft.id)}
                    className="p-1"
                  >
                    <Feather name="trash-2" size={18} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                {/* Last edited */}
                <Text className="text-[#64748B] font-Inter_Regular text-sm mb-3">
                  Last edited {draft.lastEdited}
                </Text>

                {/* Progress label */}
                <Text
                  className="text-[#64748B] font-Inter_Regular text-sm mb-1.5"
                  style={{ fontFamily: "Inter_Regular" }}
                >
                  {draft.progress}% complete
                </Text>

                {/* Progress bar */}
                <View className="w-full h-2 bg-[#E2E8F0] rounded-full mb-4 overflow-hidden">
                  <LinearGradient
                    colors={["#0EA5E9", "#14B8A6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      width: `${draft.progress}%`,
                      height: 8,
                      borderRadius: 999,
                    }}
                  />
                </View>

                <GradientButton
                  label="Resume"
                  onPress={() => router.push(draft.route as any)}
                />
              </Animated.View>
            );
          })}
        </View>

        {/* Delete Confirm Modal */}
        <Modal
          transparent
          visible={!!deleteTarget}
          animationType="none"
          onRequestClose={closeModal}
        >
          <View
            className="flex-1 justify-center items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          >
            <Animated.View
              style={{
                opacity: modalOpacity,
                transform: [{ scale: modalScale }],
                backgroundColor: "white",
                borderRadius: 24,
                paddingHorizontal: 24,
                paddingVertical: 28,
                width: "82%",
                shadowColor: "#000",
                shadowOpacity: 0.18,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 8 },
                elevation: 10,
              }}
            >
              {/* Modal Icon */}
              <View className="items-center mb-4">
                <View
                  className="w-14 h-14 rounded-full items-center justify-center mb-3"
                  style={{ backgroundColor: "#FEE2E2" }}
                >
                  <Feather name="trash-2" size={24} color="#EF4444" />
                </View>
                <Text
                  className="text-[#0F172A] text-lg text-center"
                  style={{ fontFamily: "Inter_Bold" }}
                >
                  Delete Draft?
                </Text>
                <Text
                  className="text-[#64748B] text-sm text-center mt-1.5 leading-5"
                  style={{ fontFamily: "Inter_Regular" }}
                >
                  This draft will be permanently removed. This action cannot be
                  undone.
                </Text>
              </View>

              {/* Buttons */}
              <View className="flex-row gap-x-3 mt-2">
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={closeModal}
                  className="flex-1 rounded-full py-3.5 items-center"
                  style={{
                    backgroundColor: "#F1F5F9",
                  }}
                >
                  <Text
                    className="text-[#334155] text-[15px]"
                    style={{ fontFamily: "Inter_SemiBold" }}
                  >
                    No
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={confirmDelete}
                  className="flex-1 rounded-full py-3.5 items-center"
                  style={{
                    backgroundColor: "#EF4444",
                    shadowColor: "#EF4444",
                    shadowOpacity: 0.28,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 3 },
                    elevation: 4,
                  }}
                >
                  <Text
                    className="text-white text-[15px]"
                    style={{ fontFamily: "Inter_SemiBold" }}
                  >
                    Yes, Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </Modal>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default SavedDraft;
