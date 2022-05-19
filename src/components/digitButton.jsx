import React from "react";
import { ACTIONS } from "./App";

export default function DigitButton({value,dispatch,id}){
    return(
        <button onClick={()=> dispatch({type:ACTIONS.ADD,payload:{value}})} id={id}>{value}</button>
    )
}