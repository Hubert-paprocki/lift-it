"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import {
  doc,
  updateDoc,
  collection,
  addDoc,
  where,
  query,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useUserContext } from "@/context/UserContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Button from "../ui/buttons/Buttons";

function WaterCounter() {
  const { user } = useUserContext();
  const [waterDrinkenToday, setWaterDrinkenToday] = useState<number | null>(
    null
  );

  const currentDate = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const fetchWaterDrinkenToday = async () => {
    if (!user) return;
    const waterDrinkenTodayRef = collection(
      db,
      "users",
      user.uid,
      "waterDrinkenToday"
    );

    try {
      const querySnapshot = await getDocs(
        query(waterDrinkenTodayRef, where("date", "==", currentDate))
      );

      if (!querySnapshot.empty) {
        setWaterDrinkenToday(querySnapshot.docs[0].data().waterValue || 0);
      } else {
        setWaterDrinkenToday(0);
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };

  useEffect(() => {
    fetchWaterDrinkenToday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const deleteOutdatedDocument = async () => {
    if (!user) return;

    const waterDrinkenTodayRef = collection(
      db,
      "users",
      user.uid,
      "waterDrinkenToday"
    );

    try {
      const outdatedRecordQuery = query(
        waterDrinkenTodayRef,
        where("date", "!=", currentDate)
      );

      const outdatedRecordSnapshot = await getDocs(outdatedRecordQuery);

      outdatedRecordSnapshot.docs.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error("Error deleting outdated document: ", error);
    }
  };

  const onSubmit = async (values: { water: number }, formikHelpers: any) => {
    if (!user) return;

    try {
      const waterVal = values.water;

      const userDocRef = doc(db, "users", user.uid);
      const waterDrinkenTodayCollectionRef = collection(
        userDocRef,
        "waterDrinkenToday"
      );

      const existingRecordQuery = query(
        waterDrinkenTodayCollectionRef,
        where("date", "==", currentDate)
      );

      const existingRecordSnapshot = await getDocs(existingRecordQuery);

      if (!existingRecordSnapshot.empty) {
        const existingRecordDoc = existingRecordSnapshot.docs[0];
        const existingWaterValue = existingRecordDoc.data().waterValue || 0;

        await updateDoc(existingRecordDoc.ref, {
          waterValue: existingWaterValue + waterVal,
        });
      } else {
        await addDoc(waterDrinkenTodayCollectionRef, {
          date: currentDate,
          waterValue: waterVal,
        });

        deleteOutdatedDocument();
      }

      setWaterDrinkenToday((prevState) =>
        prevState ? prevState + waterVal : waterVal
      );

      if (formikHelpers) formikHelpers.resetForm();
    } catch (error) {
      console.error("Error updating/adding document: ", error);
    }
  };

  return (
    <div>
      <div className="">WaterCounter</div>
      <p>
        WaterDrinkenToday:{" "}
        {waterDrinkenToday === null
          ? "loading"
          : `${waterDrinkenToday / 1000} L`}
      </p>
      <Formik initialValues={{ water: 0 }} onSubmit={onSubmit}>
        {({ isSubmitting, resetForm }) => (
          <Form>
            <Field type="number" name="water" />
            <ErrorMessage name="water" component="div" />
            <Button type="submit" disabled={isSubmitting}>
              Add custom amount
            </Button>
            {[250, 500, 750].map((amount) => (
              <Button
                type="button"
                key={amount}
                onClick={() => {
                  onSubmit({ water: amount }, resetForm());
                }}
              >
                {amount}ML
              </Button>
            ))}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default WaterCounter;
