import React from "react";
import { ReviewPhotos } from "./ReviewPhotos";
import { ReviewRow } from "./ReviewRow";
import { ReviewSectionTitle } from "./ReviewSectionTitle";

interface AccessoryBuildingDetails {
  squareFootage: string;
  intendedUse: string;
  buildingStatus: string;
  constructionType: string;
  floorType: string;
  electricalNeeds: string;
  hasHeatingCooling: string;
  serviceType: string;
  newServiceSize: string;
  subPanelSize: string;
  circuitCount: string;
  ampRating: string;
  panelLocation: string;
  panelPhotos: string[];
  privateUtilities: string;
  routeDistance: string;
  existingSpacePhotos: string[];
  hasPlans: "Yes" | "No" | "";
  planDrawingPhotos: string[];
  hasPermit: "Yes" | "No" | "";
  permitNumber: string;
  additionalInfo: string;
}

export const AccessoryBuildingReview = ({
  details,
}: {
  details: AccessoryBuildingDetails;
}) => (
  <>
    <ReviewSectionTitle title="Building Basics" />
    <ReviewRow label="Square Footage" value={details.squareFootage} />
    <ReviewRow label="Intended Use" value={details.intendedUse} />

    <ReviewSectionTitle title="Construction Details" />
    <ReviewRow label="Building Status" value={details.buildingStatus} />
    <ReviewRow label="Construction Type" value={details.constructionType} />
    <ReviewRow label="Floor Type" value={details.floorType} />

    <ReviewSectionTitle title="Electrical Needs" />
    <ReviewRow label="Electrical Needs" value={details.electricalNeeds} />
    <ReviewRow label="Heating / Cooling" value={details.hasHeatingCooling} />

    <ReviewSectionTitle title="Service Type" />
    <ReviewRow label="Service Type" value={details.serviceType} />
    {details.serviceType === "New Service" && (
      <ReviewRow label="Service Size" value={details.newServiceSize} />
    )}
    {details.serviceType === "Sub-panel" && (
      <ReviewRow label="Sub-panel Size" value={details.subPanelSize} />
    )}
    {details.serviceType === "1-2 dedicated circuits" && (
      <>
        <ReviewRow label="Circuit Count" value={details.circuitCount} />
        <ReviewRow label="Amp Rating" value={details.ampRating} />
      </>
    )}
    <ReviewRow label="Panel Location" value={details.panelLocation} />
    <ReviewPhotos label="Panel Photos" photos={details.panelPhotos} />

    <ReviewSectionTitle title="Route Details" />
    <ReviewRow label="Private Utilities" value={details.privateUtilities} />
    <ReviewRow label="Route Distance" value={details.routeDistance} />
    <ReviewPhotos
      label="Existing Space Photos"
      photos={details.existingSpacePhotos}
    />

    <ReviewSectionTitle title="Plans & Permit" />
    <ReviewRow label="Has Plans" value={details.hasPlans} />
    {details.hasPlans === "Yes" && (
      <ReviewPhotos label="Plan Drawings" photos={details.planDrawingPhotos} />
    )}
    <ReviewRow label="Has Permit" value={details.hasPermit} />
    {details.hasPermit === "Yes" && (
      <ReviewRow label="Permit Number" value={details.permitNumber} />
    )}
    <ReviewRow label="Additional Info" value={details.additionalInfo} />
  </>
);
