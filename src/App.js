import './App.css';
import React from "react";
import Data from "./data.js";

function App() {
  const tracker = [1,2,3,4,5,6,7,8,9,10];
  let index = -1;

  //Random array state
  const [number,setnumber] = React.useState([0,1,2,3,4,5,6,7,8,9]);

  //Box color state
  const [boxColor, setboxColor] = React.useState(Data);

  const firstHalf = number.slice(0,5);
  const secondHalf = number.slice(-5);

  const listone= firstHalf.map(num => {
    index++;

    return(
      <div className="box" id={tracker[index]} onClick={changeColor} style={{
        background:`${boxColor[index].color}`,
        pointerEvents:`${boxColor[index].event}`
      }}><span>{num}</span></div>

    )
  })

  const listtwo= secondHalf.map(num => {
    index++;
    return(
      <div className="box" id={tracker[index]} onClick={changeColor} style={{
        background:`${boxColor[index].color}`,
        pointerEvents:`${boxColor[index].event}`
      }} ><span>{num}</span></div>

    )
  })

  //State to track no of coloured box
  const [numberColor, setnumberColor] = React.useState(0);


  //Randomize array;
  function handleClick(){
    //Resetting values
    if(buttonValue == "Play again"){
      setnumber(arr=>{
        const lastarr = arr.map(num => {
          return (Math.floor(Math.random() * 10) % 10);
        })
        return lastarr;
      })

      //Resetting colors
      setboxColor((arr)=>{
        const resetarr =arr.map(obj=>{
          return({
            ...obj,
            color:"white"
          })
        })
        return resetarr;
      })

      //Hiding congratulation message
      setwinnerStyle((obj)=>{
        return({
          ...obj,
          display:"none"
        })
      })

      //Chaning button text to default
      setbuttonValue("Roll");

      //Making button clickable again
      setboxColor(arr=>{
        return arr.map(obj=>{
          return({
            ...obj,
            event:""
          })
        })
      })
    }

    let temp =-1;
    setnumber(prevarr =>{
        const finalarr = prevarr.map(num => {
            temp++;

            if(boxColor[temp].color != "white"){

              return num;
            }

            else{
              let randomNumber = Math.floor(Math.random() * 10) % 10;
              num = randomNumber;
              return num;
            }

          })

          return finalarr;
    })

  }

  //State for button Status
  const[buttonValue, setbuttonValue] = React.useState("Roll");




  //Winner style State
  const[winnerStyle, setwinnerStyle] = React.useState({
    display:"none"
  })

  //Variable for winnerStatus
  let winnerStatus = false;

  //Check if the user won
  function checkWinnner(){
    let ans = number[0];
    let count=0;
    for(let i =0; i < 10; i++){
      // console.log(`Boxcolor: ${boxColor[i].color},Value: ${ number[i]}, numberColor: ${numberColor}}`);
      if(!(boxColor[i].color =="#59E391" && number[i] == ans && numberColor == 10)){
        count++;
      }

    }
    // console.log(`Final Count is : ${count}`);
    if(count <= 0){
      setwinnerStyle((obj)=>{
        return({
          ...obj,
          display:"block"
        })
      })

      setbuttonValue("Play again");

      setnumberColor(0);

      //Making buttons unclickable
      setboxColor((arr)=>{
        const buttonarr = arr.map(obj=>{
          return({
            ...obj,
            event:"none"
          })
        })
        return buttonarr;
      })


    }

  }

  //Change color and hold state
  function changeColor(event){
    const boxid = event.currentTarget.id;

    setboxColor(prevarr =>{
      const finalarr = prevarr.map(obj=>{

        if(boxid == obj.id){
          if(obj.color == "white"){
            //Updating number of colored boxes(incrementing)
            setnumberColor((temp)=> temp+1);

          }
          else{
            setnumberColor(temp => temp-1); //Updating number of colored boxes(decrementing)
          }
          const mycolor = (obj.color == "white")?"#59E391":"white";


          return({
            ...obj,
            color:mycolor
          })
        }
        else{
          return({...obj})
        }

      })
      return finalarr;
    })

  }


  React.useEffect(()=>{
    checkWinnner();
  },[numberColor == 10]);

  console.log(`NumberColor: ${numberColor}`)
  return (
    <div className="outer-container">

      <div className="inner-container">

        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <h2 style={winnerStyle}> You won congratulation!!!</h2>
        <div className="box-container">

          <div className="box-container-one box-shape">
            {listone}
          </div>

          <div className="box-container-two box-shape">
            {listtwo}

          </div>

        </div>

        <button onClick={()=>{
          handleClick();
        }} >{buttonValue}</button>

      </div>

    </div>
  );
}

export default App;
