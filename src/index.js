import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
const Tiles = [1,2,3,4,5,6,7,8,9];
const Square = ({key,history,handleClickEvent})=>{
	return(
		<div key={key} onClick={handleClickEvent}></div>
		)
	}
const Buttons = ({reset,show})=>{
	return (
		<>
			<i onClick={reset} className="fa fa-refresh" style="font-size:36px;"></i>
		</>

	)
}
const Winner = ({winner,show,closeAlert})=>{
	return(<Alert show={show} variant="success" onClose={closeAlert} dismissible>
        <Alert.Heading>{winner} Wins the game</Alert.Heading>
      </Alert>)
}
const checkWinner = (choices)=>{
	const winningCombinations= [
		[1,2,3],
		[4,5,6],
		[7,8,9],
		[1,4,7],
		[2,5,8],
		[3,6,9],
		[1,5,9],
		[3,5,7]
	];
	for (let i = 0; i < winningCombinations.length; i++) {
		winningCombinations[i].sort((a,b)=>{return a-b});
		choices.sort((a,b)=>{return a-b});
		let count = 0;
		if(choices.length >='3'){
			winningCombinations[i].forEach((value)=>{
				if(choices.includes(value)){
					count++;
				}
			})
			if(count===3){
				return true;
			}
		}
	  }
}

const Board = ()=>{
const [player,setPlayer] = useState("o");
const [history,setHistory] = useState(0);
const [filledChoices,setFilledChoices] = useState([]);
const [xChoices,setXChoices] = useState([]);
const [oChoices,setOChoices] = useState([]);
const [winner,setWinner] = useState('');
const [showWinner,setShowWinner] = useState(false);
useEffect(()=>{
	if(history%2){
		if(checkWinner(oChoices)){
			setShowWinner(true);
			setWinner('O');
		}
	}
	else{
		if(checkWinner(xChoices)){
			setShowWinner(true);
			setWinner('X');
	   }
	}
})
function handleClick(e,value){
	if(!showWinner){
		if(history%2){
			if(!checkRepeat(filledChoices,value)){
				setPlayer('o');
				setXChoices([...xChoices,value]);
				setHistory(history+1);
				setFilledChoices([...filledChoices,value]);
				e.target.innerText=player;
			}
		}
		else{
			if(!checkRepeat(filledChoices,value)){
				setPlayer('x');
				setOChoices([...oChoices,value]);
				setHistory(history+1);
				setFilledChoices([...filledChoices,value]);
				e.target.innerText=player;
			}
		}
	}
}
const checkRepeat = (array,value)=>{
	return array.includes(value);
}
const closeAlert = ()=>{
	setShowWinner(false);
	setWinner('');
	setXChoices([]);
	setXChoices([]);
}
const Reset = ()=>{
	const resetGame = ()=>{
		window.location.reload();
	}
	return (
		<>
		 <Button
		 onClick={resetGame}>⟳</Button>
		</>
	)
}
const PlayerName = ({playerName})=>{
	return (
		<span className="text-light
		">Player {playerName.toUpperCase()}</span>
	)
}
const changeColor = (divs)=>{

}
return (
	<>
	<Winner winner={winner} show={showWinner} closeAlert={closeAlert}/>
	<div className="setUp">
		<div className="info">
			<Reset show={showWinner}/>
			<PlayerName playerName={player}/>
		</div>
		<div className="flex-container">
			{Tiles.map((value,index)=>{
				return <Square key={index} history={history} handleClickEvent={(e,index)=>handleClick(e,value)}/>
			})}
		</div>
	</div>
	</>
)
}


ReactDom.render(
  <Board/>
  ,
  document.getElementById('root')
)