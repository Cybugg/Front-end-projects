import React from "react"
import {CountdownCircleTimer,useCountdown} from "react-countdown-circle-timer"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PersonIcon from '@mui/icons-material/Person';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CachedIcon from '@mui/icons-material/Cached';
import { useReducer } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CheckIcon from '@mui/icons-material/Check';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { ClickAwayListener } from "@mui/material";

import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
// Initial States
const initialState ={
  onplay:false,
  timerDisplay:true,
  settingsDisplay:true,
  aboutDisplay:false,
  shareDisplay:false,
  darkMode:true,
  lightMode:false,
  themeDisplay:false,
  clickAway:false,
  session:1500,
  break:300,
  settingsDisplay:false,
  time:1500,
  onbreak:false,
  key:0,
  aboutDisplay:false,
  playAudio:false
}

// Actions for the reducer
const ACTIONS ={
PLAY:"PLAY",
PAUSE:"PAUSE",
RESET:"RESET",
TIMERDISPLAY:"TIMERDISPLAY",
TIMERDISPLAYON:"TIMERDISPLAYON",
SETTINGSDISPLAY:"SETTINGSDISPLAY",
ABOUTDISPLAY:"ABOUTDISPLAY",
SHAREDISPLAY:"SHAREDISPLAY",
DARKMODE:"DARKMODE",
LIGHTMODE:"LIGHTMODE",
DISPLAYTHEMES:"DISPLAYTHEMES",
CLEARSCREEN:"CLEARSCREEN",
SESSION:"SESSION",
BREAK:"BREAK",
SESSIONTIME:"SESSIONTIME",
BREAKTIME:"BREAKTIME",
SAVESETTINGS:"SAVESETTINGS",
SWITCH:"SWITCH",
REPLAY:"REPLAY",
ABOUTME:"ABOUTME",
PLAYAUDIO:"PLAYAUDIO"
}

// reducer function
const reducer = (state,{type,payload})=>{
switch(type){
  case ACTIONS.PLAY:
    return(
      {...state,
      onplay:true,
      themeDisplay:false,
      settingsDisplay:false,
      timerDisplay:true
      }
    )
  case ACTIONS.PAUSE:
    return(
      {...state,
      onplay:false,
      themeDisplay:false
      }
    )
  case ACTIONS.RESET:
    return(
      {
        ...state,
        key:state.key + 1,
        onplay:false,

      }
    )
  case ACTIONS.REPLAY:
    return(
      {
        ...state,
        key:state.key + 1,
        onplay:true,

      }
    )
  case ACTIONS.DARKMODE:
    return(
      {
      ...state,
      darkMode:true,
      lightMode:false
      }
    )
  case ACTIONS.LIGHTMODE:
    return(
      {
        ...state,
        darkMode:false,
        lightMode:true
      }
    )
  case ACTIONS.DISPLAYTHEMES:
    return(
      {
        ...state,
      themeDisplay:!state.themeDisplay
      }
    )
  case ACTIONS.CLEARSCREEN:
    return(
      {
        ...state,
      themeDisplay:false
      }
    )
  case ACTIONS.TIMERDISPLAY:
    return{
        ...state,
      timerDisplay:true,
      settingsDisplay:false,
      themeDisplay:false,
      aboutDisplay:false
      }
    
  case ACTIONS.SESSIONTIME:
if(state.session === 0 && payload === -60){
  return state
}
  return{
      ...state,
      session:state.session + payload
    }
  case ACTIONS.BREAKTIME:
    if(state.break === 0 && payload === -60){
      return state
    }
  return{
      ...state,
      break:state.break + payload
    }
  case ACTIONS.SAVESETTINGS:

  return{
      ...state,
      time:state.session,
      settingsDisplay:false,
      timerDisplay:true,
      key:state.key + 1,
      onplay:false
    }
  case ACTIONS.SETTINGSDISPLAY:

  return{
      ...state,
      settingsDisplay:true,
      timerDisplay:false,
      themeDisplay:false,
      aboutDisplay:false
    }
  case ACTIONS.SWITCH:
if(!state.onbreak){
  return{
      ...state,
     
    onbreak:!state.onbreak,
    time:state.break
}
}
if(state.onbreak){
  return{
    ...state,
  onbreak:!state.onbreak,
  time:state.session
}
}
case ACTIONS.ABOUTME:
  return{
    ...state,
    themeDisplay:false,
    timerDisplay:false,
    settingsDisplay:false,
    aboutDisplay:true,
    infoDisplay:false
  }
}
}






