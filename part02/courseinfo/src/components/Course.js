const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => {
  const total = sum.reduce((a, b) => a + b.exercises, 0);
  return (
    <p style={ bold }>total of {total} exercises</p>
  )
}

const bold = {
    fontWeight: 'bold'
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
  {parts.map(part => 
      <Part key={part.id}
      part={part} 
      />
    )}    
  </>

const Course = ({ course }) =>
  <>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total sum={course.parts}/>
  </>

export default Course;