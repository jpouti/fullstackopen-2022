import { Stack, Card, Box } from "@mui/material";
import  HealthAndSafetyIcon  from "@mui/icons-material/HealthAndSafety";
import  FavoriteIcon  from "@mui/icons-material/Favorite";
import { HealthCheckEntry as Entry, HealthCheckRating } from "../types";
import DiagnosisList from "./DiagnosisList";
import { green, red, orange, yellow } from "@mui/material/colors";

const HealthCheckEntry: React.FC<{entry: Entry }> = ({ entry }) => {
    const checkHealtRating = (rating:HealthCheckRating) => {
        switch (rating) {
            case 0:
                return <FavoriteIcon sx={{ color: green[700] }} />;
                break;
            case 1:
                return <FavoriteIcon sx={{ color: yellow[400] }} />;
                break;
            case 2:
                return <FavoriteIcon sx={{ color: orange[500] }} />;
                break;
            case 3:
                return <FavoriteIcon sx={{ color: red[700] }} />;
            default:
                break;
        }
    };
    return (
        <Card>
            <Box sx={{ p:1, border: '1px solid black', borderRadius:2}}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <p>{entry.date}</p>
                    <HealthAndSafetyIcon></HealthAndSafetyIcon>
                </Stack>
                <p>{entry.description}</p>
                { checkHealtRating(entry.healthCheckRating) }
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

export default HealthCheckEntry;