import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight)
    const bmi = calculateBmi(height, weight)
    try {
        res.send({
            "weight": weight,
            "height": height,
            "bmi": bmi
        })   
    } catch (error) {
        res.send({
            "error": "malformatted parameters"
        })
    }
})

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})