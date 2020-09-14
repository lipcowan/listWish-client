import React, {Component} from 'react'
import ListContext from '../../contexts/ListContext'
import {Button} from '../../components/Utils/Utils'
import EditWishForm from '../../components/WishForm/EditWishForm'
import ListApiService from '../../services/list-api-service'
import './Wish.css'


export default class Wish extends Component {

    state = {
        edit: false,
    }

    static contextType = ListContext

    editWishButtonHandler = () => {
        this.setState({edit: false})
    }

    deleteWishButtonHandler = (wishId) => {
        ListApiService.deleteWish(wishId)
        .then(this.props.onDelete)
    }

    

    renderWish () {

        return (
            <li className='ListWish__wish'>
            {(this.state.edit) 
              ? <EditWishForm id={this.props.id} title={this.props.title} url={this.props.url} edit={this.editWishButtonHandler}/> 
              : <>  
                    <p className='ListWish__wish_title'>
                        {this.props.title}
                    </p>
                    <p className='ListWish__wish_url'>
                        <a href={this.props.url}>{this.props.url}</a> 
                    </p> 
                </>
            }
            <Button className='Button__EditWish' onClick={e => {
                this.state.edit 
                ? this.setState({edit: false})
                : this.setState({edit: true})}}> 
                Edit Wish
            </Button>
            <Button className='Button__DeleteWish' onClick={e => this.deleteWishButtonHandler(this.props.id)}>
               - Delete Wish
            </Button>
            </li>
        )
    }

    render() {
       return this.renderWish()
    }
}
