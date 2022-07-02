import React from "react";

export default function firstArray(props){
  console.log(props.array);
  const listone= props.array.map(num => {

    return(
      <div className="box" id={Math.floor(Math.random()*10)}><span>{num}</span></div>

    )
  })
  return(
      {listone}

  )


}
