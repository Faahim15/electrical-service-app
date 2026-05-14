import ServiceDetailPage from "@/src/components/shared/ServiceDetailPage";
import { RootState } from "@/src/redux/store";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

const SERVICE_DETAIL_DATA: Record<
  string,
  {
    subtitle: string;
    bestForItems: { id: string; text: string }[];
    provideItems: { id: string; text: string }[];
    estimatedTime: string;
    estimatedTimeSubtitle: string;
    steps: { id: string; step: number; label: string }[];
  }
> = {
  "1": {
    subtitle:
      "Fast response for electrical repairs, troubleshooting, and emergency fixes.",
    bestForItems: [
      { id: "1", text: "Electrical issues or outages" },
      { id: "2", text: "Circuit breaker problems" },
      { id: "3", text: "Outlet or switch repairs" },
      { id: "4", text: "Safety inspections" },
    ],
    provideItems: [
      { id: "1", text: "Description of the issue" },
      { id: "2", text: "Photos of the problem area" },
      { id: "3", text: "Property access details" },
    ],
    estimatedTime: "Takes about 2–3 minutes",
    estimatedTimeSubtitle: "Quick and easy process",
    steps: [
      { id: "1", step: 1, label: "Contact details" },
      { id: "2", step: 2, label: "Project information" },
      { id: "3", step: 3, label: "Photo upload" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "2": {
    subtitle:
      "Professional EV charger installation with safe wiring and code compliance. We are a Certified Tesla Installer and are partnered with Qmerit! We install all Electric Vehicle charging configurations, including bi-directional chargers for GM and Tesla",
    bestForItems: [
      { id: "1", text: "New EV charger setup" },
      { id: "2", text: "Hardwired charger installation" },
      { id: "3", text: "Plug-in charger installation" },
      { id: "4", text: "Help choosing the right charger setup" },
    ],
    provideItems: [
      { id: "1", text: "Charger type preference" },
      { id: "2", text: "Panel location details" },
      { id: "3", text: "Installation location photos" },
    ],
    estimatedTime: "Takes about 3–5 minutes",
    estimatedTimeSubtitle: "Best for complete installation quotes",
    steps: [
      { id: "1", step: 1, label: "Contact details" },
      { id: "2", step: 2, label: "Charger & location info" },
      { id: "3", step: 3, label: "Photo upload" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "3": {
    subtitle:
      "Request a quote for replacing or upgrading your electrical panel safely.",
    bestForItems: [
      { id: "1", text: "Outdated electrical panels" },
      { id: "2", text: "Increasing service capacity" },
      { id: "3", text: "Replacing damaged panels" },
      { id: "4", text: "Preparing for home electrical upgrades" },
    ],
    provideItems: [
      { id: "1", text: "Current panel amperage" },
      { id: "2", text: "Upgrade goal if applicable" },
      { id: "3", text: "Meter photos" },
      { id: "4", text: "Panel photos" },
    ],
    estimatedTime: "Takes about 3–4 minutes",
    estimatedTimeSubtitle: "Helpful for upgrade planning",
    steps: [
      { id: "1", step: 1, label: "Service type" },
      { id: "2", step: 2, label: "Panel details" },
      { id: "3", step: 3, label: "Property electrical information" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "4": {
    subtitle:
      "Share your remodeling project and electrical needs for a customized quote.",
    bestForItems: [
      { id: "1", text: "Kitchen remodels" },
      { id: "2", text: "Bathroom remodels" },
      { id: "3", text: "Room renovations" },
      { id: "4", text: "Electrical updates during remodeling" },
    ],
    provideItems: [
      { id: "1", text: "Remodel area details" },
      { id: "2", text: "Electrical needs list" },
      { id: "3", text: "Plans or drawings if available" },
      { id: "4", text: "Existing space photo" },
    ],
    estimatedTime: "Takes about 3–5 minutes",
    estimatedTimeSubtitle: "Great for planned renovation projects",
    steps: [
      { id: "1", step: 1, label: "Remodel basics" },
      { id: "2", step: 2, label: "Electrical needs" },
      { id: "3", step: 3, label: "Plans & permit details" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "5": {
    subtitle:
      "Get a quote for adding electrical power to a shed, workshop, barn, or similar structure.",
    bestForItems: [
      { id: "1", text: "Sheds and outbuildings" },
      { id: "2", text: "Workshops and garages" },
      { id: "3", text: "Pole barns" },
      { id: "4", text: "New circuits, sub-panels, or service installs" },
    ],
    provideItems: [
      { id: "1", text: "Building size and use" },
      { id: "2", text: "Construction details" },
      { id: "3", text: "Route from house to building" },
      { id: "4", text: "Meter and panel photos" },
    ],
    estimatedTime: "Takes about 4–6 minutes",
    estimatedTimeSubtitle: "Best for detached structure power planning",
    steps: [
      { id: "1", step: 1, label: "Building basics" },
      { id: "2", step: 2, label: "Electrical needs" },
      { id: "3", step: 3, label: "Power type selection" },
      { id: "4", step: 4, label: "Route & utility information" },
      { id: "5", step: 5, label: "Review & submit" },
    ],
  },
  "6": {
    subtitle:
      "Request a quote for safe and code-compliant hot tub electrical installation.",
    bestForItems: [
      { id: "1", text: "New hot tub hookups" },
      { id: "2", text: "Disconnect or receptacle setup" },
      { id: "3", text: "Outdoor spa power planning" },
      { id: "4", text: "Dedicated hot tub circuits" },
    ],
    provideItems: [
      { id: "1", text: "Hot tub model details" },
      { id: "2", text: "Manual if available" },
      { id: "3", text: "Install location photo" },
      { id: "4", text: "Panel photo and distance estimate" },
    ],
    estimatedTime: "Takes about 3–4 minutes",
    estimatedTimeSubtitle: "Helpful for fast installation planning",
    steps: [
      { id: "1", step: 1, label: "Hot tub details" },
      { id: "2", step: 2, label: "Electrical needs" },
      { id: "3", step: 3, label: "Location & panel information" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "7": {
    subtitle:
      "Get a quote for electrical service to your dock, including lifts, receptacles, and lighting.",
    bestForItems: [
      { id: "1", text: "Boat lift power" },
      { id: "2", text: "Jet ski lift power" },
      { id: "3", text: "Dock lighting" },
      { id: "4", text: "Dock receptacles and circuits" },
    ],
    provideItems: [
      { id: "1", text: "Dock electrical needs" },
      { id: "2", text: "Receptacle count" },
      { id: "3", text: "Route from house to dock" },
      { id: "4", text: "Meter and panel photos" },
    ],
    estimatedTime: "Takes about 4–6 minutes",
    estimatedTimeSubtitle: "Best for detailed dock power requests",
    steps: [
      { id: "1", step: 1, label: "Dock details" },
      { id: "2", step: 2, label: "Power requirements" },
      { id: "3", step: 3, label: "Panel & route information" },
      { id: "4", step: 4, label: "Permit details" },
      { id: "5", step: 5, label: "Review & submit" },
    ],
  },
  "8": {
    subtitle:
      "Request an inspection quote for your home, building, or electrical service.",
    bestForItems: [
      { id: "1", text: "Whole house inspections" },
      { id: "2", text: "Partial home inspections" },
      { id: "3", text: "Accessory building inspections" },
      { id: "4", text: "Electrical service-only inspections" },
    ],
    provideItems: [
      { id: "1", text: "Inspection type" },
      { id: "2", text: "Building size or panel count" },
      { id: "3", text: "Panel photos if needed" },
      { id: "4", text: "Additional concerns" },
    ],
    estimatedTime: "Takes about 2–3 minutes",
    estimatedTimeSubtitle: "Simple inspection request process",
    steps: [
      { id: "1", step: 1, label: "Inspection type" },
      { id: "2", step: 2, label: "Property details" },
      { id: "3", step: 3, label: "Review & submit" },
    ],
  },
  "9": {
    subtitle:
      "Get a quote for portable or whole-home backup generator installation.",
    bestForItems: [
      { id: "1", text: "Portable generator hookups" },
      { id: "2", text: "Generator inlet setup" },
      { id: "3", text: "Backup panel solutions" },
      { id: "4", text: "Whole-home standby planning" },
    ],
    provideItems: [
      { id: "1", text: "Generator type" },
      { id: "2", text: "Backup preference" },
      { id: "3", text: "Inlet or install location photo" },
      { id: "4", text: "Panel and meter photos" },
    ],
    estimatedTime: "Takes about 4–5 minutes",
    estimatedTimeSubtitle: "Choose portable or standby options",
    steps: [
      { id: "1", step: 1, label: "Generator type" },
      { id: "2", step: 2, label: "Equipment details" },
      { id: "3", step: 3, label: "Backup setup" },
      { id: "4", step: 4, label: "Upload photos" },
      { id: "5", step: 5, label: "Review & submit" },
    ],
  },
  "10": {
    subtitle:
      "Start a quote for electrical work on a new construction project.",
    bestForItems: [
      { id: "1", text: "New homes" },
      { id: "2", text: "New additions" },
      { id: "3", text: "New building electrical planning" },
      { id: "4", text: "Early-stage project estimates" },
    ],
    provideItems: [
      { id: "1", text: "Project stage" },
      { id: "2", text: "Building plans if available" },
      { id: "3", text: "Basic construction status" },
    ],
    estimatedTime: "Takes about 2–3 minutes",
    estimatedTimeSubtitle: "Quick start for new build projects",
    steps: [
      { id: "1", step: 1, label: "Project status" },
      { id: "2", step: 2, label: "Upload plans" },
      { id: "3", step: 3, label: "Review & submit" },
    ],
  },
  "11": {
    subtitle:
      "Electrical support and wiring for residential and commercial solar installations.",
    bestForItems: [
      { id: "1", text: "Solar panel system wiring" },
      { id: "2", text: "Inverter and battery hookup" },
      { id: "3", text: "Net metering connection" },
      { id: "4", text: "Panel upgrade for solar" },
    ],
    provideItems: [
      { id: "1", text: "Solar system size and brand" },
      { id: "2", text: "Installer or project contact" },
      { id: "3", text: "Photos of roof and panel" },
    ],
    estimatedTime: "Takes about 4–5 minutes",
    estimatedTimeSubtitle: "System details help us prepare",
    steps: [
      { id: "1", step: 1, label: "Contact details" },
      { id: "2", step: 2, label: "Solar system info" },
      { id: "3", step: 3, label: "Photo upload" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "12": {
    subtitle:
      "Custom electrical solutions for unique or specialized project needs.",
    bestForItems: [
      { id: "1", text: "Unique or unusual requests" },
      { id: "2", text: "Special equipment wiring" },
      { id: "3", text: "Non-standard installations" },
      { id: "4", text: "Anything not listed above" },
    ],
    provideItems: [
      { id: "1", text: "Description of the project" },
      { id: "2", text: "Any relevant photos" },
      { id: "3", text: "Preferred timeline" },
    ],
    estimatedTime: "Takes about 3–5 minutes",
    estimatedTimeSubtitle: "More detail helps us assist you",
    steps: [
      { id: "1", step: 1, label: "Contact details" },
      { id: "2", step: 2, label: "Project description" },
      { id: "3", step: 3, label: "Photo upload" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
};

export default function ServiceDetails() {
  const selectedCategory = useSelector(
    (state: RootState) => state.categoryRoute.selectedCategory,
  );

  const detail = selectedCategory
    ? SERVICE_DETAIL_DATA[selectedCategory.id]
    : null;

  if (!selectedCategory || !detail) return null;

  return (
    <View style={{ flex: 1 }}>
      <ServiceDetailPage
        iconName={selectedCategory.iconName}
        iconColor={selectedCategory.iconColor}
        iconBg={selectedCategory.iconBg}
        title={selectedCategory.title}
        subtitle={detail.subtitle}
        bestForItems={detail.bestForItems}
        provideItems={detail.provideItems}
        estimatedTime={detail.estimatedTime}
        estimatedTimeSubtitle={detail.estimatedTimeSubtitle}
        steps={detail.steps}
      />
    </View>
  );
}
