import { Stack, Card, Box } from "@mui/material";
import  LocalHospitalIcon  from "@mui/icons-material/LocalHospital";
import { HospitalEntry as Entry } from "../types";
import DiagnosisList from "./DiagnosisList";

const HospitalEntry: React.FC<{entry: Entry }> = ({ entry }) => {
    return (
        <Card sx={{ m: 2}}>
            <Box sx={{ p:1, border: '1px solid black', borderRadius:2}}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <p>{entry.date}</p>
                    <LocalHospitalIcon></LocalHospitalIcon>
                </Stack>
                <p>{entry.description}</p>
                <div>
                {entry.diagnosisCodes && (
                    <DiagnosisList codes={entry.diagnosisCodes} />
                )}
                </div>
                <p>discharge:</p>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <p>{entry.discharge.date}</p>
                    <p>{entry.discharge.criteria}</p>
                </Stack>
                <p>diagnose by {entry.specialist}</p>
            </Box>
        </Card>
    );
};

export default HospitalEntry;