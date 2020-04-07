import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import './item.css'

export default class Item extends Component{
    getData(data){
        this.props.getData(data);
    }
    render(){
        console.log(this.props);
        const listItems = this.props.data ? this.props.data.map((item,index) => {
            return(
                <li key={item.id}>
                    <div onClick={ () => this.getData(item)}>
                        <p>{index} - {item.id ? item.id: null}</p>
                        <p>{item.name ? item.name : null}</p>
                        <Link to={{pathname:`/detail/${item.id}`, data: item, search: `${item.deal ? `?deal=${item.deal}` : ''}`}}>View detail</Link>
                    </div>
                </li>
            )
        }) : null;
        return(
            <div>
                <ul>
                    {listItems}
                </ul>
                <Link to='/error'><p>Error page is here!</p></Link>
                <Link to='/profile'><p>Profile page is here! (auth = false)</p></Link>
            </div>
        )
    }
}

Item.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
        deal: PropTypes.number,
    })),
}