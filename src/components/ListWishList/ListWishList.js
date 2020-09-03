import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './ListWishList.css'


export default class ListWishList extends Component {
    render() {
        const { list } = this.props

        return (
            <Link to={`/list/${list.id}`} className='ListWishList'>
                <header className='ListWishList__header'>
                    <h2 className='ListWishList__heading'>
                        {list.list_title}</h2>
                </header>
                <p className='ListWishList__description'>
                            {list.list_description}</p>
            </Link>
        )    
    }
}
