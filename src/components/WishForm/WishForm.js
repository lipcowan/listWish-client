import React, { Component } from 'react'
import ListContext from '../../contexts/ListContext'
import ListApiService from '../../services/list-api-service'
import { Button, Input, Required } from '../Utils/Utils'
import './WishForm.css'


export default class WishForm extends Component {

    static contextType = ListContext

    handleSubmit = e => {
        e.preventDefault()
        const { list } = this.context
        const { wish_title, wish_url } = e.target

        ListApiService.postWish(list.id, wish_title.value, wish_url.value )
          .then(this.context.addWish)
          .then(() => {
              wish_title.value = ''
              wish_url.value = ''
          })
          .then(this.props.addWish)
          .catch(this.context.setError)
    }

    

    
    render() {
            return (
                <form
                        className='WishForm'
                        onSubmit={this.handleSubmit}
                        >
                        <div className='wish_title'>
                            <label htmlFor='WishForm__wish_title'>
                                Wish Title: <Required/>
                            </label>
                            <Input 
                            name='wish_title'
                            type='text'
                            required
                            id='WishForm__wish_title'>
                            </Input>
                        </div>
                        <div className='wish_url'>
                            <label htmlFor='WishForm__wish_url'>
                                Wish URL: 
                            </label>
                            <Input
                            name='wish_url'
                            type='text'
                            id='WishForm__wish_url'>
                            </Input>
                        </div>
                        <Button className='Button__MakeNewWish' type='submit'>
                            Make a wish 
                        </Button>
                        </form>
            )
    }
}

