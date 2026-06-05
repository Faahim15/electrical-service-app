import LinearButton from "@/src/components/shared/LinearButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { RootState } from "@/src/redux/store";
import Feather from "@expo/vector-icons/build/Feather";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
interface Quote {
  id: string;
  title: string;
  date: string;
  description: string;
  status: "Submitted" | "Draft" | "Closed";
}
const STATUS_CONFIGC: Record<Quote["status"], { bg: string; text: string }> = {
  Submitted: {
    bg: "#06B6D415",
    text: "#06B6D4",
  },
  Draft: {
    bg: "#F59E0B15",
    text: "#F59E0B",
  },
  Closed: {
    bg: "#F3F4F6",
    text: "#6B7280",
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type QuoteStatus = "Submitted" | "Draft" | "Closed";

interface QuoteDetail {
  id: string;
  serviceType: string;
  submittedDate: string;
  status: QuoteStatus;
  phone: string;
  email: string;
  projectSummary: string;
  additionalNotes: string;
  attachments: string[];
}

// ─── Mock DB ──────────────────────────────────────────────────────────────────

const QUOTES_DB: Record<string, QuoteDetail> = {
  "1": {
    id: "1",
    serviceType: "EV Charger Installation",
    submittedDate: "March 25, 2026",
    status: "Submitted",
    phone: "+1 (555) 012-3456",
    email: "support@example.com",
    projectSummary: "Level 2 charger for Tesla Model 3",
    additionalNotes: "Please install near the garage entrance.",
    attachments: ["site_photo.jpg", "floor_plan.pdf"],
  },
  "2": {
    id: "2",
    serviceType: "Panel Upgrade",
    submittedDate: "March 18, 2026",
    status: "Submitted",
    phone: "+1 (555) 987-6543",
    email: "panel@example.com",
    projectSummary: "200A panel replacement needed",
    additionalNotes: "",
    attachments: [],
  },
  "3": {
    id: "3",
    serviceType: "Remodel Quote",
    submittedDate: "March 10, 2026",
    status: "Closed",
    phone: "",
    email: "",
    projectSummary: "Kitchen remodel electrical work",
    additionalNotes: "Job was completed. No further action needed.",
    attachments: ["invoice_final.pdf"],
  },
  "4": {
    id: "4",
    serviceType: "Dedicated Circuit Quote",
    submittedDate: "February 28, 2026",
    status: "Draft",
    phone: "",
    email: "",
    projectSummary: "New circuit for home office",
    additionalNotes: "",
    attachments: [],
  },
};

// ─── Status Config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  QuoteStatus,
  { color: string; iconColor: string; badgeBg: string; icon: string }
> = {
  Submitted: {
    color: "#0EA5E9",
    iconColor: "#0EA5E9",
    badgeBg: "#EFF8FF",
    icon: "check-circle",
  },
  Draft: {
    color: "#D97706",
    iconColor: "#D97706",
    badgeBg: "#FFF7ED",
    icon: "edit-2",
  },
  Closed: {
    color: "#6B7280",
    iconColor: "#6B7280",
    badgeBg: "#F3F4F6",
    icon: "x-circle",
  },
};

// ─── Animated Card ────────────────────────────────────────────────────────────

function AnimatedCard({
  children,
  delay = 0,
  extraStyle,
}: {
  children: React.ReactNode;
  delay?: number;
  extraStyle?: object;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 380,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 380,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          shadowColor: "#94A3B8",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 2,
        },
        extraStyle,
      ]}
      className="bg-white rounded-2xl p-4 mb-3"
    >
      {children}
    </Animated.View>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function Divider() {
  return <View className="h-px bg-gray-100 my-3" />;
}

// ─── Info Row ─────────────────────────────────────────────────────────────────

function InfoRow({
  icon,
  label,
  value,
  valueColor,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  valueColor?: string;
}) {
  return (
    <View className="flex-row items-start gap-3">
      <View className="mt-0.5">{icon}</View>
      <View className="flex-1">
        <Text className="text-xs text-[#6B7280] font-Inter_Regular mb-0.5">
          {label}
        </Text>
        <Text
          className="text-[15px] font-Inter_SemiBold text-gray-900"
          style={valueColor ? { color: valueColor } : {}}
        >
          {value || "—"}
        </Text>
      </View>
    </View>
  );
}

// ─── Contact Row ──────────────────────────────────────────────────────────────

function ContactRow({
  icon,
  placeholder,
  value,
  onPress,
  showDivider = true,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value?: string;
  onPress?: () => void;
  showDivider?: boolean;
}) {
  const hasValue = !!value;
  return (
    <>
      <Pressable
        className="flex-row items-center gap-3 py-0.5"
        onPress={hasValue ? onPress : undefined}
        // activeOpacity={hasValue ? 0.6 : 1}
        disabled={!hasValue}
      >
        <View>{icon}</View>
        <Text
          className={`flex-1 text-sm font-Inter_Regular ${
            hasValue ? "text-[#6B7280] " : "text-gray-400"
          }`}
        >
          {value || placeholder}
        </Text>
      </Pressable>
      {showDivider && <Divider />}
    </>
  );
}

// ─── Attachment Item ──────────────────────────────────────────────────────────

function AttachmentItem({ name }: { name: string }) {
  const ext = name.split(".").pop()?.toUpperCase() ?? "FILE";
  const isImage = ["JPG", "JPEG", "PNG", "WEBP"].includes(ext);
  return (
    <Pressable
      className="flex-row items-center gap-2.5 py-2 px-1 rounded-xl mb-1 bg-slate-50"
      // activeOpacity={0.7}
    >
      <View className="w-8 h-8 rounded-lg bg-sky-50 items-center justify-center">
        <Feather name={isImage ? "image" : "file"} size={16} color="#0EA5E9" />
      </View>
      <Text
        className="flex-1 text-[13px] text-gray-700 font-Inter_Regular"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Feather name="download" size={16} color="#9CA3AF" />
    </Pressable>
  );
}

// ─── Skeleton Shimmer ─────────────────────────────────────────────────────────

function SkeletonBlock({
  width = "100%",
  height = 16,
}: {
  width?: string | number;
  height?: number;
}) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  return <Animated.View className={"rounded-sm "} />;
}

