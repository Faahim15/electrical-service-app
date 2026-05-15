export type StatusType = "In Review" | "Contacted" | "Closed" | "Pending";

export interface Quote {
  id: string;
  title: string;
  submittedDate: string;
  description: string;
  status: StatusType;
  refCode: string;
}

export const QUOTES: Quote[] = [
  {
    id: "1",
    title: "EV Charger Installation",
    submittedDate: "April 3, 2026",
    description: "Level 2 charger installation in garage",
    status: "In Review",
    refCode: "VQT-44FZC1",
  },
  {
    id: "2",
    title: "Panel Upgrade",
    submittedDate: "March 28, 2026",
    description: "200A panel upgrade for home renovation",
    status: "Contacted",
    refCode: "VQT-B76350",
  },
  {
    id: "3",
    title: "Service Call",
    submittedDate: "March 15, 2026",
    description: "Circuit breaker issue resolved",
    status: "Closed",
    refCode: "VQT-C2F1A8",
  },
];

export type FilterTab = "All" | "Pending" | "In Review" | "Contacted";

export const FILTER_TABS: FilterTab[] = [
  "All",
  "Pending",
  "In Review",
  "Contacted",
];

export const statusStyles: Record<
  StatusType,
  { bg: string; text: string; label: string }
> = {
  "In Review": {
    bg: "bg-amber-100",
    text: "text-amber-600",
    label: "In Review",
  },
  Contacted: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    label: "Contacted",
  },
  Closed: {
    bg: "bg-green-100",
    text: "text-green-600",
    label: "Closed",
  },
  Pending: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    label: "Pending",
  },
};
export const badgeColorMap: Record<string, string> = {
  "In Review": "#D97706",
  Contacted: "#2563EB",
  Closed: "#16A34A",
  Pending: "#4B5563",
};
