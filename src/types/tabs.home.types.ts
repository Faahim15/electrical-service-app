import { Ionicons } from "@expo/vector-icons";
export type QuickAction = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
};
export type ActivityItem = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
};

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
}
