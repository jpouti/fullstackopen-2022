import { Stack, Card, Box } from "@mui/material";
import  BusinessCenterIcon  from "@mui/icons-material/BusinessCenter";
import { OccupationalHealthcareEntry as Entry } from "../types";
import DiagnosisList from "./DiagnosisList";

const OccupationalHealthcareEntry: React.FC<{entry: Entry }> = ({ entry }) => {
    return (
        <Card>
            <Box sx={{ p:1, border: '1px solid black', borderRadius:2}}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <p>{entry.date}</p>
                    <BusinessCenterIcon></BusinessCenterIcon>
                    <p>{entry.employerName}</p>
                </Stack>
                <p>{entry.description}</p>
                <div>
                {entry.diagnosisCodes && (
                    <DiagnosisList codes={entry.diagnosisCodes} />
                )}
                </div>
                <p>diagnose by {entry.specialist}</p>
            </Box>
        </Card>
    );
};

export default OccupationalHealthcareEntry;