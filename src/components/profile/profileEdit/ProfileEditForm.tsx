import EvilIcons from "@expo/vector-icons/build/EvilIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import InputField2 from "../../shared/InputField2";
import LinearButton from "../../shared/LinearButton";

interface ServiceAddress {
  id: number;
  locationnickname: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

const ProfileEditForm: React.FC = () => {
  const [fullName, setFullName] = useState("Ashley Martinez");
  const [email, setEmail] = useState("ashley.m@email.com");
  const [phone, setPhone] = useState("(555) 987-6543");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [serviceAddresses, setServiceAddresses] = useState<ServiceAddress[]>([
    { id: 1, locationnickname: "", street: "", city: "", state: "", zip: "" },
  ]);

  const handleNewLocation = () => {
    setServiceAddresses((prev) => [
      ...prev,
      {
        id: Date.now(),
        locationnickname: "",
        street: "",
        city: "",
        state: "",
        zip: "",
      },
    ]);
  };

  const handleRemoveLocation = (id: number) => {
    setServiceAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleAddressChange = (
    id: number,
    field: keyof Omit<ServiceAddress, "id">,
    value: string,
  ) => {
    setServiceAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, [field]: value } : addr)),
    );
  };

  const handleSave = () => {
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View className="flex-1 flex-col gap-4">
      {/* Profile Info Card */}
      <View className="bg-white rounded-[20px] px-5 py-5 gap-1 shadow-md">
        <InputField2
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
          autoCapitalize="words"
        />
        <InputField2
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputField2
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
      </View>

      {/* Service Address — dynamic list */}
      {serviceAddresses.map((addr, index) => (
        <View
          key={addr.id}
          className="bg-white rounded-[20px] px-5 py-5 gap-1 shadow-md"
        >
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-[6px]">
              <EvilIcons name="location" size={24} color="#6B7280" />
              <Text className="text-[16px] font-Inter_SemiBold text-[#111827] tracking-[-0.3px]">
                {index === 0
                  ? "Service Address"
                  : `Service Address ${index + 1}`}
              </Text>
            </View>

            {/* Remove button — only show on extra addresses */}
            {index > 0 && (
              <Pressable
                onPress={() => handleRemoveLocation(addr.id)}
                className="bg-red-50 px-3 py-1 rounded-full border border-red-200"
              >
                <Text className="text-red-500 text-xs font-semibold">
                  Remove
                </Text>
              </Pressable>
            )}
          </View>
          <InputField2
            label="Location NickName"
            value={addr.locationnickname}
            onChangeText={(val) =>
              handleAddressChange(addr.id, "locationnickname", val)
            }
            placeholder="Home/Office"
            autoCapitalize="none"
          />

          <InputField2
            label="Street Address"
            value={addr.street}
            onChangeText={(val) => handleAddressChange(addr.id, "street", val)}
            placeholder="123 Main Street"
            autoCapitalize="none"
          />
          <InputField2
            label="City"
            value={addr.city}
            onChangeText={(val) => handleAddressChange(addr.id, "city", val)}
            placeholder="San Francisco"
            autoCapitalize="none"
          />

          <View className="flex-row gap-2 items-center justify-between">
            <View className="w-[45%]">
              <InputField2
                label="State"
                value={addr.state}
                onChangeText={(val) =>
                  handleAddressChange(addr.id, "state", val)
                }
                placeholder="CA"
                autoCapitalize="none"
              />
            </View>
            <View className="w-[45%]">
              <InputField2
                label="ZIP Code"
                value={addr.zip}
                onChangeText={(val) => handleAddressChange(addr.id, "zip", val)}
                placeholder="255852"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Add button only on last card */}
          {index === serviceAddresses.length - 1 && (
            <Pressable
              className="border border-[#E2E8F0] bg-[#F6F6F6] h-[54px] justify-center items-center rounded-2xl "
              onPress={handleNewLocation}
            >
              <Text
                className={`text-[16px] tracking-[0.2px] text-[#6B7280] font-Inter_Medium`}
              >
                Add Other Location
              </Text>
            </Pressable>
            // <LinearButton
            //   title="Add Other Location"
            //   onPress={handleNewLocation}
            //   variant="secondary"
            // />
          )}
        </View>
      ))}

      {/* Billing Address */}
      <View className="bg-white rounded-[20px] px-5 py-5 gap-1 shadow-md">
        <View className="flex-row items-center gap-[6px] mb-2">
          <EvilIcons name="location" size={24} color="#6B7280" />
          <Text className="text-[16px] font-Inter_SemiBold text-[#111827] tracking-[-0.3px]">
            Billing Address
          </Text>
        </View>

        <InputField2
          label="Street Address"
          value={""}
          onChangeText={setCurrentPassword}
          placeholder="123 Main Street"
          autoCapitalize="none"
        />
        <InputField2
          label="City"
          value={""}
          onChangeText={setNewPassword}
          placeholder="San Francisco"
          autoCapitalize="none"
        />

        <View className="flex-row gap-2 items-center justify-between">
          <View className="w-[45%]">
            <InputField2
              label="State"
              value={""}
              onChangeText={setNewPassword}
              placeholder="CA"
              autoCapitalize="none"
            />
          </View>
          <View className="w-[45%]">
            <InputField2
              label="ZIP Code"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="255852"
              autoCapitalize="none"
            />
          </View>
        </View>
      </View>

      {/* Change Password Card */}
      <View className="bg-white rounded-[20px] px-5 py-5 gap-1 shadow-md">
        <View className="flex-row items-center gap-[6px] mb-2">
          <EvilIcons name="lock" size={24} color="#6B7280" />
          <Text className="text-[16px] font-Inter_SemiBold text-[#111827] tracking-[-0.3px]">
            Change Password
          </Text>
        </View>

        <InputField2
          label="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Enter current password"
          secureTextEntry
          autoCapitalize="none"
        />
        <InputField2
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter new password"
          secureTextEntry
          autoCapitalize="none"
        />
        <InputField2
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
    </View>
  );
};

export default ProfileEditForm;
