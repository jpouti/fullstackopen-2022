import { useStateValue } from "../state";
import { DiagnoseEntry } from "../types";

const DiagnosisList = ({ codes }: { codes: Array<DiagnoseEntry['code']> }) => {
    const [{ diagnosis }] = useStateValue();

    const getDiagnoseName = (code:string) => {
        if (code) {
            return diagnosis[code].name;
        }
    };

    return (
        <ul>
        {codes.map(code => {
            return <li key={code}>{code} {getDiagnoseName(code)}</li>;
        })}
        </ul>
    );

};

export default DiagnosisList;