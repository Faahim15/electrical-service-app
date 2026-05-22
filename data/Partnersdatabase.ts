// ============================================================
// Partner Categories & Partners Database
// Source: Four Elements Electric – Partner Directory
// ============================================================

export type Category =
  | "Accessory Building / Structure"
  | "Automotive"
  | "Excavation"
  | "Gas"
  | "Graphic Design / Printing"
  | "Home Builders"
  | "Home Improvement"
  | "HVAC"
  | "Painting"
  | "Plumbing"
  | "Property Management"
  | "Septic"
  | "Solar";

export interface Partner {
  id: string; // unique slug
  name: string;
  category: Category;
  shortDescription: string; // one-liner shown on detail screen
  tagline: string; // category page blurb
  trustedPartnerVerified: true; // all partners carry this badge
  contact: {
    phone?: string;
    website?: string;
  };
  whyWeRecommendThem: [string, string, string]; // always exactly 3 bullets
}

export interface PartnerCategory {
  name: Category;
  description: string; // "Contact our trusted partners for your X needs."
  partnerCount: number;
}

// ─────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────
export const partnerCategories: PartnerCategory[] = [
  {
    name: "Accessory Building / Structure",
    description:
      "Contact our trusted partners for your accessory building/structure needs.",
    partnerCount: 2,
  },
  {
    name: "Automotive",
    description: "Contact our trusted partners for your Automotive needs.",
    partnerCount: 3,
  },
  {
    name: "Excavation",
    description: "Contact our trusted partners for your Excavation needs.",
    partnerCount: 1,
  },
  {
    name: "Gas",
    description: "Contact our trusted partners for your Gas needs.",
    partnerCount: 2,
  },
  {
    name: "Graphic Design / Printing",
    description:
      "Contact our trusted partners for your graphic design/printing needs",
    partnerCount: 2,
  },
  {
    name: "Home Builders",
    description:
      "Contact our trusted partners for your new home building needs.",
    partnerCount: 2,
  },
  {
    name: "Home Improvement",
    description:
      "Contact our trusted partners for your home improvement needs.",
    partnerCount: 5,
  },
  {
    name: "HVAC",
    description: "Contact our trusted partners for your HVAC needs.",
    partnerCount: 2,
  },
  {
    name: "Painting",
    description: "Contact our trusted partners for your painting needs.",
    partnerCount: 1,
  },
  {
    name: "Plumbing",
    description: "Contact our trusted partners for your plumbing needs.",
    partnerCount: 2,
  },
  {
    name: "Property Management",
    description:
      "Contact our trusted partners for your property management needs.",
    partnerCount: 2,
  },
  {
    name: "Septic",
    description: "Contact our trusted partners for your Septic needs.",
    partnerCount: 1,
  },
  {
    name: "Solar",
    description: "Contact our trusted partners for your solar needs ",
    partnerCount: 1,
  },
];

