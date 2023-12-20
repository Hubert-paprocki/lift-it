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
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import Button from "../ui/buttons/Buttons";

interface FormValues {
  weight: string;
}

interface WeightEntries {
  date: string;
  weight: number;
}

function BodyWeightTracker() {
  const newTheme = createTheme({ palette: { mode: "dark" } });
  const { user } = useUserContext();
  const [weightEntries, setWeightEntries] = useState<WeightEntries[]>([]);
  console.log(weightEntries);

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

  const onSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    if (!user) return;

    try {
      const weightValue = parseFloat(values.weight);
      const userDocRef = doc(db, "users", user.uid);
      const weightRecordcollectionRef = collection(userDocRef, "weightRecord");

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
      console.error("Error adding/updating weight entry to Firebase:", error);
    }
  };

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
    <div>
      <div className="">Body Weight Tracker</div>
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
      <p>
        Current Weight:{" "}
        {weightEntries.length > 0
          ? weightEntries[weightEntries.length - 1].weight
          : "loading"}{" "}
        kg
      </p>

      <Formik
        initialValues={{ weight: "" }}
        validate={(values) => {
          const errors: Partial<FormValues> = {};
          if (!values.weight) errors.weight = "Required";
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="number" name="weight" />
            <ErrorMessage name="weight" component="div" />
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default BodyWeightTracker;
