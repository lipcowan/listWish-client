import React, { Component } from 'react'

export const nullList = {
    list_title: '',
    list_description: '',
    user: {}
}

export const nullWish = {
    wish_title: '',
    wish_url: '',
    user: {},

}

const ListContext = React.createContext({
    list: nullList,
    wishes: [nullWish, ],
    error: null,
    setError: () => {},
    clearError: () => {},
    setList: () => {},
    clearList: () => {},
    setWishes: () => {},
    addWish: () => {},
    updateWish: () => {},
    deleteWish: () => {},
})

export default ListContext

export class ListProvider extends Component {
    state = {
        list: nullList,
        wishes: [nullWish, ],
        error: null
    };

    setError = error => {
        console.error(error)
        this.setState({error})
    }

    clearError = () => {
        this.setState({error: null})
    }

    setList = list => {
        this.setState({list: list})
    }

   

    setWishes = wishes => {
        this.setState({wishes: wishes})
    }

    clearList = () => {
        this.setList(nullList)
        this.setWishes([])
    }

    addWish = wish => {
        this.setWishes([
            ...this.state.wishes,
            wish
        ])
    }

    updateWish = () => {} 

    deleteWish = () => {}

    render() {
        const value = {
            list: this.state.list,
            wishes: this.state.wishes,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setList: this.setList,
            setWishes: this.setWishes,
            clearList: this.clearList,
            addWish: this.addWish,
            updateWish: this.updateWish,
            deleteWish: this.deleteWish,
        }
        return (
            <ListContext.Provider value={value}>
                {this.props.children}
            </ListContext.Provider>
        )
    }
}