// ─────────────────────────────────────────────────────────────
// PARTNERS
// ─────────────────────────────────────────────────────────────
export const partners: Partner[] = [
  // ── ACCESSORY BUILDING / STRUCTURE ──────────────────────────
  {
    id: "jsm-industrial",
    name: "JSM INDUSTRIAL",
    category: "Accessory Building / Structure",
    shortDescription: "Accessory building and structure services",
    tagline: "Accessory Building / Structure",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 446-8919",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
  {
    id: "superior-building",
    name: "Superior Building",
    category: "Accessory Building / Structure",
    shortDescription: "Professional building solutions",
    tagline: "Accessory Building / Structure",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 269-2696",
      website: "superiorbuildings.net",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },

  // ── AUTOMOTIVE ───────────────────────────────────────────────
  {
    id: "cs-auto",
    name: "C&S Auto",
    category: "Automotive",
    shortDescription: "Automotive repair and maintenance",
    tagline: "Automotive",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 775-2900",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
  {
    id: "carrolls-automotive",
    name: "Carroll's Automotive",
    category: "Automotive",
    shortDescription: "Complete automotive services",
    tagline: "Automotive",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 663-3331",
      website: "carrollsautomotive.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
  {
    id: "my-tire-guy",
    name: "My Tire Guy",
    category: "Automotive",
    shortDescription: "Tire sales and services",
    tagline: "Automotive",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 775-4050",
      website: "mytireguykg.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },

  // ── EXCAVATION ───────────────────────────────────────────────
  {
    id: "James F Mullen",
    name: "James F Mullen",
    category: "Excavation",
    shortDescription: "Excavation and site preparation",
    tagline: "Excavation",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 663-3585",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },

  // ── GAS ──────────────────────────────────────────────────────
  {
    id: "blossman-gas",
    name: "Blossman Gas",
    category: "Gas",
    shortDescription: "Natural gas services",
    tagline: "Gas",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 548-0254",
      website: "blossmangas.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
  {
    id: "d-and-d-gas-services",
    name: "D&D Gas Services",
    category: "Gas",
    shortDescription: "Gas line installation and repair",
    tagline: "Gas",
    trustedPartnerVerified: true,
    contact: {
      phone: "(804) 224-2552",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },

  // ── GRAPHIC DESIGN / PRINTING ────────────────────────────────
  {
    id: "american-printing-and-signs",
    name: "American Printing and Signs",
    category: "Graphic Design / Printing",
    shortDescription: "Professional printing services",
    tagline: "Graphic Design / Printing",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 775-7446",
      website: "printingva.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
  {
    id: "signworks",
    name: "SignWorks",
    category: "Graphic Design / Printing",
    shortDescription: "Sign design and fabrication",
    tagline: "Graphic Design / Printing",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 775-3117",
      website: "lr-signs.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },

  // ── HOME BUILDERS ────────────────────────────────────────────
  {
    id: "gray-construction",
    name: "Gray Construction",
    category: "Home Builders",
    shortDescription: "Custom home construction",
    tagline: "Home Builders",
    trustedPartnerVerified: true,
    contact: {
      phone: "(804) 214-9108",
      website: "grayconstructioninc.net",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
  {
    id: "weston-homes-inc",
    name: "Weston Homes, Inc.",
    category: "Home Builders",
    shortDescription: "Residential construction experts",
    tagline: "Home Builders",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 775-5680",
      website: "westonhomesinc.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },

  // ── HOME IMPROVEMENT ─────────────────────────────────────────
  {
    id: "handy-girl-home-improvements",
    name: "Handy Girl Home Improvements",
    category: "Home Improvement",
    shortDescription: "General home improvement",
    tagline: "Home Improvement",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 771-4582",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
  {
    id: "integrity-construction",
    name: "Integrity Construction",
    category: "Home Improvement",
    shortDescription: "Quality home improvements",
    tagline: "Home Improvement",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 254-4663",
      website: "integrityconstructionva.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
  {
    id: "potomac-kitchen-design",
    name: "Potomac Kitchen Design",
    category: "Home Improvement",
    shortDescription: "Kitchen design and remodeling",
    tagline: "Home Improvement",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 775-4211",
      website: "potomacdesigns.org",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
  {
    id: "rnr-contracting",
    name: "RNR Contracting",
    category: "Home Improvement",
    shortDescription: "Full-service contracting",
    tagline: "Home Improvement",
    trustedPartnerVerified: true,
    contact: {
      phone: "(703) 930-5099",
      website: "rnrcontractinginc.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
  {
    id: "southern-home-improvement",
    name: "Southern Home Improvement",
    category: "Home Improvement",
    shortDescription: "Home improvement specialists",
    tagline: "Home Improvement",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 775-7933",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },

  // ── HVAC ─────────────────────────────────────────────────────
  {
    id: "king-george-mechanical-hvac",
    name: "King George Mechanical",
    category: "HVAC",
    shortDescription: "Heating and air conditioning",
    tagline: "HVAC",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 663-3509",
      website: "kgmheatingandair.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
  {
    id: "rk-payne-inc",
    name: "R.K. Payne, Inc.",
    category: "HVAC",
    shortDescription: "HVAC installation and service",
    tagline: "HVAC",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 709-5009",
      website: "rkpaynehvac.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },

  // ── PAINTING ─────────────────────────────────────────────────
  {
    id: "all-the-way-painting-llc",
    name: "All The Way Painting, LLC",
    category: "Painting",
    shortDescription: "Interior and exterior painting",
    tagline: "Painting",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 645-2292",
      website: "allthewaypaintingllc.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },

  // ── PLUMBING ─────────────────────────────────────────────────
  {
    id: "cusicks-plumbing",
    name: "Cusick's Plumbing",
    category: "Plumbing",
    shortDescription: "Professional plumbing services",
    tagline: "Plumbing",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 413-6575",
      website: "cusicksplumbing.weebly.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
  {
    id: "sure-flow-plumbing",
    name: "Sure Flow Plumbing",
    category: "Plumbing",
    shortDescription: "Reliable plumbing solutions",
    tagline: "Plumbing",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 295-3771",
      website: "sureflowplumbingkg.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },

  // ── PROPERTY MANAGEMENT ──────────────────────────────────────
  {
    id: "angstadt-property-management",
    name: "Angstadt Property Management",
    category: "Property Management",
    shortDescription: "Property management services",
    tagline: "Property Management",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 322-3004",
      website: "rentalhomesinvirginia.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
  {
    id: "realty-management-group",
    name: "Realty Management Group",
    category: "Property Management",
    shortDescription: "Professional property management",
    tagline: "Property Management",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 709-1011",
      website: "realtymg.managebuilding.com/Resident/public/home",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },

  // ── SEPTIC ───────────────────────────────────────────────────
  {
    id: "patriot-septic-and-water-works",
    name: "Patriot Septic and Water Works",
    category: "Septic",
    shortDescription: "Septic system services",
    tagline: "Septic",
    trustedPartnerVerified: true,
    contact: {
      phone: "(540) 695-4019",
      website: "patriotsepticandwater.com",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },

  // ── SOLAR ────────────────────────────────────────────────────
  {
    id: "ovanova",
    name: "Ovanova",
    category: "Solar",
    shortDescription: "Solar energy solutions",
    tagline: "Solar",
    trustedPartnerVerified: true,
    contact: {
      phone: "(910) 250-9973",
      website: "ovanova.co",
    },
    whyWeRecommendThem: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// HELPER UTILITIES
// ─────────────────────────────────────────────────────────────

/** Return all partners belonging to a given category */
export function getPartnersByCategory(category: Category): Partner[] {
  return partners.filter((p) => p.category === category);
}

/** Return a single partner by its unique id */
export function getPartnerById(id: string): Partner | undefined {
  return partners.find((p) => p.id === id);
}

/** Return a summary count of partners per category */
export function getCategorySummary(): Record<Category, number> {
  return partners.reduce(
    (acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
      return acc;
    },
    {} as Record<Category, number>,
  );
}

// ─────────────────────────────────────────────────────────────
// TOTALS (for quick reference)
// ─────────────────────────────────────────────────────────────
// Categories : 13
// Total Partners: 26
//
//  Accessory Building / Structure  →  2  (JSM Industrial, Superior Building)
//  Automotive                      →  3  (C&S Auto, Carroll's Automotive, My Tire Guy)
//  Excavation                      →  1  (James F Mullen Excavation)
//  Gas                             →  2  (Blossman Gas, D&D Gas Services)
//  Graphic Design / Printing       →  2  (American Printing and Signs, SignWorks)
//  Home Builders                   →  2  (Gray Construction, Weston Homes Inc.)
//  Home Improvement                →  5  (Handy Girl, Integrity Construction,
//                                         Potomac Kitchen Design, RNR Contracting,
//                                         Southern Home Improvement)
//  HVAC                            →  2  (King George Mechanical, R.K. Payne Inc.)
//  Painting                        →  1  (All The Way Painting LLC)
//  Plumbing                        →  2  (Cusick's Plumbing, Sure Flow Plumbing)
//  Property Management             →  2  (Angstadt, Realty Management Group)
//  Septic                          →  1  (Patriot Septic and Water Works)
//  Solar                           →  1  (Ovanova)
// ─────────────────────────────────────────────────────────────
