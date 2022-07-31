import React from "react";
import { Field, Formik, Form } from "formik";
import { NewEntry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { Grid, Button } from "@material-ui/core";
import { DiagnosisSelection, SelectField, TextField } from "../AddPatientModal/FormField";

interface Props {
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
}

export type HealthRatingOption = {
    value: HealthCheckRating;
    label: string;
};

const healtRatingOptions: HealthRatingOption[] = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "Low Risk" },
    { value: HealthCheckRating.HighRisk, label: "High Risk" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosis }] = useStateValue();
    return (
        <Formik
            initialValues={{
                    type: "HealthCheck",
                    description: "",
                    date: "",
                    specialist: "",
                    healthCheckRating: HealthCheckRating.Healthy,
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.name = requiredError;
                }
                if (!values.date) {
                    errors.name = requiredError;
                }
                if (!values.specialist) {
                    errors.name = requiredError;
                }
                return errors;
            }}
            >
                {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                    return (
                        <Form className="form-ui">
                            <Field
                              label="Description"
                              placeholder="Description"
                              name="description"
                              component={TextField}
                            />
                            <Field
                              label="Date"
                              placeholder="YYYY-MM-DD"
                              name="date"
                              component={TextField}
                            />
                            <Field
                              label="Specialist"
                              placeholder="Specialist name"
                              name="specialist"
                              component={TextField}
                            />                            
                            <SelectField label="Health Check Rating" name="healthCheckRating" healthRatingOption={healtRatingOptions} />
                            <DiagnosisSelection
                              setFieldValue={setFieldValue}
                              setFieldTouched={setFieldTouched}
                              diagnoses={Object.values(diagnosis)}
                            />
                            <Grid>
                                <Grid item>
                                    <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                    >
                                    Cancel
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                    >
                                    Add
                                    </Button>
                                </Grid>
                            </Grid>                              
                        </Form>
                    );
                }}
        </Formik>
    );
};

export default AddEntryForm;

