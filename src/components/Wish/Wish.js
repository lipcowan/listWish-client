import React, {Component} from 'react'
import ListContext from '../../contexts/ListContext'
import EditWishForm from '../../components/WishForm/EditWishForm'


export default class Wish extends Component {

    state = {
        edit: false,
    }

    static contextType = ListContext

    editButtonHandler = () => {
        this.setState({edit: false})
    }

    renderWish () {

        return (
            <li className='ListWish__wish'>
            <button onClick={e => {
                this.state.edit 
                ? this.setState({edit: false})
                : this.setState({edit: true})}}> 
                Edit 
            </button>
            {(this.state.edit) ? <EditWishForm id={this.props.id} title={this.props.title} url={this.props.url} edit={this.editButtonHandler}/> : <> <p className='ListWish__wish_title'>
                {this.props.title}
            </p>
            <p className='ListWish__wish-url'>
                {this.props.url} 
            </p> </>}
            </li>
        )
    }

    render() {
       return this.renderWish()
    }
}
