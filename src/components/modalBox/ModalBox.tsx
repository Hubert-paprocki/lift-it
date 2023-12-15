import React from "react";
import styles from "./ModalBox.module.scss";
import Button from "../ui/buttons/Buttons";
import LoginForm from "../form/Form";
import { useUserContext } from "@/context/UserContext";
import { FormValues } from "../form/Form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
interface ModalBoxProps {
  onClick: () => void;
  content: string;
}

function ModalBox(props: ModalBoxProps) {
  const { user } = useUserContext();
  const router = useRouter();
  return (
    <div className={styles.modalBox}>
      <div className={styles.modalBoxSideBox}>
        <div className={styles.modalBoxSideBoxInnerWrapper}>
          {user ? (
            <p>User is already logged in with </p>
          ) : (
            <>
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
                  labelMsg={"Welcome back"}
                  btnText={"Log In"}
                  onSubmit={async (values: FormValues) => {
                    try {
                      const userCredential = await signInWithEmailAndPassword(
                        auth,
                        values.userEmail,
                        values.password
                      );

                      const user = userCredential.user;
                      console.log("User logged in:", user.uid, user);

                      const currentUser = auth.currentUser;

                      if (currentUser) {
                        console.log(
                          "User is already logged in with UID:",
                          currentUser.uid
                        );
                        router.push(`/user/${user.uid}`);
                      }
                    } catch (error: any) {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      console.error("Login error:", errorMessage);
                    }
                  }}
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
                  labelMsg={"Welcome back"}
                  btnText={"Sign Up"}
                  onSubmit={async (values: FormValues) => {
                    try {
                      const userCredential =
                        await createUserWithEmailAndPassword(
                          auth,
                          values.userEmail,
                          values.password
                        );

                      const user = userCredential.user;
                      console.log("User signed up:", user.uid);

                      const currentUser = auth.currentUser;

                      if (currentUser) {
                        console.log(
                          "User is already logged in with UID:",
                          currentUser.uid
                        );
                        // Optionally, you can redirect the user or perform other actions
                      }

                      // Optionally, you can also sign in the user after signing up
                      try {
                        const signInUserCredential =
                          await signInWithEmailAndPassword(
                            auth,
                            values.userEmail,
                            values.password
                          );

                        const signInUser = signInUserCredential.user;
                        console.log("User also logged in:", signInUser.uid);
                      } catch (signInError: any) {
                        const signInErrorCode = signInError.code;
                        const signInErrorMessage = signInError.message;
                        console.error(
                          "Error signing in after sign up:",
                          signInErrorMessage
                        );
                      }
                    } catch (error: any) {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      console.error("Sign-up error:", errorMessage, values);
                    }
                  }}
                />
              )}
            </>
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
