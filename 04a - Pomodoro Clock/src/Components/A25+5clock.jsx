import React, { useState } from "react";

export default function Timer(){
    const [delayTime,setDisplayTime] = useState(25 * 60)
    const [breakTime,setBreakTime] = useState(5 * 60)
    const [sessionTime,setSessionTime] = useState(25 * 60)
    const [timerOn,setTimerOn] = useState(false)
    const [onBreak,setOnBreak] = useState(false)
const formatTime = (time)=>{
    let mins = Math.floor(time / 60)
    let secs = time % 60
    return (mins < 10?"0"+ mins:mins) + ":" +
    (secs < 10?"0"+ secs:secs)
}

const changeTime = (amount,type)=>{
if(type === 'break'){
    setBreakTime(prev =>{ 
        if(amount == -60 && prev == 0){
            return prev
        }
        return (prev + amount)})
}
if(type =="session"){
    setSessionTime(prev =>{ 
        if(amount == -60 && prev == 0){
            return prev
        }
        return (prev + amount)})
}
if(!timerOn){
setDisplayTime(prev =>  {if(sessionTime == 0){return sessionTime}return sessionTime + amount})
}
} 

const controlTime = ()=>{
    let onBreakVariable = false
    let second = 1000;
    let date = new Date().getTime();
    let nextDate =new Date().getTime() + second
    if(!timerOn){
        let interval = setInterval(() => {
         date = new Date().getTime();
         if(date>nextDate){
             setDisplayTime(prev =>{ 
          if(prev <=0 && !onBreakVariable){
          onBreakVariable = true;
          setOnBreak(true);
          return breakTime  
          }  
           else if(prev <=0 && onBreakVariable){
        onBreakVariable = false;
        setOnBreak(false)
        return(sessionTime)
          }  
                return prev-1})
         };
         
        //  nextDate += second
        }, 1000);
        localStorage.setItem("interval",interval)
    }
    if(timerOn){
        clearInterval(localStorage.getItem("interval"))
    }
    setTimerOn(!timerOn)
}
const resetTime = () =>{
    setDisplayTime(25*60)
    setBreakTime(5*60)
    setSessionTime(25*60)
    clearInterval(localStorage.getItem("interval"))
}
    return (
        <div className="timer">
            <h2>Pomodoro Clock</h2>
            <div className="tit"> <h3 className="twitch">{onBreak?"On Break":null}</h3><h1 className="delayTime">{formatTime(delayTime)}</h1></div>
            <div className="playnow">
            <div><button onClick={controlTime} className="btn-ctrl">{timerOn?"pause":"play"}</button></div>
        <div><button onClick={resetTime} className="btn-rset">reset</button></div>
            </div>
            <div className="len"> <Length title={("break length")} changeTime={changeTime} type={"break"} time = {breakTime} formatTime ={formatTime}/>
            <Length title={("session length")} changeTime={changeTime} type={"session"} time={sessionTime} formatTime={formatTime}/></div>
        </div>
    )}


function Length({title,changeTime,type,time,formatTime}){
return (
    <div className="box">
        <h3>{title}</h3>
        <div className="time-sets"> 
            <button onClick={()=>changeTime(-60,type)}>⬇</button>
           <h3>{formatTime(time)}</h3> 
           <button  onClick={()=>changeTime(60,type)}>⬆</button>
        </div> 
    </div>
)
}