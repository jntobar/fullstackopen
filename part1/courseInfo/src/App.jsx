
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  //console.log(props.partes.name)

  return(
    <p>{props.partes.name} {props.partes.exercises}</p>
  )
}


const Content = (props) => {
  //console.log('componentes de parts',props.parts)
  //const [part1,part2,part3]= props.parts
  
  return (
  <div>
    {props.parts.map((part, index) => (
      <Part key={index} partes={part} />
    ))}
  </div>
  )
}

const Total = (props) => {
  console.log(props.total)
  const totalExercises = props.total.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <p>Number of exercises {totalExercises} </p>
    </div>

  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  console.log(course.name)


  return (
    <div>
      <Header course={course.name}  />      
      <Content  parts={course.parts} />
      <Total total={course.parts}/>
    </div>
  )
}

export default App