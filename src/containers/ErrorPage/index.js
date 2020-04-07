import React from 'react'
import {NavLink} from 'react-router-dom'
const ErrorPage = () =>{
    return(
        <div>
            <h1>Error</h1>
            <NavLink activeStyle={{fontWeight:'bold', color:'red'}} to ='/'>Homepage</NavLink>
        </div>
    )
}

export default ErrorPage;