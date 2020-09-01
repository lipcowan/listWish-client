import React, {Component} from 'react'
import ListWishContext from '../../contexts/ListWishContext'
import ListApiService from '../../services/list-api-service'
import {Section} from '../../components/Utils/Utils'
import ListWishList from '../../components/ListWishList/ListWishList'

export default class ListWishPage extends Component {
    static contextType = ListWishContext

    componentDidMount() {
        this.context.clearError()
        ListApiService.getLists()
          .then(this.context.setListWishList)
          .catch(this.context.setError)
    }

    renderLists() {
        const { ListWishList = []} = this.context
        return ListWishList.map(list => 
          <ListWishList
            key={list.id}
            list={list}
          />    
        )
    }

    render() {
        const { error } = this.context
        return (
            <Section list className='ListWishPage'>
                {error
                  ? <p className='red'>There was an error, try again</p>
                  : this.renderLists()}
            </Section>
        )
    }
}