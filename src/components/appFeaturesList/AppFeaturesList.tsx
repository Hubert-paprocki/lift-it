import React from "react";
import AppFeaturesItem from "./AppFeaturesItem";
import styles from "./AppFeaturesListStyle.module.scss";
export interface Feature {
  featureName: string;
  featurePicture: string;
  featureDesc: string;
}

function AppFeaturesList() {
  const appFeatureList: Feature[] = [
    {
      featureName: "Lift Weight Tracker",
      featurePicture: "liftingWeightProgress.png",
      featureDesc:
        "Record your weights, reps per exercise, and showcase your lifting achievements.",
    },
    {
      featureName: "Lift Plan",
      featurePicture: "liftPlan.png",
      featureDesc: "Never wonder 'what's next?' with a saved workout plan.",
    },
    {
      featureName: "Water Counter",
      featurePicture: "water.png",
      featureDesc: "Stay hydrated by keeping track of your daily water intake.",
    },
    {
      featureName: "Body Weight Progress",
      featurePicture: "bodyWeightProgress.png",
      featureDesc:
        "Monitor your weight to assess the effectiveness of your diet.",
    },
  ];

  return (
    <ul className={styles.appFeatureList}>
      {appFeatureList.map((feature, index) => (
        <AppFeaturesItem
          key={index}
          featureName={feature.featureName}
          featurePicture={feature.featurePicture}
          featureDesc={feature.featureDesc}
        />
      ))}
    </ul>
  );
}

export default AppFeaturesList;
