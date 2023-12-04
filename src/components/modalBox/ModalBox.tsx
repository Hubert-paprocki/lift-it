import React from "react";
import styles from "./ModalBox.module.scss";
import Button from "../ui/buttons/Buttons";
import LoginForm from "../form/Form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/app/firebase";
import { FormValues } from "../form/Form";
interface ModalBoxProps {
  onClick: () => void;
  content: string;
}

function ModalBox(props: ModalBoxProps) {
  const handleSignUp = async (values: FormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.userEmail,
        values.password
      );
      const user = userCredential.user;

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.userEmail,
          values.password
        );

        const user = userCredential.user;
        console.log(user.uid);
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage, values);
    }
  };

  const handleLogin = async (values: FormValues) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.userEmail,
        values.password
      );

      const user = userCredential.user;
      console.log(user.uid);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
    }
  };

  return (
    <div className={styles.modalBox}>
      <div className={styles.modalBoxSideBox}>
        <div className={styles.modalBoxSideBoxInnerWrapper}>
          {props.content === "login" && (
            <LoginForm
              inputs={[
                {
                  name: "userEmail",
                  type: "email",
                  id: "userEmail",
                  initialValue: "",
                },
                {
                  name: "password",
                  type: "text",
                  id: "password",
                  initialValue: "",
                },
              ]}
              labelMsg={"welcome back"}
              btnText={"Log In"}
              onSubmit={handleLogin}
            />
          )}
          {props.content === "signUp" && (
            <LoginForm
              inputs={[
                {
                  name: "userEmail",
                  type: "email",
                  id: "userEmail",
                  initialValue: "",
                },
                {
                  name: "password",
                  type: "text",
                  id: "password",
                  initialValue: "",
                },
                {
                  name: "repeatPassword",
                  type: "text",
                  id: "repeatPassword",
                  initialValue: "",
                },
              ]}
              labelMsg={"welcome back"}
              btnText={"Sign Up"}
              onSubmit={handleSignUp}
            />
          )}
        </div>
        <Button secondary onClick={props.onClick}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default ModalBox;
