import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NewPatientEntry, Patient, PublicPatient } from '../types';

const patients: Array<Patient> = patientData;

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

export default {
    getEntries,
    getPatientsWithoutSSN,
    addPatient,
    getPatient
};