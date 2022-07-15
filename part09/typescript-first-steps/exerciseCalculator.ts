interface Result {
    periodLength: number,
    traininDays: number,
    success: boolean | undefined,
    rating: number | undefined,
    ratingDescription: string | undefined,
    target: number,
    average: number
}

const exerciseHours: number[] = [];
let target;

const parseArgumentsCalculator = (args: Array<string>) => {
    if (args.length < 4) throw new Error('not enough arguments');
    target = Number(args[2]);
    for (let index = 3; index < args.length; index++) {
        if (!isNaN(Number(args[index]))) {
            exerciseHours.push(Number(args[index]));
        } else {
            throw new Error('provided values were not numbers');
        }
    }
    return {
        target,
        exerciseHours
    };
};

export const calculateExercises = (target: number, exerciseHours: Array<number>): Result => {
    const periodLength = exerciseHours.length;

    const traininDays = exerciseHours.length - exerciseHours.filter(e => e === 0).length;

    const average = exerciseHours.reduce((a, b) => a + b) / exerciseHours.length;

    let rating;
    let success;
    let ratingDescription;

    if (target < average) {
        success = true;
        rating = 3;
        ratingDescription = 'You have done great, keep up with the same way!';
    } else if ((target / 2) < average && target > average ) {
        success = false;
        rating = 2;
        ratingDescription = 'not too bad but you could do better...';
    } else if ((target / 2) > average) {
        success = false;
        rating = 1;
        ratingDescription = 'You can improve for the next training period';
    }

    return {
        periodLength,
        traininDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const { target, exerciseHours } = parseArgumentsCalculator(process.argv);
    console.log(calculateExercises(target, exerciseHours));
} catch (error:unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += ' Error ' + error.message;
    }
    console.log(errorMessage);
}