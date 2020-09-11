import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../Utils/Utils'
import ListApiService from '../../services/list-api-service'
import TokenService from '../../services/token-service'
import './ListWishList.css'



export default class ListWishList extends Component {

    deleteListButtonHandler = (listId) => {
        ListApiService.deleteList(listId)
        .then(this.props.onDelete)
      }

    renderDeleteButton = (props) => {
        const list = this.props.list
        if (TokenService.hasAuthToken()) 
        return (<Button className='Button__DeleteList'  onClick={e => this.deleteListButtonHandler(list.id)}>Delete List</Button>) 
        else
        return <> </> 
    }

    render() {
        const { list } = this.props


        return (
            <div className='ListWishList__Container'>
            <Link to={`/list/${list.id}`} className='ListWishList'>
                <header className='ListWishList__header'>
                    <h2 className='ListWishList__heading'>
                        {list.list_title}</h2>
                </header>
                <p className='ListWishList__description'>
                            {list.list_description}</p>
            </Link>
            <this.renderDeleteButton/>
            </div>
        )    
    }
}
