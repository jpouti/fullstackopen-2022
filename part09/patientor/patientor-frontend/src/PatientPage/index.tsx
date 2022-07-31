import { useStateValue, setPatientPage, addEntry } from "../state";
import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Patient, Entry, NewEntry } from "../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Stack, Button } from "@mui/material";
import  HospitalEntry  from '../components/HospitalEntry';
import OccupationalHealthcareEntry from "../components/OccupationalHealthcareEntry";
import HealthCheckEntry from "../components/HealthCheckEntry";
import AddEntryModal from "../AddEntryModal";

const assertNever = (value:never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const PatientPage = () => {
    const [{ patientDetails }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };
    
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
    }, [dispatch, modalOpen]);

    if (!patientDetails) {
        return (
            <div>loading...</div>
        );
    }

    const submitNewEntry = async (values: NewEntry) => {
        if (id) {
            try {
                const { data: newEntry } = await axios.post<Entry>(
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${apiBaseUrl}/patients/${id}/entries`,
                    values
                );
                dispatch(addEntry(newEntry, id));
                closeModal();
            } catch (error: unknown) {
                console.error(error);
            }   
        }
    };

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
            <AddEntryModal 
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </div>
    );

};

export default PatientPage;