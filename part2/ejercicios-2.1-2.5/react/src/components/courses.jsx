const Course = ({ courses }) => {
  console.log('props--', courses);


  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total total={course.parts} />
        </div>
      ))}
    </div>
  );


}

const Header = ({ course }) => {
  return (
    <h2>{course}</h2>
  )
}

const Part = ({ partes }) => {
  //console.log(props.partes.name)

  return (
    <p>{partes.name} {partes.exercises}</p>
  )
}


const Content = ({ parts }) => {
  console.log('componentes de parts', parts)
  //const [part1,part2,part3]= props.parts

  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} partes={part} />
      ))}
    </div>
  )
}

const Total = ({ total }) => {
  console.log(total)
  const totalExercises = total.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <h4>Number of exercises {totalExercises} </h4>
    </div>

  )
}

export default Course