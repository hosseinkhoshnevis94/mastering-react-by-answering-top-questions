import React, { useState } from 'react'
//custom hook pattern


const user ={
    name:'john',
    email:'example@blabla.com',
    userName:'user@John'
}

function useToggle(initial=false){
    const [isVisible,setIsVisible] = useState(initial)
    const handleVisible = ()=>{
        setIsVisible(p=>!p)
    }
  return {isVisible,handleVisible}
}

export default function UserData() {
    const {isVisible,handleVisible} = useToggle(true)

  return (
    <div>
        {isVisible && 
        <ul>
           { Object.keys(user).map((key,index)=>{
                return <li key={index}>{key}:{user[key]}</li>
            })}
        </ul>
        }
        <button onClick={handleVisible}>click to {isVisible ? 'hide' : 'show'} user data!</button>
    </div>
  )
}
