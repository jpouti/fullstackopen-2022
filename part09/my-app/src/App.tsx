const Header = ({ courseName }: { courseName: string}) => (
  <h1>{courseName}</h1>
)

const Content = ({ courseParts }: { courseParts: Array<{ name: string; exerciseCount: number; }>}) => {
  return (
    <div>
  { courseParts.map((course : { name: string, exerciseCount: number }) => {
      return <p key={course.name}>{course.name} {course.exerciseCount}</p>;
      })}
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
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;