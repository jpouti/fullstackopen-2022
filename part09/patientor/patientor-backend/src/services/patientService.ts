import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NewEntry, NewPatientEntry, Patient, PublicPatient } from '../types';

let patients: Array<Patient> = patientData;

const getEntries = () => {
    return patients;
};

const getPatientsWithoutSSN = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find((p) => p.id === id);
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
    const updatePatientEntry = { ...patient, entries: patient.entries.concat({ ...newEntry, id: uuid()})};
    patients = patients.map(p => (
        p.id === patient.id ? updatePatientEntry : p
    ));

    return updatePatientEntry;
};

export default {
    getEntries,
    getPatientsWithoutSSN,
    addPatient,
    getPatient,
    addEntry
};