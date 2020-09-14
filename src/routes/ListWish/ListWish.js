import React, {Component} from 'react'
import ListContext from '../../contexts/ListContext'
import ListApiService from '../../services/list-api-service'
import WishForm from '../../components/WishForm/WishForm'
import Wish from '../../components/Wish/Wish'
import { Hyph, Section, Button } from '../../components/Utils/Utils'

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
        const { listId } = this.props.match.params
        this.context.clearError()
        ListApiService.getList(listId)
        .then(this.context.setList)
        .catch(this.context.setError)
        ListApiService.getListWishes(listId)
        .then(this.context.setWishes)
        .catch(this.context.setError)
    }

    componentWillUnmount() {
        this.context.clearList()
    }

    addWishButtonHandler = () => {
        !this.state.add
                ? this.setState({add: true})
                : this.setState({add: false})
    }

 
    renderList() {
        const { list, wishes } = this.context
        return <>
          <h2>{list.list_title}</h2>
          <p>{list.list_description}</p>
          <Hyph/>
          <ListWishes listId={list.id} wishes={wishes}/>
          <Hyph/>
          <Button onClick={() => this.addWishButtonHandler()}> + Add New Wish </Button>
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

function ListWishes({ wishes = [], listId}) {
    return (
        <ul className='ListWish__wishes'>
            {wishes.map(wish => 
              <Wish listId={listId} key={wish.id} id={wish.id} title={wish.wish_title} url={wish.wish_url}/>
            )}
        </ul>
    )
}