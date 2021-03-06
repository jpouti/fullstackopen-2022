import express from 'express';

const router = express.Router();

import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry } from '../utils';

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsWithoutSSN());
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = toNewPatientEntry(req.body);

        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);   
    } catch (error:unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (req, res) => {
    try {
        const patient = patientService.getPatient(req.params.id);
        res.send(patient);
    } catch (error:unknown) {
        let errorMessage = 'Patient not found, invalid id';
        if (error instanceof Error) {
            errorMessage = ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});


router.post('/:id/entries', (req, res) => {
    const patient = patientService.getPatient(req.params.id);
    if(patient) {
        try {
            const newEntry = toNewEntry(req.body);
            const addedEntry = patientService.addEntry(patient, newEntry);
            res.json(addedEntry);
        } catch (error: unknown) {
            res.status(400).send({ error: error });
        }
    } else {
        res.status(400).send({ error: "Patient not found, invalid patient id" });
    }
});

export default router;