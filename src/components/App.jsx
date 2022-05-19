import React, { useReducer } from "react";
import DigitButton from "./digitButton";
import Oprbtn from "./operandButton";



// Predefining Actions
export const ACTIONS ={
ADD:"ADD",
OPERATION:"OPERATION",
CLEAR:"CLEAR",
DEL:"DEL",
EVAL:"EVAL"
}

// Defining Initial States
const initialState = {
    current:"0",
    previous:"",
    operation:""
}

// Reducer defining how actions will behave in respect to the previous state
const reducer = (state,{type,payload}) =>{
    switch(type){
        // Adding 
        case ACTIONS.ADD:
            if(state.current ==="0" ){
                if(payload.value ==="0"){
                     return state
                }
                if(payload.value ==="." && state.current ==="0"){
                    return{
                        ...state,
                        current:`${state.current}${payload.value}`
                    }
                }
                else{
                    return {
                        ...state,
                        current:payload.value
                    }
                }
              
            }
           if(payload.value ==="." && state.current.includes(".")){
               return state
           }
        return{
            ...state,
            current:`${state.current}${payload.value}`
        }
        // Clearing Value/values
    case ACTIONS.CLEAR:
        return initialState
        // Deleting values from the end  
    case ACTIONS.DEL:
        return {
            ...state,
            current:state.current.slice(0,-1)
        }
    //   Arithmetic Operations
    case ACTIONS.OPERATION:
        if(state.previous === ""){
            return{
                ...state,
                current:"0",
                operation:payload.operation,
                previous:state.current
            }
        }
        
        return{
    ...state,
    current:"0",
    previous:evaluate(state)
        }
    case ACTIONS.EVAL:
        return{
            ...state,
            previous:"",
            operation:"",
            current:evaluate(state)
        }     
}
}

// Evaluation Function
function evaluate({current,previous,operation}){
let curr = parseFloat(current)
let prev = parseFloat(previous)
if(isNaN(curr)&&isNaN(prev)){
    return ""
}
switch(operation){
    case "+":
        return `${prev + curr}`
    case "-":
        return `${prev - curr}`
    case "/":
        return `${prev / curr}`
    case "*":
        return `${prev * curr}`
}
}
// Number formatter e.g 1000 to become 1,000
let NUMBER_FORMAT = new Intl.NumberFormat("en-us",{maximumFractionDigits:0})


function numberFormat(num){
    if(num == null){
        return
    }
    const [integer, dec] = num.split(".")
    if (dec == null){
        return NUMBER_FORMAT.format(integer)}
    return `${NUMBER_FORMAT.format(integer)}.${dec}`
}






export default function App(){
    let [{current,previous,operation},dispatch] = useReducer(reducer,initialState)
    return(
        <div className="container">
            <header>Calculator</header>
            <div className="calculator-grid">
           <div className="output" id="display">
               <div className="previous">{previous == ""? "":numberFormat(previous)}{operation}</div>
               <div className="current" id="display">{numberFormat(current)}</div>
           </div>
           <button className="span-two danger" onClick={()=>dispatch({type:ACTIONS.CLEAR})} id="clear">AC</button>
           <button className="danger" onClick={()=>dispatch({type:ACTIONS.DEL})}>C</button>
           <Oprbtn dispatch={dispatch} operation={"*"} id="multiply" />
           <DigitButton value={"1"} id="one" dispatch ={dispatch}/>
           <DigitButton value={"2"} id="two" dispatch ={dispatch}/>
           <DigitButton value={"3"} id="three" dispatch ={dispatch}/>
           <Oprbtn dispatch={dispatch} operation={"/"} id="divide"/>
           <DigitButton value={"4"} id="four" dispatch ={dispatch}/>
           <DigitButton value={"5"} id="five" dispatch ={dispatch}/>
           <DigitButton value={"6"} id="six" dispatch ={dispatch}/>
           <Oprbtn dispatch={dispatch} operation={"+"} id="add"/>
           <DigitButton value={"7"} id="seven" dispatch ={dispatch}/>
           <DigitButton value={"8"} id="eight" dispatch ={dispatch}/>
           <DigitButton value={"9"} id="nine" dispatch ={dispatch}/>
           <Oprbtn dispatch={dispatch} operation={"-"} id="subtract"/>
           <DigitButton value={'.'} dispatch ={dispatch} id="decimal"/>
           <DigitButton value={"0"} dispatch ={dispatch} id="zero"/>
           <button className="span-two" onClick={()=>dispatch({type:ACTIONS.EVAL})} id="equals">=</button>
            </div>
            <footer>Copyrights&copy; Cybug Technologies</footer>
        </div>
    )
}