// The main Clock class
export default function Clock25(){

const [state, dispatch] = useReducer(reducer,initialState)
const handleClickTheme = (e)=>{
  e.preventDefault()
  e.stopPropagation()
  dispatch({type:ACTIONS.DISPLAYTHEMES})

}



// Time format function
const formatTime = (time)=>{
  let mins = Math.floor(time / 60)
  let secs = time % 60
  return (<h1 className={state.lightMode?"format-light":"format-dark"} style={state.onbreak?{color:"#48cb59",animation:"1s blink infinite"}:null
  } >{(mins < 10?"0"+ mins:mins) + ":" +
  (secs < 10?"0"+ secs:secs)}</h1>
  )
}
// handle about
function handleAbout(){
  dispatch({type:ACTIONS.ABOUTME})
}
 // handle ClickAway
function handleClickAway(e){
e.preventDefault()
dispatch({type:ACTIONS.CLEARSCREEN})
}

// handle PLay
function play(e){
  e.preventDefault()
  dispatch({type:ACTIONS.PLAY})
}
// handle settings display

function displaySettings(){
dispatch({type:ACTIONS.SETTINGSDISPLAY})
}
// display time
function displaytime(){
  dispatch({type:ACTIONS.TIMERDISPLAY})
}
// switch between break time and session time
function switche(){
  dispatch({type:ACTIONS.SWITCH})
  dispatch({type:ACTIONS.REPLAY})
}

// Actions for the side menu in the app
const actions = [
  {icon: <PersonIcon />, name: 'About me',actions:handleAbout},
  {icon:<SettingsIcon />, name:"Settings",actions:displaySettings},
  {icon:<ModeEditIcon />, name:"Theme",actions:handleClickTheme},
  {icon:<PlayArrowIcon />, name:"Start",actions:displaytime}
];
// break time audio
const audioClip = new Audio(".././public/2019-06-14_-_Warm_Light_-_David_Fesliyan (online-audio-converter.com).mp3")
function playAudio(){
audioClip.currentTime = 0
audioClip.play()
}
if(state.onbreak){
  playAudio()

}
if(!state.onbreak){
  audioClip.pause()

}


    return(
        <div className="selfContain" style={state.lightMode?{background:"rgba(255, 222, 122, 0.458)"}:null}>
          {/* Title Session */}
    <div className= {state.lightMode?"titleC theme-light-title":"titleC"}>Pomodoro Clock   
     </div>   

{/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
<div className="svgTime" style={state.timerDisplay?{display:"flex"}:{display:"none"}}>
{/* Timer session */}
<div>
  <CountdownCircleTimer isPlaying={state.onplay}
         duration={state.time} 
         key = {state.key}
         colors={state.lightMode?["orange","orange","orangered","red"]:["#d66ab2","#F7B801","#A30000","#A30000",]}
        
        colorsTime={[7,5,2,0]}
        onComplete={()=>{return(
          (switche())
          )
         
        }}
        strokeWidth={5}>
{({remainingTime})=>formatTime(remainingTime)}
        </CountdownCircleTimer>
       
</div>
 {/*Controls section*/}
 <div className="controls">
          {/* Reload */}
<button className="btn btn-flat" onClick={() => dispatch({type:ACTIONS.RESET})}><span><CachedIcon /></span></button>
           {/* Pause */}
{state.onplay?<button className="btn btn-active" onClick={() => dispatch({type:ACTIONS.PAUSE})}>
<PauseIcon />
</button>: 
//            Play
<button className="btn btn-active"     onClick={play}>
<PlayArrowIcon />
</button>
}
</div>
        </div>
{/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
{/* settings */}
<div style={state.settingsDisplay?{display:"block"}:{display:"none"}}>
<div className="settings" style={
state.lightMode?{color:"brown"}:null
}>
            <h2>Session</h2>
            {formatTime(state.session)}
            <div>
              <button onClick={()=>dispatch({type:ACTIONS.SESSIONTIME,payload:-60}) } style={
state.lightMode?{color:"brown",border:"1px brown solid"}:null
}><ArrowDownwardIcon/></button>
              <button onClick={()=>dispatch({type:ACTIONS.SESSIONTIME,payload:60})} style={
state.lightMode?{color:"brown",border:"1px brown solid"}:null
}><ArrowUpwardIcon /></button>
              
            </div>
            

        </div>
        <div className="settings" style={
state.lightMode?{color:"brown"}:null
}>
            <h2>Break</h2>
            {formatTime(state.break)}
            <div>
              <button onClick={()=>dispatch({type:ACTIONS.BREAKTIME,payload:-60})}style={
state.lightMode?{color:"brown",border:"1px brown solid"}:null
}><ArrowDownwardIcon/></button>
              <button onClick={()=>dispatch({type:ACTIONS.BREAKTIME,payload:60})}
              style={
                state.lightMode?{color:"brown",border:"1px brown solid"}:null
                }><ArrowUpwardIcon /></button>
              
            </div>
        </div>
        <button className="save-btn" onClick={()=>dispatch({type:ACTIONS.SAVESETTINGS})}>save</button>
</div>
{/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}


{/* about me */}
<div style={!state.aboutDisplay?{display:"none"}:null}>
  <Aboutme light={state.lightMode} />
</div>

{/* .............................. */}
{/* fixed components */}

{/* Theme */}
<ClickAwayListener onClickAway ={handleClickAway}>
  <div className={!state.themeDisplay?"nonDisplay":null}>
<div className="theme"style={state.lightMode?{background:"rgb(218, 189, 135)"
}:null}>
  <h2 className={state.lightMode?"theme-light-title":null}>Theme</h2>
  <div className="theme-btn">
    {/* button theme one */}
    <div className="theme-btn">
    <button className="btn btn-dark" style={state.darkMode?{background:"white",color:"#090a28"}:null} onClick={()=>dispatch({type:ACTIONS.DARKMODE})}>
<DarkModeIcon />
</button>{state.darkMode?<span className="check"><CheckIcon /></span>:null}
    </div>
    {/* button theme two */}
 <div className="theme-btn">
 <button className="btn btn-light" style={state.lightMode?{background:"orange"}:null}  onClick={()=>dispatch({type:ACTIONS.LIGHTMODE})}>
<LightModeIcon />
</button>
{state.lightMode?<span className="check"><CheckIcon /></span>:null}
 </div>
 
  </div>
</div>
</div>
</ClickAwayListener>
{/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
{/* speed dial */}
      <SpeedDial
        ariaLabel="Options"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<SettingsIcon />} 
        
        />
     
      }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick = {action.actions} 
          />
        ))}
      </SpeedDial>
    
        </div>
    )
}
// About, me Component
function Aboutme({light}){
  return(
    <div className="about">
      <div className="socials">
        <a href=""><GitHubIcon  sx={{fontSize:50,color:light?"brown":""}}/></a>
        <a href=""><TwitterIcon sx={{fontSize:50,color:light?"brown":""}}/></a>
        <a href=""><WhatsAppIcon  sx={{fontSize:50,color:light?"brown":""}}/></a>
        <a href=""><InstagramIcon  sx={{fontSize:50,color:light?"brown":""}}/></a>



<p style={{borderTop:light?"2px brown solid":"",borderBottom:light?"2px brown solid":"",color:light?"brown":""}}>&copy;Cybug Technlogies 2022</p>
      </div>
      
    </div>
  )
}

