import React, { useState } from 'react'
import ReactDOM from 'react-dom'
 
const App = ({anecdoteArr}) => {
 // save clicks of each button to own state
 const [good, setGood] = useState(0)
 const [neutral, setNeutral] = useState(0)
 const [bad, setBad] = useState(0)
 const [selected, setSelected] = useState(0);

 const anecdotes = [...anecdoteArr];
 const points = Array(anecdotes.length).fill(0);

 const [votes, setVotes] = useState({
     points: points,
     maxVoteAnec: anecdotes[0],
     maxVotes: 0
 });

  const incGoodValue = () => {
     setGood(good+1)
 }
 const incNeutralValue = () => {
   setNeutral(neutral+1)
 }
 const incBadValue = () => {
   setBad(bad+1)
 }
 const getNextAnec = () => {
     let randInd = Math.floor(Math.random() * 6);
     if(randInd === selected) getNextAnec()
     else{
        setSelected(randInd)
     }
 }
 const addVote = (ind) => {
     return () => {
        const copy = [...votes.points];
        copy[ind] += 1;
        let highestVote = Math.max(...copy);
        let maxVoteIndex = copy.findIndex((e) => e === highestVote);
        let maxVoteAnec = anecdotes[maxVoteIndex];

        setVotes({
            ...copy,
            points: copy,
            maxVoteAnec: maxVoteAnec,
            maxVotes: highestVote
        })
     }
}

 return (
   <div>
     <h1>Anecdote of the day</h1>
     <div>{anecdotes[selected]}</div>
     <Button text="next anecdote" onClick={getNextAnec} />
     <Button text="vote" onClick={addVote(selected)} />
     <AnecdoteMostVotes anec={votes.maxVoteAnec} mostVotes={votes.maxVotes}/>

     <h1>Give feedback</h1>
     

     <Button text="good" onClick={incGoodValue} />
     <Button text="neutral" onClick={incNeutralValue} />
     <Button text="bad" onClick={incBadValue} />
     <Statistics good={good} neutral={neutral} bad={bad}/>
   </div>
 )
}

const Statistics = ({good, neutral, bad}) => {
    const all = good+bad+neutral;
    const avg = (good - bad)/2;
    const positive = (good+neutral)/all * 100;

    if(!good && !neutral && !bad){
        return (
            <div>
                No Feedback Given
            </div>
        )
    }
    else{

        return (
            <div>
                <Statistic text="good"  value = {good}/>
                <Statistic text="neutral" value = {neutral}/>
                <Statistic text="bad" value = {bad}/>
                <p>all  {all}</p>
                <p>average {avg} </p>
                <p>positive {positive}%</p>
            </div>
        )
    }
}

const Statistic = ({text, value}) => {
return <div><p>{text}     {value}</p></div>
}

const AnecdoteMostVotes = ({anec, mostVotes}) => {
    return(
        <div>
            <h1>Anecdote with Most votes</h1>
            <p>{anec}</p>
            <p>has {mostVotes}</p>
        </div>
    )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];

ReactDOM.render(<App anecdoteArr={anecdotes}/>, document.getElementById('root'))