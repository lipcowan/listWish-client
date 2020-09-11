import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../Utils/Utils'
import ListApiService from '../../services/list-api-service'
import './ListWishList.css'


export default class ListWishList extends Component {

    deleteListButtonHandler = (listId) => {
        ListApiService.deleteList(listId)
        .then(this.props.onDelete)
      }

    render() {
        const { list } = this.props


        return (
            <>
            <Button className='Button__DeleteList'  onClick={e => this.deleteListButtonHandler(list.id)}>Delete List</Button>
            <Link to={`/list/${list.id}`} className='ListWishList'>
                <header className='ListWishList__header'>
                    <h2 className='ListWishList__heading'>
                        {list.list_title}</h2>
                </header>
                <p className='ListWishList__description'>
                            {list.list_description}</p>
            </Link>
            </>
        )    
    }
}
