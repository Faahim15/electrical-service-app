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
      "Professional EV charger installation with safe wiring and code compliance.",
    bestForItems: [
      { id: "1", text: "Level 2 home charger setup" },
      { id: "2", text: "Garage or driveway wiring" },
      { id: "3", text: "Panel capacity check" },
      { id: "4", text: "Permit and inspection ready" },
    ],
    provideItems: [
      { id: "1", text: "EV charger model or brand" },
      { id: "2", text: "Desired installation location" },
      { id: "3", text: "Photos of garage and panel" },
    ],
    estimatedTime: "Takes about 3–4 minutes",
    estimatedTimeSubtitle: "A few details needed",
    steps: [
      { id: "1", step: 1, label: "Contact details" },
      { id: "2", step: 2, label: "Charger & location info" },
      { id: "3", step: 3, label: "Photo upload" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "3": {
    subtitle:
      "Upgrade your electrical panel for safer, stronger, and modern power delivery.",
    bestForItems: [
      { id: "1", text: "Outdated or undersized panels" },
      { id: "2", text: "Frequent breaker trips" },
      { id: "3", text: "Adding new circuits" },
      { id: "4", text: "Home sale preparation" },
    ],
    provideItems: [
      { id: "1", text: "Current panel brand and amperage" },
      { id: "2", text: "Photos of existing panel" },
      { id: "3", text: "Reason for upgrade" },
    ],
    estimatedTime: "Takes about 3–5 minutes",
    estimatedTimeSubtitle: "More detail helps us quote better",
    steps: [
      { id: "1", step: 1, label: "Contact details" },
      { id: "2", step: 2, label: "Panel information" },
      { id: "3", step: 3, label: "Photo upload" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "4": {
    subtitle:
      "Electrical work tailored for home remodel and renovation projects.",
    bestForItems: [
      { id: "1", text: "Kitchen or bathroom remodels" },
      { id: "2", text: "Adding outlets or lighting" },
      { id: "3", text: "Relocating electrical fixtures" },
      { id: "4", text: "Open wall wiring work" },
    ],
    provideItems: [
      { id: "1", text: "Scope of remodel work" },
      { id: "2", text: "Rooms or areas involved" },
      { id: "3", text: "Photos of current layout" },
    ],
    estimatedTime: "Takes about 4–5 minutes",
    estimatedTimeSubtitle: "Project details help us plan",
    steps: [
      { id: "1", step: 1, label: "Contact details" },
      { id: "2", step: 2, label: "Remodel scope" },
      { id: "3", step: 3, label: "Photo upload" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "5": {
    subtitle:
      "Run power to your shed, garage, or any detached accessory building.",
    bestForItems: [
      { id: "1", text: "Detached garages or workshops" },
      { id: "2", text: "Backyard sheds or studios" },
      { id: "3", text: "Outdoor lighting circuits" },
      { id: "4", text: "Subpanel installation" },
    ],
    provideItems: [
      { id: "1", text: "Distance from main panel" },
      { id: "2", text: "Intended use of the building" },
      { id: "3", text: "Photos of the structure" },
    ],
    estimatedTime: "Takes about 3–4 minutes",
    estimatedTimeSubtitle: "Distance and use details help",
    steps: [
      { id: "1", step: 1, label: "Contact details" },
      { id: "2", step: 2, label: "Building information" },
      { id: "3", step: 3, label: "Photo upload" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "6": {
    subtitle:
      "Safe and code-compliant electrical setup for hot tubs and swim spas.",
    bestForItems: [
      { id: "1", text: "New hot tub installation" },
      { id: "2", text: "GFCI and disconnect requirements" },
      { id: "3", text: "Dedicated circuit setup" },
      { id: "4", text: "Permit-ready installation" },
    ],
    provideItems: [
      { id: "1", text: "Hot tub brand and voltage specs" },
      { id: "2", text: "Planned location photos" },
      { id: "3", text: "Distance from main panel" },
    ],
    estimatedTime: "Takes about 3–4 minutes",
    estimatedTimeSubtitle: "Specs help us size correctly",
    steps: [
      { id: "1", step: 1, label: "Contact details" },
      { id: "2", step: 2, label: "Hot tub specs & location" },
      { id: "3", step: 3, label: "Photo upload" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "7": {
    subtitle:
      "Reliable power solutions for docks, boat lifts, and waterfront properties.",
    bestForItems: [
      { id: "1", text: "Dock lighting and outlets" },
      { id: "2", text: "Boat lift power supply" },
      { id: "3", text: "Shore power connections" },
      { id: "4", text: "GFCI waterfront protection" },
    ],
    provideItems: [
      { id: "1", text: "Dock layout or photos" },
      { id: "2", text: "Power needs and equipment" },
      { id: "3", text: "Distance from main panel" },
    ],
    estimatedTime: "Takes about 3–4 minutes",
    estimatedTimeSubtitle: "Waterfront details are important",
    steps: [
      { id: "1", step: 1, label: "Contact details" },
      { id: "2", step: 2, label: "Dock & power info" },
      { id: "3", step: 3, label: "Photo upload" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "8": {
    subtitle:
      "Thorough electrical inspection to ensure your system is safe and up to code.",
    bestForItems: [
      { id: "1", text: "Home purchase inspections" },
      { id: "2", text: "Insurance requirement checks" },
      { id: "3", text: "Older home safety review" },
      { id: "4", text: "Pre-sale electrical clearance" },
    ],
    provideItems: [
      { id: "1", text: "Age and type of property" },
      { id: "2", text: "Reason for inspection" },
      { id: "3", text: "Any known issues or concerns" },
    ],
    estimatedTime: "Takes about 2–3 minutes",
    estimatedTimeSubtitle: "Quick and straightforward",
    steps: [
      { id: "1", step: 1, label: "Contact details" },
      { id: "2", step: 2, label: "Property information" },
      { id: "3", step: 3, label: "Concerns or notes" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "9": {
    subtitle:
      "Backup power generator installation for homes and commercial buildings.",
    bestForItems: [
      { id: "1", text: "Whole-home standby generators" },
      { id: "2", text: "Transfer switch installation" },
      { id: "3", text: "Portable generator hookup" },
      { id: "4", text: "Power outage preparedness" },
    ],
    provideItems: [
      { id: "1", text: "Generator brand and model" },
      { id: "2", text: "Fuel type (gas, propane, etc.)" },
      { id: "3", text: "Photos of install area" },
    ],
    estimatedTime: "Takes about 4–5 minutes",
    estimatedTimeSubtitle: "Generator specs are needed",
    steps: [
      { id: "1", step: 1, label: "Contact details" },
      { id: "2", step: 2, label: "Generator information" },
      { id: "3", step: 3, label: "Photo upload" },
      { id: "4", step: 4, label: "Review & submit" },
    ],
  },
  "10": {
    subtitle:
      "Complete electrical installation for new home and commercial construction projects.",
    bestForItems: [
      { id: "1", text: "Rough-in wiring for new builds" },
      { id: "2", text: "Panel and meter installation" },
      { id: "3", text: "Trim-out and fixture hookup" },
      { id: "4", text: "Code inspection coordination" },
    ],
    provideItems: [
      { id: "1", text: "Building plans or blueprints" },
      { id: "2", text: "Project timeline and stage" },
      { id: "3", text: "Contractor or builder contact" },
    ],
    estimatedTime: "Takes about 5–6 minutes",
    estimatedTimeSubtitle: "More detail ensures accurate quote",
    steps: [
      { id: "1", step: 1, label: "Contact details" },
      { id: "2", step: 2, label: "Construction details" },
      { id: "3", step: 3, label: "Plans or photos" },
      { id: "4", step: 4, label: "Review & submit" },
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
