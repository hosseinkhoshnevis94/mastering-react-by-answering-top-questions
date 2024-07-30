import React from 'react'
 // Prevents the event from bubbling up to the parent

export default function AlertID() {
    function handleClick(e){
        e.stopPropagation(); 
        console.log(e.target.id);
    }
  return (
    <div id='parentElement' onClick={(e)=>handleClick(e)} >
        This is parent element
        <div id="childElement" onClick={(e)=>handleClick(e)} >
            This is child component
        </div>
    </div>
  )
}
