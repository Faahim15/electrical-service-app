import { ActivityItem, QuickAction } from "@/src/types/tabs.home.types";
export const quickActions: QuickAction[] = [
  {
    id: "1",
    icon: "shield-checkmark-outline",
    title: "Safety Reminders",
    subtitle: "Stay safe and informed",
  },
  {
    id: "2",
    icon: "construct-outline",
    title: "Troubleshooting",
    subtitle: "Fix common issues fast",
  },
  {
    id: "3",
    icon: "document-text-outline",
    title: "Saved Draft Quotes",
    subtitle: "Get in touch quickly",
  },
  {
    id: "4",
    icon: "document-outline",
    title: "My Quotes",
    subtitle: "Get in touch quickly",
  },
];

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    icon: "flash-outline",
    title: "EV Charger Quote",
    subtitle: "Submitted 2 days ago",
    badge: "Pending",
    badgeColor: "#F59E0B",
  },
  {
    id: "2",
    icon: "alarm-outline",
    title: "Smoke Detector Check",
    subtitle: "Due in 3 days",
    badge: "Upcoming",
    badgeColor: "#3B82F6",
  },
  {
    id: "3",
    icon: "power-outline",
    title: "GFCI Reset Guide",
    subtitle: "Viewed yesterday",
  },
];