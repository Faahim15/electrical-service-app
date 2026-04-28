export interface TroubleshootingStep {
  id: number;
  title: string;
  description: string;
}

export interface TroubleshootingCategory {
  id: string;
  icon: "zap" | "shield";
  title: string;
  description: string;
  safetyWarning: string;
  steps: TroubleshootingStep[];
  stillHavingIssues: {
    title: string;
    subtitle: string;
  };
}

export const TROUBLESHOOTING_DATA: TroubleshootingCategory[] = [
  {
    id: "1",
    icon: "zap",
    title: "Reset GFCI Outlets",
    description: "Guide to reset a tripped GFCI outlet",
    safetyWarning:
      "Never work on electrical items with wet hands or while standing on a wet surface. If the outlet smells hot, shows sparks, or feels warm, stop and call our trained professionals.",
    steps: [
      {
        id: 1,
        title: "Identify the GFCI outlet",
        description: "Look for the outlet with TEST and RESET buttons",
      },
      {
        id: 2,
        title: "Unplug all devices",
        description: "Remove all plugs from the outlet",
      },
      {
        id: 3,
        title: "Press the RESET button",
        description: "Firmly press the RESET button until it clicks",
      },
      {
        id: 4,
        title: "Test the outlet",
        description: "Plug in a device to check if power is restored",
      },
      {
        id: 5,
        title: "Test the GFCI",
        description: "Press TEST button to ensure GFCI is working properly",
      },
      {
        id: 6,
        title: "Reset again if needed",
        description: "If it trips again, press RESET once more",
      },
    ],
    stillHavingIssues: {
      title: "Still Having Issues?",
      subtitle: "Contact us for professional service.",
    },
  },
  {
    id: "2",
    icon: "zap",
    title: "Reset Circuit Breaker",
    description: "Step-by-step breaker reset instructions",
    safetyWarning:
      "Never touch the panel with wet hands or while standing on a wet surface. If the breaker continues to trip immediately, there may be a serious electrical problem. Do not force a breaker or use excessive pressure.",
    steps: [
      {
        id: 1,
        title: "Locate your electrical panel",
        description: "Find your breaker box or electrical panel",
      },
      {
        id: 2,
        title: "Identify the tripped breaker",
        description: "Look for a breaker in the middle position or OFF",
      },
      {
        id: 3,
        title: "Unplug devices on that circuit",
        description: "Remove load from the circuit before resetting",
      },
      {
        id: 4,
        title: "Turn the breaker fully OFF",
        description: "Push the breaker all the way to the OFF position",
      },
      {
        id: 5,
        title: "Turn the breaker ON",
        description: "Firmly push the breaker to the ON position",
      },
      {
        id: 6,
        title: "Test and monitor",
        description: "Plug devices back in one at a time and monitor",
      },
    ],
    stillHavingIssues: {
      title: "Still Having Issues?",
      subtitle: "Contact us for professional service.",
    },
  },
  {
    id: "3",
    icon: "zap",
    title: "Outlet Not Working",
    description: "Diagnose and fix outlet issues",
    safetyWarning:
      "Never stick objects into outlets. Do not attempt repairs if you are not comfortable working with electricity. If you smell burning or see smoke, call us immediately.",
    steps: [
      {
        id: 1,
        title: "Check other outlets",
        description: "Test nearby outlets to see if they work",
      },
      {
        id: 2,
        title: "Check for tripped GFCI",
        description: "Look for GFCI outlets that may control this outlet",
      },
      {
        id: 3,
        title: "Check circuit breakers",
        description: "Inspect your breaker panel for tripped breakers",
      },
      {
        id: 4,
        title: "Reset if needed",
        description: "Reset any tripped GFCI outlets or breakers",
      },
      {
        id: 5,
        title: "Test with different device",
        description: "Try plugging in another device to confirm",
      },
      {
        id: 6,
        title: "Call for service",
        description: "If still not working, contact our trained professionals",
      },
    ],
    stillHavingIssues: {
      title: "Still Having Issues?",
      subtitle: "Contact us for professional service.",
    },
  },
];
