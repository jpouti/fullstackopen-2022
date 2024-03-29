import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT_PAGE";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
    id: string;
  };

export const setDiagnosisList = (diagnosisList:Array<Diagnosis>):Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisList
  };
};

export const setPatientList = (patientList:Array<Patient>):Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

export const addPatient = (newPatient:Patient):Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const setPatientPage = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT_PAGE",
    payload: patient
  };
};

export const addEntry = (newEntry: Entry, id: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: newEntry,
    id
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_PAGE":
      return {
        ...state,
        patientDetails: action.payload,
      };
    case "ADD_ENTRY":
      const updatedPatient = state.patients[action.id];
      updatedPatient.entries.push(action.payload);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.id]: updatedPatient
        }
        };
    default:
      return state;
  }
};
