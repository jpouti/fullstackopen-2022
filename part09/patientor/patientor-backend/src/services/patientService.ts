import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry, PatientsWithoutSsnEntry, NewPatientEntry } from '../types';

const patients: Array<PatientEntry> = patientData;

const getEntries = () => {
    return patients;
};

const getPatientsWithoutSSN = (): PatientsWithoutSsnEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getPatientsWithoutSSN,
    addPatient
};