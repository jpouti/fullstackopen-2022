import { useStateValue, setPatientPage } from "../state";
import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Stack } from "@mui/material";


const PatientPage = () => {
    const [{ patientDetails, diagnosis }, dispatch] = useStateValue();
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

    const getDiagnoseName = (code:string):string | undefined => {
        const diagnoseName = diagnosis[code].name;
        return diagnoseName;
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
                    <div key={entry.id}>
                        <p>{entry.date} {entry.description}</p>
                        <ul>
                        {entry.diagnosisCodes && entry.diagnosisCodes.map(code => {
                            return <li key={code}>{code} {getDiagnoseName(code)}</li>;
                        })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default PatientPage;