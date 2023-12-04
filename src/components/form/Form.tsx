import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Button from "../ui/buttons/Buttons";
import styles from "./Form.module.scss";

export interface FormValues {
  [key: string]: string;
}

interface InputProps {
  name: string;
  type: string;
  id: string;
  initialValue: string;
}

interface FormComponentProps {
  inputs: InputProps[];
  labelMsg: string;
  btnText: string;
  onSubmit: (values: FormValues) => void;
}

function FormComponent(props: FormComponentProps) {
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const showMsg = (condition: string) => {
    if (condition === "sent") {
      setIsSend(true);

      setTimeout(() => {
        setIsSend(false);
      }, 3000);
    }

    if (condition === "error") {
      setIsError(true);

      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    props.inputs.forEach((input) => {
      if (!values[input.name]) {
        errors[input.name] = "Required";
      }
    });

    return errors;
  };

  return (
    <Formik
      initialValues={props.inputs.reduce(
        (acc, input) => ({
          ...acc,
          [input.name]: input.initialValue,
        }),
        {}
      )}
      validate={validate}
      onSubmit={props.onSubmit}
    >
      <Form className={styles.formComponentWrapper}>
        <fieldset className={styles.formComponent}>
          <legend className={styles.legend}>{props.labelMsg}</legend>

          {props.inputs.map((input) => (
            <div key={input.id} className={styles.fieldGroup}>
              <Field
                className={styles.field}
                type={input.type}
                id={input.id}
                name={input.name}
                placeholder={input.name}
              />
              <label className={styles.label} htmlFor={input.id}>
                {input.name.toLowerCase()}
              </label>
              <ErrorMessage
                name={input.name}
                component="div"
                className={styles.error}
              />
            </div>
          ))}

          <div className={styles.submitWrapper}>
            <Button type="submit" primary>
              {props.btnText}
            </Button>
            {isError && (
              <p
                className={`${styles.errorMsg} ${
                  isError && styles.animationMsg
                }`}
              >
                Error sending form
              </p>
            )}

            <p className={`${styles.sentMsg} ${isSend && styles.animationMsg}`}>
              Form sent successfully
            </p>
          </div>
        </fieldset>
      </Form>
    </Formik>
  );
}

export default FormComponent;
