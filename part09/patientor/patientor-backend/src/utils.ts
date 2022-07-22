/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, NewEntry, DiagnoseEntry, HealthCheckRating } from "./types";

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

const parseDescription = (description:unknown): string => {
    if(!description || !isString(description)) {
        throw new Error("Incorrect or missing description");
    }
    return description;
};

const parseDate = (date:unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date' + date);
    }
    return date;
};

const parseSpecialist = (specialist:unknown): string => {
    if(!specialist || !isString(specialist)) {
        throw new Error("Incorrect or missing specialist");
    }
    return specialist;
};

const isStringArray = (param: any[]):param is string[] => {
    return param.some((index) => !isString(index));
};

const parseDiagnosisCodes = (diagnosisCodes:unknown): Array<DiagnoseEntry['code']> => {
    if (!Array.isArray(diagnosisCodes) || !isStringArray(diagnosisCodes)) {
        throw new Error("Incorrect or missing diagnoses");
    }
    return diagnosisCodes;
};

const isHealthRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};


const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || healthCheckRating === null || !isHealthRating(healthCheckRating)) {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};

const parseDischargeCriteria = (criteria: unknown): string => {
    if(!criteria || !isString(criteria)) {
        throw new Error("Incorrect or missing criteria");
    }
    return criteria;
};

const parseDischarge = (object: any): {date:string, criteria:string} => {
    if (!object) {
        throw new Error("Incorrect or missing discharge");
    }
    return {
        date: parseDate(object.date),
        criteria: parseDischargeCriteria(object.criteria),
    };
};

const parseEmployerName = (name:unknown): string => {
    if(!name || !isString(name)) {
        throw new Error("Incorrect or missing employer name");
    }
    return name;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (object: any): {startDate:string, endDate:string} => {
    if (!object) {
        throw new Error("Incorrect or missing sick leave");
    }
    return {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate),
    };
};

const assertNever = (value:never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const isValidType = (entry:any): entry is NewEntry => {
    if (entry.type === "HealthCheck" || entry.type === "Hospital" || entry.type === "OccupationalHealthcare") {
        return true;
    } else {
        return false;
    }
};

const parseEntry = (entry:any):NewEntry => {
    if (!entry || !isValidType(entry)) {
        throw new Error("Incorrect or missing entry");
    }
    return entry;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object:any): NewEntry => {
    const entry = parseEntry(object);
    if (!entry) {
        throw new Error("Entry is not valid");
    }

    switch (entry.type) {
        case "HealthCheck":
            const newHealthCheckEntry: NewEntry = {
                description: parseDescription(entry.description),
                date: parseDate(entry.date),
                specialist: parseSpecialist(entry.specialist),
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
            };
            if (object.diagnosisCodes) {
                newHealthCheckEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
            }
            return newHealthCheckEntry;
        case "Hospital":
            const newHospitalEntry: NewEntry = {
                description: parseDescription(entry.description),
                date: parseDate(entry.date),
                specialist: parseSpecialist(entry.specialist),
                type: "Hospital",
                discharge: parseDischarge(entry.discharge)
            };
            if (object.diagnosisCodes) {
                newHospitalEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
            }
            return newHospitalEntry;
        case "OccupationalHealthcare":
            const newOccupationalEntry: NewEntry = {
                description: parseDescription(entry.description),
                date: parseDate(entry.date),
                specialist: parseSpecialist(entry.specialist),
                type: "OccupationalHealthcare",
                employerName: parseEmployerName(entry.employerName)
            };
            if (object.diagnosisCodes) {
                newOccupationalEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
            }
            if (object.sickLeave) {
                newOccupationalEntry.sickLeave = parseSickLeave(entry.sickLeave);   
            }
            return newOccupationalEntry;
        default:
            assertNever(entry);
            return entry;
    }
};

export default toNewPatientEntry;