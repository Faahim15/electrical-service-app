import EvilIcons from "@expo/vector-icons/build/EvilIcons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import InputField from "../../shared/InputFiend";
import LinearButton from "../../shared/LinearButton";

const ProfileEditForm: React.FC = () => {
  const [fullName, setFullName] = useState("Ashley Martinez");
  const [email, setEmail] = useState("ashley.m@email.com");
  const [phone, setPhone] = useState("(555) 987-6543");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    console.log("Saving changes...", {
      fullName,
      email,
      phone,
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  const handleCancel = () => {
    console.log("Cancelled");
  };

  return (
    <View className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 40,
            gap: 16,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Info Card */}
          <View className="bg-white rounded-[20px] px-5 py-5 gap-1 shadow-md">
            <InputField
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              autoCapitalize="words"
            />
            <InputField
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <InputField
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
          </View>

          {/* Change Password Card */}
          <View className="bg-white rounded-[20px] px-5 py-5 gap-1 shadow-md">
            <View className="flex-row items-center gap-[6px] mb-2">
              <EvilIcons name="lock" size={24} color="#6B7280" />
              <Text className="text-[16px] font-Inter_SemiBold text-[#111827] tracking-[-0.3px]">
                Change Password
              </Text>
            </View>

            <InputField
              label="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              secureTextEntry
              autoCapitalize="none"
            />
            <InputField
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry
              autoCapitalize="none"
            />
            <InputField
              label="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Actions */}
          <View className="gap-3 mt-1">
            <LinearButton
              title="Save Changes"
              onPress={handleSave}
              variant="primary"
            />
            <LinearButton
              title="Cancel"
              onPress={handleCancel}
              variant="secondary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileEditForm;
