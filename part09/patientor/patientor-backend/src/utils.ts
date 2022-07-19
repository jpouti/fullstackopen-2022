import { NewPatientEntry, Gender } from "./types";

const isString = (text:unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name:unknown): string => {
    if(!name || !isString(name)) {
        throw new Error("Incorrect or missing name");
    }
    return name;
};

const isDate = (dateOfBirth:string):boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth:unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};


const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fields = { name:unknown, dateOfBirth:unknown, ssn:unknown, gender:unknown, occupation: unknown, entries:any };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries } : Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        entries
    };

    return newEntry;
};

export default toNewPatientEntry;