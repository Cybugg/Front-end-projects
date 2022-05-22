import React, { useState } from "react";




export default function Pad({id,src,label,keyCode,volume,setRecording}){

  const [active,setActive]  = useState(false)

React.useEffect(
    ()=>{
        document.addEventListener("keydown",handleKeyPress)
        return () => document.removeEventListener("keydown",handleKeyPress)
    }
)


function handleKeyPress(e){
    if(e.keyCode=== keyCode){
        playSound()
    }
}

    function playSound(){
     const music = document.getElementById(id)
     music.volume = volume
     music.currentTime = 0
     music.play();
     setActive(()=>true)
     setTimeout(()=>setActive(false),200)
     setRecording(prev => prev + label + " ")
    }

    return (
        <div className="pad" onClick={playSound} style={active?{background:"pink"}:null}>
<audio  id={id} src={src} />
{label}
        </div>
    
    )

}
    