import React, { Component } from "react";
import ListWishContext from "../../contexts/ListWishContext";
import ListApiService from "../../services/list-api-service";
import { Section, Button } from "../../components/Utils/Utils";
import ListWishList from "../../components/ListWishList/ListWishList";
import ListForm from "../../components/ListForm/ListForm";
import TokenService from '../../services/token-service'
import './ListWishPage.css'

export default class ListWishPage extends Component {
  state = {
    add: false,
  };

  static contextType = ListWishContext;

  componentDidMount() {
    this.context.clearError();
    ListApiService.getLists()
      .then(this.context.setListWishList)
      .catch(this.context.setError);
  }

  addListButtonHandler = () => {
    !this.state.add
      ? this.setState({ add: true })
      : this.setState({ add: false });
  };

  addedList = () => {
    this.setState({add: false})
  }

  refreshLists = () => {
    ListApiService.getLists()
      .then(this.context.setListWishList)
      .catch(this.context.setError)
  }
  

  renderLists() {
    const { listWishList = [] } = this.context;
    return listWishList.map((list) => (
      <ListWishList onDelete={this.refreshLists} key={list.id} list={list} />
    ));
  }

  renderAddButton() {
    if (TokenService.hasAuthToken())
       return (
        <Button className='Button__AddList' onClick={() => this.addListButtonHandler()}>
          + Add New List
        </Button>
      )
    else 
      return (
        <p className='AddPlaceHolder'>Please login or create an account to add a new list</p>
      )
  }

  render() {
    const { error } = this.context;
    return (
      <>
        <Section list className="ListWishPage">
          {error ? (
            <p className="red">There was an error, try again</p>
          ) : (
            this.renderLists()
          )}
        </Section>
        <Section className='ListWishPage__ButtonAndFormContainer'>
        <this.renderAddButton/>
        {this.state.add ? (
          <ListForm addedList={this.addedList} addList={this.addListsButtonHandler} />
        ) : null}
        </Section>
      </>
    );
  }
}
