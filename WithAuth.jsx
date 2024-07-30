import React from 'react'
// HOC pattern

export default function WithAuth(wrappedComponent) {
  return function(props){
    const isAuth = !!localStorage.getItem('authToken')
    if(Boolean(isAuth)){
       return <wrappedComponent {...props}></wrappedComponent> 
    }else{
        return <Redirect to={'/'} ></Redirect>
    }
  }
}
