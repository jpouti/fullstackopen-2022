interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDesciption extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBase, CourseDesciption {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase, CourseDesciption {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecial extends CoursePartBase, CourseDesciption {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecial;

const Header = ({ courseName }: { courseName: string}) => (
  <h1>{courseName}</h1>
)

const Part = ({ part }: { part: CoursePart}): JSX.Element => {
  const assetNever = (value:never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }
  switch (part.type) {
    case "normal":
        return (
          <div>
            <h4>{part.name} {part.exerciseCount}</h4>
            <p>{part.description}</p>
          </div>
        )
      break;
    case "groupProject":
      return (
        <div>
          <h4>{part.name} {part.exerciseCount}</h4>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
      break;
    case "submission":
     return (
      <div>
        <h4>{part.name} {part.exerciseCount}</h4>
        <p>{part.description}</p>
        <p>submit to <a>{part.exerciseSubmissionLink}</a></p>
      </div>
    )
      break;
    case "special":
      return (
        <div>
          <h4>{part.name} {part.exerciseCount}</h4>
          <p>{part.description}</p>
          <p>required skils: {part.requirements.toString()}</p>
        </div>
      )
    default:
      return assetNever(part);
  }
}

const Content = ({ courseParts }: { courseParts: CoursePart[]}) => {
  return (
    <div>
  { courseParts.map((course) => (
      <Part key={course.name} part={course} />
      ))}
    </div>
  )
};

const Total = ({ courseParts }: { courseParts: Array<{ name: string; exerciseCount: number; }>}) => {
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
  return (
    <div>
      <p>Number of exercise {total}</p>
    </div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;