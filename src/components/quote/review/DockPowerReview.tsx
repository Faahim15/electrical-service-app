import { DockPowerDetails } from "@/src/types/serviceForm.types";
import React from "react";
import { ReviewPhotos } from "./ReviewPhotos";
import { ReviewRow } from "./ReviewRow";
import { ReviewSectionTitle } from "./ReviewSectionTitle";

export const DockPowerReview = ({ details }: { details: DockPowerDetails }) => (
  <>
    <ReviewSectionTitle title="Dock Basics" />
    <ReviewRow label="Dock Built" value={details.dockBuilt} />
    <ReviewRow label="Electrical Needs" value={details.electricalNeeds} />
    <ReviewRow label="Receptacle Count" value={details.receptacleCount} />

    <ReviewSectionTitle title="Power Requirements" />
    <ReviewRow label="Service Type" value={details.serviceType} />
    {details.serviceType === "New service" && (
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
