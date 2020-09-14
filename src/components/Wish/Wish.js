import React, {Component} from 'react'
import ListContext from '../../contexts/ListContext'
import {Button} from '../../components/Utils/Utils'
import EditWishForm from '../../components/WishForm/EditWishForm'
import ListApiService from '../../services/list-api-service'


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
            <Button onClick={e => {
                this.state.edit 
                ? this.setState({edit: false})
                : this.setState({edit: true})}}> 
                Edit Wish
            </Button>
            <Button onClick={e => this.deleteWishButtonHandler(this.props.id)}>
               - Delete Wish
            </Button>
            {(this.state.edit) 
              ? <EditWishForm id={this.props.id} title={this.props.title} url={this.props.url} edit={this.editWishButtonHandler}/> 
              : <>  
                    <p className='ListWish__wish_title'>
                        {this.props.title}
                    </p>
                    <p className='ListWish__wish-url'>
                        <a href={this.props.url}>{this.props.url}</a> 
                    </p> 
                </>
            }
            </li>
        )
    }

    render() {
       return this.renderWish()
    }
}
