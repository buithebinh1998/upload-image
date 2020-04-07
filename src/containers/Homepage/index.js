import React, { Component } from 'react'
import Item from '../../components/item'

export default class HomePage extends Component{
    constructor(props){
        super(props);

        this.state = {
            data : [
                {
                    id: 1,
                    name: 'Soap',
                    deal: 20
                },
                {
                    id: 2,
                    name: 'Shampoo',
                    deal: 10
                },
                {
                    id: 3,
                    name: 'Detergent',
                },
            ],
            value: 1,
        }
    }

    getDataDetail = (item) => {
        console.log(item);
    }

    render(){
        return(
            <div>
                <h1 style={{textAlign:'center', color: 'red'}}>Welcome to homepage</h1>
                <h2>List of item: </h2>
                <div>
                    <Item data={this.state.data} getData={this.getDataDetail}/>
                </div>
            </div>
        )
    }
}
