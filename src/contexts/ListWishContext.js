import React, {Component} from 'react'


const ListWishContext = React.createContext({
    listWishList: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setListWishList: () => {},
    addList: () => {},
})

export default ListWishContext

export class ListWishProvider extends Component {
    state = {
        listWishList: [],
        error: null, 
    };

    setListWishList = listWishList => {
        this.setState({ listWishList })
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null})
    }

    addList = list => {
        this.setListWishList([
            ...this.state.listWishList,
            list
        ])
    }

    render() {
        const value = {
            listWishList: this.state.listWishList,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setListWishList: this.setListWishList,
            addList: this.addList,
        }
        return (
            <ListWishContext.Provider value={value}>
                {this.props.children}
            </ListWishContext.Provider>
        )
    }
}