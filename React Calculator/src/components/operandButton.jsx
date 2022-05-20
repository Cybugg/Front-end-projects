import React from "react";
import { ACTIONS } from "./App";
export default function Oprbtn({operation,dispatch,id}){
return(
    <button onClick={()=>dispatch({type:ACTIONS.OPERATION,payload:{operation}})} id={id}>{operation} </button>
)
}