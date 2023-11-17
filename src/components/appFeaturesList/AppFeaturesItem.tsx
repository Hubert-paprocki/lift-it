import React from "react";
import Image from "next/image";
import styles from "./AppFeaturesListStyle.module.scss";
import { Feature } from "./AppFeaturesList";
function AppFeaturesItem({
  featureName,
  featurePicture,
  featureDesc,
}: Feature) {
  return (
    <li className={styles.appFeatureItem}>
      <h4 className={styles.appFeatureItemTitle}>{featureName}</h4>

      <figure className={styles.appFeatureItemPictureWrapper}>
        <Image
          src={`/images/${featurePicture}`}
          fill
          alt={`${featureName} app thumbnail`}
        />
        <figcaption className={styles.appFeatureItemDesc}>
          <span className={styles.appFeatureItemDescSpan}>{featureDesc}</span>
        </figcaption>
      </figure>
    </li>
  );
}

export default AppFeaturesItem;
