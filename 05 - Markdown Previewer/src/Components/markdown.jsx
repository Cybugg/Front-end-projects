import React from "react";
import {marked} from "marked"
import { useState } from "react";
// Alternative
import Markdown from "marked-react"


export function MarkedDown(){
const [input,setInput] = useState("")
function handleChange(e){
    const newval = e.target.value
    setInput(prev => newval)
}
const markdown = marked(input)
     return (
     <div className="containMark">
    <h3 className="mdTitle">MD Previewer</h3>
    <div className="Markdown">
<div className="inputMark">
    <h3>INPUT</h3>
<textarea  value={input} onChange={handleChange}/>
</div>
<div className="outputMark">
<h3>OUTPUT</h3>
<div className="outputbox" dangerouslySetInnerHTML={{__html:markdown}}/>

</div>
</div>
    </div>
    )
    }

   
