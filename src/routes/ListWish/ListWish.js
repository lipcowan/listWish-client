import React, {Component} from 'react'
import ListContext /*, {nullList} */ from '../../contexts/ListContext'
import ListApiService from '../../services/list-api-service'
import WishForm from '../../components/WishForm/WishForm'
import { Hyph, Section } from '../../components/Utils/Utils'

export default class ListWish extends Component {
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

    renderList() {
        const { list, wishes } = this.context
        return <>
          <h2>{list.list_title}</h2>
          <Hyph />
          <p>{list.list_description}</p>
          <Hyph/>
          {/* <ListAuthor list={list}/>
          <Hyph /> */}
          <ListWishes wishes={wishes}/>
          <WishForm />
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

// function ListAuthor({list = nullList}) {
//     return (
//       <span className='ListWish__author'>
//         {list.user.preferred_name}
//       </span>
//     )
// }

function ListWishes({ wishes = []}) {
    return (
        <ul className='ListWish__wishes'>
            {wishes.map(wish => 
              <li key={wish.id} className='ListWish__wish'>
                  <p className='ListWish__wish_title'>
                      {wish.wish_title}
                  </p>
                  <p className='ListWish__wish-url'>
                      {wish.wish_url}
                  </p>
              </li>
            )}
        </ul>
    )
}