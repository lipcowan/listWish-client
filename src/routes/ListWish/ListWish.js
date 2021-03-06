import React, {Component} from 'react'
import ListContext from '../../contexts/ListContext'
import ListApiService from '../../services/list-api-service'
import WishForm from '../../components/WishForm/WishForm'
import Wish from '../../components/Wish/Wish'
import { Section, Button } from '../../components/Utils/Utils'
import './ListWish.css'

export default class ListWish extends Component {
    state = {
        add: false,
        reduce: false,
    }

    static defaultProps = {
        match: { params: {} },
    }

    static contextType = ListContext

    componentDidMount() {
        this.getList()
    }

    componentWillUnmount() {
        this.context.clearList()
    }

    getList = () => {
        const { listId } = this.props.match.params
        this.context.clearError()
        ListApiService.getList(listId)
        .then(this.context.setList)
        .catch(this.context.setError)
        ListApiService.getListWishes(listId)
        .then(this.context.setWishes)
        .catch(this.context.setError)
    }
    

    addWishButtonHandler = () => {
        !this.state.add
                ? this.setState({add: true})
                : this.setState({add: false})
    }

    onDelete = (wishId) => {
        this.getList()
         // working on removing from state/context instead of a bandwith heavy option
    //    const { list } = this.context
    //    this.context.setList(list.filter(listItem => wishId !== listItem.id))
    }

    ListWishes = ( wishes = [], listId) => {
        return (
            <ul className='ListWish__wishes'>
                {wishes.map(wish => 
                  <Wish onDelete={this.onDelete} listId={listId} key={wish.id} id={wish.id} title={wish.wish_title} url={wish.wish_url}/>
                )}
            </ul>
        )
    }
 
    renderList() {
        const { list, wishes } = this.context
        return <>
          <h2>{list.list_title}</h2>
          <p>{list.list_description}</p>
          {this.ListWishes(wishes, list.id)}
          <Button className='Button__AddWish' onClick={() => this.addWishButtonHandler()}> + Add New Wish </Button>
          {(this.state.add) ? <WishForm addWish={this.addWishButtonHandler}/> : null }
        </>
    }

    render() {
        const { error, list } = this.context
        let content 
        if (error) {
            content = (error.error === `List doesn't exist`)
              ?  <p className='red'>List not found</p>
              :  <p className='red'> There was an error </p>
        } else if (!list.id) {
            content = <div className='loading' />
        } else {
            content = this.renderList()
        }
        return (
            <Section className='ListWish'>
                {content}
            </Section>
        )
    }
}