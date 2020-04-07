import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

class DetailItem extends Component {
    render(){
        console.log(this.props);
        const text = this.props.location.data ? this.props.location.data.name: 'No Data';
        return(
            <div>
                <p>{text}</p>
                <NavLink activeStyle={{fontWeight:'bold', color:'red'}} to ='/'>Homepage</NavLink>
            </div>
        )
    }
}

export default DetailItem;