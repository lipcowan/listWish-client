import React, { Component } from 'react';
import {Link} from 'react-router-dom'


export default class ListWishList extends Component {
    render() {
        const { list } = this.props

        return (
            <Link to={`/list/${list.id}`} className='ListWishList'>
                <div className='ListWishList__details'>
                    <div className='ListWishList__text'>
                        <h2 className='ListWishList__heading'>{list.list_title}</h2>
                        <p className='ListWishList__description'>{list.list_description}</p>
                    </div>
                </div>
            </Link>
        )    
    }
}