import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (!height || !weight) {
        res.status(400);
        res.send({
            error: "malformatted parameters"
        });
    } else {
        const bmi = calculateBmi(height, weight);
        try {
            res.send({
                weight: weight,
                height: height,
                bmi: bmi
            });   
        } catch (error: unknown) {
            res.status(400);
            res.send({
                error: error
            });
        }
    }
});

app.post('/exercises', (req, res) => {
    
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = req.body;

    if (!target || !daily_exercises) {
        return res.status(400).send({ error: 'parameters missing'});
    }
    // target: number & daily_exercises: Array<number>
    if (isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.some((e) => isNaN(Number(e)))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(target, daily_exercises);

    return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});