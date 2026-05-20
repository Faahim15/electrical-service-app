export interface CategoryData {
  titleofSub: string;
  bestForItems: string[];
  provideItems: string[];
  timeEstimate: {
    label: string;
    sublabel: string;
  };
  steps: {
    id: number;
    label: string;
  }[];
}

export const otherCategoryData: Record<string, CategoryData> = {
  "Whole Home Surge Protection": {
    titleofSub:
      "Request a quote for protecting your home's electrical system from surges.",

    bestForItems: [
      "Whole-home surge devices",
      "Panel-based surge protection",
      "Extra protection for electronics and appliances",
    ],
    provideItems: ["Panel photos", "Basic project notes"],
    timeEstimate: {
      label: "Takes about 1–2 minutes",
      sublabel: "Simple and quick protection request",
    },

    steps: [
      { id: 1, label: "Contact details" },
      { id: 2, label: "Upload panel photos" },
      { id: 3, label: "Add notes" },
      { id: 4, label: "Review & submit" },
    ],
  },

  "Starlink Installation": {
    titleofSub:
      "Get help planning electrical setup and installation support for your Starlink equipment.",
    bestForItems: [
      "Starlink dish setup",
      "Router placement planning",
      "Mounting preparation",
      "Room and route planning",
    ],
    provideItems: [
      "Equipment availability",
      "Dish install location",
      "Router room details",
      "Room and mounting photos",
    ],
    timeEstimate: {
      label: "Takes about 3–4 minutes",
      sublabel: "Helpful for install preparation",
    },
    steps: [
      { id: 1, label: "Contact details" },
      { id: 2, label: "Equipment details" },
      { id: 3, label: "Dish location" },
      { id: 4, label: "Router room info" },
      { id: 5, label: "Review & submit" },
    ],
  },

  "Dedicated Circuit": {
    titleofSub:
      "Request a dedicated circuit quote for equipment, appliances, or specialty power needs.",
    bestForItems: [
      "Freezers",
      "RV connections",
      "Tools or equipment",
      "Special dedicated outlets or loads",
    ],
    provideItems: [
      "Intended use",
      "Install location",
      "Panel location",
      "Path and panel photos",
    ],
    timeEstimate: {
      label: "Takes about 3–5 minutes",
      sublabel: "Best for custom dedicated circuit requests",
    },
    steps: [
      { id: 1, label: "Contact details" },
      { id: 2, label: "Circuit purpose" },
      { id: 3, label: "Install location" },
      { id: 4, label: "Electrical specs" },
      { id: 5, label: "Review & submit" },
    ],
  },

  "Exhaust Fan": {
    titleofSub:
      "Request a quote for attic, kitchen, or bathroom exhaust fan installation or replacement.",
    bestForItems: [
      "Bathroom fan replacement",
      "Kitchen exhaust upgrades",
      "Attic ventilation fans",
      "Specialty fan controls",
    ],
    provideItems: [
      "Fan location",
      "New or replacement info",
      "Duct or vent details if known",
      "Panel photo if required",
    ],
    timeEstimate: {
      label: "Takes about 3–5 minutes",
      sublabel: "Quick fan installation request",
    },
    steps: [
      { id: 1, label: "Contact details" },
      { id: 2, label: "Fan type & location" },
      { id: 3, label: "Project details" },
      { id: 4, label: "Panel info" },
      { id: 5, label: "Review & submit" },
    ],
  },

  Outlets: {
    titleofSub:
      "Request a quote for installing or replacing electrical outlets.",
    bestForItems: [
      "New outlet installation",
      "Replacing old outlets",
      "Specialty outlet types",
      "GFI or surge-protected outlets",
    ],
    provideItems: [
      "Intended use",
      "New or replacement details",
      "Outlet type",
      "Photos if applicable",
    ],
    timeEstimate: {
      label: "Takes about 2–4 minutes",
      sublabel: "Simple and flexible outlet request",
    },
    steps: [
      { id: 1, label: "Contact details" },
      { id: 2, label: "Outlet purpose" },
      { id: 3, label: "Install type" },
      { id: 4, label: "Electrical details" },
      { id: 5, label: "Review & submit" },
    ],
  },

  Switches: {
    titleofSub:
      "Request a quote for installing or replacing switches in your home or project area.",
    bestForItems: [
      "New switch installs",
      "Replacing old switches",
      "Smart or dimmer switches",
      "Motion and timer controls",
    ],
    provideItems: [
      "Switch quantity",
      "New or replacement details",
      "Current switch photos if needed",
      "Preferred switch type",
    ],
    timeEstimate: {
      label: "Takes about 2–3 minutes",
      sublabel: "Quick switch upgrade request",
    },
    steps: [
      { id: 1, label: "Contact details" },
      { id: 2, label: "Quantity & type" },
      { id: 3, label: "Upload photos" },
      { id: 4, label: "Project timing" },
      { id: 5, label: "Review & submit" },
    ],
  },

  Lighting: {
    titleofSub:
      "Request a quote for interior or exterior lighting installation or replacement.",
    bestForItems: [
      "Interior fixtures",
      "Exterior lights",
      "Flood lights",
      "Coach lights, driveway lights, and more",
    ],
    provideItems: [
      "Lighting type",
      "Fixture details",
      "Photos of area or existing lights",
      "Switch preferences",
    ],
    timeEstimate: {
      label: "Takes about 3–5 minutes",
      sublabel: "Covers both indoor and outdoor lighting",
    },
    steps: [
      { id: 1, label: "Contact details" },
      { id: 2, label: "Lighting category" },
      { id: 3, label: "Fixture details" },
      { id: 4, label: "Install type" },
      { id: 5, label: "Switch setup" },
      { id: 6, label: "Review & submit" },
    ],
  },

  "Ceiling Fan": {
    titleofSub: "Request a quote for ceiling fan installation or replacement.",
    bestForItems: [
      "Replacing old ceiling fans",
      "New fan installation",
      "Smart or upgraded controls",
      "Rooms with existing or new switch setups",
    ],
    provideItems: [
      "New or replacement details",
      "Ceiling height",
      "Fan model or preferences",
      "Photos of current fan if applicable",
    ],
    timeEstimate: {
      label: "Takes about 3–4 minutes",
      sublabel: "Easy ceiling fan quote process",
    },
    steps: [
      { id: 1, label: "Contact details" },
      { id: 2, label: "Install type" },
      { id: 3, label: "Fan details" },
      { id: 4, label: "Switch setup" },
      { id: 5, label: "Review & submit" },
    ],
  },
};

export const getCategoryData = (title?: string): CategoryData => {
  if (!title) {
    return {
      titleofSub: "",
      bestForItems: [],
      provideItems: [],
      timeEstimate: { label: "Takes a few minutes", sublabel: "" },
      steps: [],
    };
  }
  return (
    otherCategoryData[title] ?? {
      titleofSub: "",
      bestForItems: [],
      provideItems: [],
      timeEstimate: { label: "Takes a few minutes", sublabel: "" },
      steps: [],
    }
  );
};
