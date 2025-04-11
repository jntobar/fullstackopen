import { useState } from "react";

const Button = ({ onClick, text }) => {
  //console.log(onClick)
  //console.log(text)
  return (

    <button onClick={onClick}>{text}</button>


  )
}

const StatisticLine = (props) => {
  console.log(props)
  if (props.text === 'Positive Percentage') {
    return (
      <tr>
        <td> {props.text}</td>
        <td> {props.value} %</td>
      </tr>
    )
  }
  return (

      <tr>        
        <td> {props.text}</td>
        <td> {props.value}</td>
      </tr>
      

  )
}


const Statistic = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <p>No hay comentarios</p>
      </div>
    )
  }

  const total = good + neutral + bad;
  const average = (good + neutral + bad) / 3;
  const positivePercentage = (good / total) * 100;
  return (
    <table>
      <tbody>
      <StatisticLine text='Good' value={good} />
      <StatisticLine text='Neutral' value={neutral} />
      <StatisticLine text='Bad' value={bad} />
      <StatisticLine text='Total' value={total} />
      <StatisticLine text='Average' value={average} />
      <StatisticLine text='Positive Percentage' value={positivePercentage} />

      </tbody>
    </table>
  )


}


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const opcionGood = () => {
    setGood(good + 1);
  }
  const opcionNeutral = () => {
    setNeutral(neutral + 1);
  }
  const opcionBad = () => {
    setBad(bad + 1);
  }

  //const total = good + neutral + bad;




  return (
    <div>
      <div>
      <h1 style={{ color: '#333' }}>Give Feedback</h1> 
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <Button onClick={opcionGood} text='Good' />
        <Button onClick={opcionNeutral} text='Neutral' />
        <Button onClick={opcionBad} text='Bad' />


      </div>
      <h2 style={{ color: '#333' }}>Statistics</h2>
      <div>

        <Statistic good={good} neutral={neutral} bad={bad} />
      </div>


    </div>
  )

}

export default App