// import { GeneratorDetails } from "@/src/redux/types/serviceForm.types";
import { GeneratorDetails } from "@/src/types/serviceForm.types";
import React from "react";
import { ReviewPhotos } from "./ReviewPhotos";
import { ReviewRow } from "./ReviewRow";
import { ReviewSectionTitle } from "./ReviewSectionTitle";

export const GeneratorReview = ({ details }: { details: GeneratorDetails }) => (
  <>
    <ReviewSectionTitle title="Generator Type" />
    <ReviewRow label="Generator Type" value={details.generatorType} />

    {details.generatorType === "Portable" && (
      <>
        <ReviewSectionTitle title="Generator Ownership" />
        <ReviewRow label="Has Generator" value={details.hasGenerator} />
        {details.hasGenerator === "Yes" && (
          <>
            <ReviewRow label="kW Output" value={details.kwOutput} />
            <ReviewRow
              label="Backup Installation"
              value={details.backupInstallation}
            />
            <ReviewPhotos
              label="Generator Photos"
              photos={details.generatorPhotos}
            />
            <ReviewRow label="Panel Distance" value={details.panelDistance} />
            <ReviewRow label="Panel Location" value={details.panelLocation} />
          </>
        )}
        {details.hasGenerator === "No" && (
          <ReviewRow label="Purchase Size" value={details.purchaseSize} />
        )}
      </>
    )}

    {details.generatorType === "Whole Home Standby" && (
      <>
        <ReviewSectionTitle title="Backup Needs" />
        <ReviewRow
          label="Backed Up Circuits"
          value={details.backedUpCircuits}
        />
        <ReviewRow label="Has Propane" value={details.hasPropane} />
      </>
    )}

    <ReviewSectionTitle title="Photos" />
    <ReviewPhotos label="Panel Photos" photos={details.panelPhotos} />
    <ReviewPhotos
      label="Install Location Photos"
      photos={details.installLocationPhotos}
    />
  </>
);
