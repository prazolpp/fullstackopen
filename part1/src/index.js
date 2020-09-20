import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3}/>
            <Total exercises1={10} exercises2={7} exercises3={14}/>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part  title= {props.part1} exercises={props.exercises1} />
            <Part  title= {props.part2} exercises={props.exercises2} />
            <Part  title= {props.part3} exercises={props.exercises3} />
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.title} {props.exercises}
            </p>
        </div>
    )
}

const Header = (props) => {
   return ( 
      <div>
        <h1>{props.course}</h1>
      </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>Number of Exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))