function LoadingSkeleton() {
  return (
    <View className="px-4 pt-2">
      {[0, 1, 2, 3].map((i) => (
        <View
          key={i}
          className="bg-white rounded-2xl p-4 mb-3"
          style={{
            shadowColor: "#94A3B8",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <SkeletonBlock height={14} width="40%" />
          <SkeletonBlock height={20} width="75%" />
          {i < 2 && (
            <>
              <View className="h-px bg-gray-100 my-3" />
              <SkeletonBlock height={14} width="30%" />
              <SkeletonBlock height={20} width="55%" />
            </>
          )}
        </View>
      ))}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

const Myquotedetais = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [quote, setQuote] = useState<QuoteDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const quoteitem = useSelector(
    (state: RootState) => state.quoteDetails.selectedQuote,
  );
  console.log(quoteitem);

  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setQuote(id ? (QUOTES_DB[id] ?? QUOTES_DB["1"]) : QUOTES_DB["1"]);
      setLoading(false);
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  const handlePhone = (phone: string) =>
    Linking.openURL(`tel:${phone}`).catch(() =>
      Alert.alert("Error", "Cannot open phone dialer."),
    );

  const handleEmail = (email: string) =>
    Linking.openURL(`mailto:${email}`).catch(() =>
      Alert.alert("Error", "Cannot open mail app."),
    );

  const handleContactSupport = () =>
    Alert.alert(
      "Contact Support",
      "Our team will reach out to you within 24 hours.",
      [{ text: "OK" }],
    );

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* ── Header ── */}
        <Animated.View
          style={{ opacity: headerFade }}
          className="flex-row justify-between items-center pb-2"
        >
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </Pressable>
          <Text className="text-2xl text-[#111827] font-Inter_Bold">
            Quote Details
          </Text>
          <View />
        </Animated.View>

        {/* ── Loading ── */}
        {loading ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <LoadingSkeleton />
          </ScrollView>
        ) : !quote ? (
          <View className="flex-1 items-center justify-center gap-3 px-8">
            <Feather name="alert-circle" size={48} color="#D1D5DB" />
            <Text className="text-lg font-Inter_Bold text-gray-700">
              Quote Not Found
            </Text>
            <Text className="text-sm font-Inter_Regular text-gray-400 text-center mb-2">
              {`This quote may have been removed or doesn't exist.`}
            </Text>
            <Pressable
              className="bg-[#06B6D4] rounded-2xl px-8 py-4 mt-2"
              onPress={() => router.back()}
            >
              <Text className="text-white text-[15px] font-Inter_SemiBold">
                Go Back
              </Text>
            </Pressable>
          </View>
        ) : (
          /* ── Content ── */
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 32 }}
          >
            {/* Service Type Card */}
            <AnimatedCard delay={0}>
              <View className="flex-row items-center gap-3">
                <View className="w-11 h-11 rounded-xl bg-sky-50 items-center justify-center">
                  <Feather name="file-text" size={22} color="#06B6D4" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-[#6B7280] font-Inter_Regular mb-0.5">
                    Service Type
                  </Text>
                  <Text className="text-[15px] text-gray-900 font-Inter_Bold">
                    {quoteitem?.title}
                  </Text>
                </View>
              </View>
            </AnimatedCard>

            {/* Submitted Date & Status Card */}
            <AnimatedCard delay={60}>
              <InfoRow
                icon={<Feather name="calendar" size={18} color="#9CA3AF" />}
                label="Submitted Date"
                value={quote.submittedDate}
              />
              <Divider />
              <InfoRow
                icon={
                  <Feather
                    name={STATUS_CONFIG[quote.status].icon as any}
                    size={18}
                    color={
                      STATUS_CONFIGC[quoteitem?.status as Quote["status"]]?.text
                    }
                  />
                }
                label="Status"
                value={quoteitem?.status}
                valueColor={
                  STATUS_CONFIGC[quoteitem?.status as Quote["status"]]?.text
                }
              />
            </AnimatedCard>

            {/* Contact Information Card */}
            <AnimatedCard delay={120}>
              <Text className="text-[15px] text-gray-900 font-Inter_Bold">
                Contact Information
              </Text>
              <View className="h-3" />
              <ContactRow
                icon={<Feather name="phone" size={18} color="#9CA3AF" />}
                placeholder="Phone not provided"
                value={quote.phone}
                onPress={() => handlePhone(quote.phone)}
                showDivider
              />
              <ContactRow
                icon={
                  <Feather name="message-square" size={18} color="#9CA3AF" />
                }
                placeholder="Email not provided"
                value={quote.email}
                onPress={() => handleEmail(quote.email)}
                showDivider={false}
              />
            </AnimatedCard>

            {/* Project Summary Card */}
            <AnimatedCard delay={180}>
              <Text className="text-[15px] text-gray-900 font-Inter_Bold">
                Project Summary
              </Text>
              <View className="h-2" />
              <Text
                className={`text-sm leading-5 font-Inter_Regular ${
                  quote.projectSummary
                    ? "text-gray-500"
                    : "text-gray-400 italic"
                }`}
              >
                {quote.projectSummary || "No summary provided."}
              </Text>
            </AnimatedCard>

            {/* Additional Notes Card */}
            <AnimatedCard delay={240}>
              <Text className="text-[15px] text-gray-900 font-Inter_Bold">
                Additional Notes
              </Text>
              <View className="h-2" />
              <Text
                className={`text-sm leading-5 font-Inter_Regular ${
                  quote.additionalNotes
                    ? "text-gray-500"
                    : "text-gray-400 italic"
                }`}
              >
                {quote.additionalNotes || "No additional notes."}
              </Text>
            </AnimatedCard>

            {/* Attachments Card */}
            <AnimatedCard delay={300}>
              <View className="flex-row items-center gap-2.5">
                <View className="w-9 h-9 rounded-xl bg-gray-100 items-center justify-center">
                  <Feather name="paperclip" size={18} color="#9CA3AF" />
                </View>
                <Text className="text-[15px] text-gray-900 font-Inter_Bold">
                  Attachments
                  {quote.attachments.length > 0 && (
                    <Text className="text-[13px] text-gray-400 font-Inter_Regular">
                      {"  "}({quote.attachments.length})
                    </Text>
                  )}
                </Text>
              </View>
              <View className="h-2.5" />
              {quote.attachments.length === 0 ? (
                <Text className="text-[13px] text-gray-400 font-Inter_Regular italic">
                  No attachments uploaded
                </Text>
              ) : (
                quote.attachments.map((att, i) => (
                  <AttachmentItem key={i} name={att} />
                ))
              )}
            </AnimatedCard>
            <View className="flex-col gap-3">
              <LinearButton
                title="Contact Support"
                onPress={() => router.push("/(tabs)/profile/help")}
                variant="primary"
              />
              <LinearButton
                title="Back to Quotes"
                onPress={() => router.back()}
                variant="secondary"
              />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Myquotedetais;
