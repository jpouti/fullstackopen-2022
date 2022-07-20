import { useStateValue, setPatientPage } from "../state";
import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Patient, Entry } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Stack } from "@mui/material";
import  HospitalEntry  from '../components/HospitalEntry';
import OccupationalHealthcareEntry from "../components/OccupationalHealthcareEntry";
import HealthCheckEntry from "../components/HealthCheckEntry";

const assertNever = (value:never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const PatientPage = () => {
    const [{ patientDetails }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    
    React.useEffect(() => {
        const fetchPatient =  async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(setPatientPage(patientFromApi));
            } catch (error) {
                console.error(error);
            }
        };
        void fetchPatient();
    }, [dispatch]);

    if (!patientDetails) {
        return (
            <div>loading...</div>
        );
    }

    const checkGender = () => {
        if (!patientDetails.gender) {
            return null;
        } else if (patientDetails.gender === 'male') {
            return (
                <MaleIcon></MaleIcon>
            );
        } else if (patientDetails.gender === 'female') {
            return <FemaleIcon></FemaleIcon>;
        } else if (patientDetails.gender === 'other') {
            return <TransgenderIcon></TransgenderIcon>;
        }
    };

    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
            case "Hospital":
                return <HospitalEntry entry={entry}/>;
            case "OccupationalHealthcare":
                return <OccupationalHealthcareEntry entry={entry} />;
            case "HealthCheck":
                return <HealthCheckEntry entry={entry} />;
            default:
                return assertNever(entry);
        }
    };

    return (
        <div>
            <Stack direction="row" alignItems="center" spacing={2} >
                <h2>{patientDetails.name}</h2>
                {checkGender()}
            </Stack>
            <p>ssn: {patientDetails.ssn}</p>
            <p>occupation: {patientDetails.occupation}</p>
            <h3>entries</h3>
            <div>
                {patientDetails.entries.map(entry => (
                    <EntryDetails entry={entry} key={entry.id}/>
                ))}
            </div>
        </div>
    );

};

export default PatientPage;