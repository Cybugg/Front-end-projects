import React from "react"
import Countdown from "react-countdown"
import {CountdownCircleTimer,useCountdown} from "react-countdown-circle-timer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@mui/material/Button';
import SpeedDial from '@mui/material/SpeedDial';

import Box from '@mui/material/Box';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PersonIcon from '@mui/icons-material/Person';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import TimerIcon from '@mui/icons-material/Timer';
import CachedIcon from '@mui/icons-material/Cached';
import { IconButton } from "@mui/material";
import { useReducer } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
// Initial States
const initialState ={
  onplay:false,
  timerDisplay:true,
}

// Actions for the reducer
const ACTIONS ={
PLAY:"PLAY",
PAUSE:"PAUSE",
RESET:"RESET"
}

// reducer function
const reducer = (state,{type})=>{
switch(type){
  case ACTIONS.PLAY:
    return(
      {...state,
      onplay:true
      }
    )
  case ACTIONS.PAUSE:
    return(
      {...state,
      onplay:false
      }
    )
  case ACTIONS.RESET:
    return(
      {
      initialState
      }
    )
}
}

// Actions for the side menu in the app
const actions = [
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <PersonIcon />, name: 'About me' },
  {icon:<SettingsIcon />, name:"settings"},
 
];

// Time format function
const formatTime = (time)=>{
    let mins = Math.floor(time / 60)
    let secs = time % 60
    return <h1 className="format">{(mins < 10?"0"+ mins:mins) + ":" +
    (secs < 10?"0"+ secs:secs)}</h1>
}




// The main Clock class
export default function Clock25(){
   
const [state, dispatch] = useReducer(reducer,initialState)

    
  
    return(
        <div className="selfContain">
          {/* Title Session */}
    <div className="titleC">Pomodoro Clock   
     </div>   

<div className="svgTime">

<CountdownCircleTimer isPlaying={state.onplay}
         duration={25*60} 
         colors={["#d66ab2","#F7B801","#A30000","#A30000",]}
        colorsTime={[7,5,2,0]}
        onComplete={()=>"hello"}
        strokeWidth={5}>
{({remainingTime})=>formatTime(remainingTime)}
        </CountdownCircleTimer>

 {/*controls section*/}
        <div className="controls">
          {/* reload */}
<button className="btn btn-flat" onClick={() => dispatch({type:ACTIONS.RESET})}><CachedIcon /></button>
{state.onplay?<button className="btn btn-active" onClick={() => dispatch({type:ACTIONS.PAUSE})}>
<PauseIcon />
</button>:<button className="btn btn-active"     onClick={() => dispatch({type:ACTIONS.PLAY})}>
<PlayArrowIcon />
</button>
}
        </div>
</div>


{/* fixed components */}
      <SpeedDial
        ariaLabel="Options"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    
        </div>
    )
}

function Settings({title,formatTime,type,time,changeTime}){
    return(
        <div>
            <h3>{title}</h3>

        </div>
    )
}