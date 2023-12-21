"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import {
  addDoc,
  doc,
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  where,
} from "firebase/firestore";
import { LineChart } from "@mui/x-charts/LineChart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useUserContext } from "@/context/UserContext";
import { FormikHelpers } from "formik";
import styles from "./BodyWeightTracker.module.scss";
import FormComponent from "../form/Form";
import { FormValues } from "../form/Form";
interface WeightEntries {
  date: string;
  weight: number;
}

function BodyWeightTracker() {
  const newTheme = createTheme({ palette: { mode: "dark" } });
  const { user } = useUserContext();
  const [weightEntries, setWeightEntries] = useState<WeightEntries[]>([]);

  const fetchData = async () => {
    if (!user) return;

    try {
      const weightRecordcollectionRef = collection(
        doc(db, "users", user.uid),
        "weightRecord"
      );
      const weightQuery = query(
        weightRecordcollectionRef,
        orderBy("date", "asc")
      );
      const snapshot = await getDocs(weightQuery);

      const entries = snapshot.docs.map((doc) => ({
        date: doc.data().date,
        weight: doc.data().weight,
      }));

      setWeightEntries(entries);
    } catch (error) {
      console.error("Error fetching weight data from Firebase:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const config = {
    series: [
      {
        data: weightEntries.map((entry) => entry.weight),
        label: "Weight (kg)",
        color: "rgb(219, 215, 233)",
      },
    ],
    height: 300,
    bottomAxis: "bottomAxis",
  };

  return (
    <div className={styles.weightTrackerBox}>
      <ThemeProvider theme={newTheme}>
        <LineChart
          xAxis={[
            {
              data: weightEntries.map((entry) => entry.date),
              id: "bottomAxis",
              scaleType: "point",
            },
          ]}
          {...config}
        />
      </ThemeProvider>

      <FormComponent
        inputs={[
          {
            name: "weight",
            type: "number",
            id: "weight",
            initialValue: "",
          },
        ]}
        labelMsg={`Weight: ${
          weightEntries.length > 0
            ? `${weightEntries[weightEntries.length - 1].weight}KG`
            : "loading"
        }`}
        btnText={"Add Weight"}
        onSubmit={async (
          values: FormValues,
          { resetForm }: FormikHelpers<FormValues>
        ) => {
          if (!user) return;

          try {
            const weightValue = parseFloat(values.weight);
            const userDocRef = doc(db, "users", user.uid);
            const weightRecordcollectionRef = collection(
              userDocRef,
              "weightRecord"
            );

            const currentDate = new Date().toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            const existingRecordQuery = query(
              weightRecordcollectionRef,
              where("date", "==", currentDate)
            );
            const existingRecordSnapshot = await getDocs(existingRecordQuery);

            if (existingRecordSnapshot.size > 0) {
              const existingRecordDoc = existingRecordSnapshot.docs[0];
              await updateDoc(existingRecordDoc.ref, {
                weight: weightValue,
              });
            } else {
              await addDoc(weightRecordcollectionRef, {
                weight: weightValue,
                date: currentDate,
              });
            }

            fetchData();

            resetForm();
          } catch (error) {
            console.error(
              "Error adding/updating weight entry to Firebase:",
              error
            );
          }
        }}
      />
    </div>
  );
}

export default BodyWeightTracker;
