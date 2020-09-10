import React, { Component } from 'react'
import ListContext from '../../contexts/ListContext'
import ListApiService from '../../services/list-api-service'
import { Button, Input } from '../Utils/Utils'


export default class EditWishForm extends Component {

    state = {
        title: null,
        url: null,
    }

    static contextType = ListContext

    handleSubmit = e => {
        e.preventDefault()
        const { list } = this.context
        const { wish_title, wish_url } = e.target

        ListApiService.editWish(list.id, this.props.id, wish_title.value, wish_url.value )
          .then(() => ListApiService.getListWishes(list.id)
        .then(this.context.setWishes)
        .then(this.props.edit)
        .catch(this.context.setError))
          .then(() => {
              this.setState({title: null})
          })
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
                      Wish Title:
                  </label>
                  <Input 
                    name='wish_title'
                    type='text'
                    required
                    id='WishForm__wish_title'
                    value={this.state.title == null ? this.props.title : this.state.title}
                    onChange={(e) => this.setState({title: e.target.value})}
                    >
                  </Input>
              </div>
              <div className='wish_url'>
                  <label htmlFor='WishForm__wish_url'>
                      Wish URL: 
                  </label>
                  <Input
                    name='wish_url'
                    type='text'
                    id='WishForm__wish_url'
                    value={this.state.url == null ? this.props.url : this.state.url}
                    onChange={e => this.setState({url: e.target.value})}
                    >
                  </Input>
              </div>
              <Button type='submit'>
                  Change wish
              </Button>
            </form>
        )
    }
}
