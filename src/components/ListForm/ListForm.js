import React, { Component } from "react";
import ListWishContext from "../../contexts/ListWishContext";
import ListApiService from "../../services/list-api-service";
import { Button, Input, Required, Hyph } from "../Utils/Utils";

export default class ListForm extends Component {
  static contextType = ListWishContext;

  handleSubmit = (e) => {
    e.preventDefault();
    const { list_title, list_description } = e.target;

    ListApiService.postList(list_title.value, list_description.value)
      .then(this.context.addList)
      .then(() => {
        list_description.value = "";
        list_title.value = "";
      })
      .catch(this.context.setError);
  };

  render() {
    return (
      <form className="ListForm" onSubmit={this.handleSubmit}>
        <div className="List_title">
          <label htmlFor="ListForm__list_title">
            List Title: <Required />
          </label>
          <Input
            name="list_title"
            type="text"
            required
            id="ListForm__list_title"
          ></Input>
        </div>
        <div className="List_Description">
          <label htmlFor="ListForm__list_description">
            Description: 
          </label>
          <Input
            name="list_description"
            type="text"
            id="ListForm__list_description"
          ></Input>
        </div>
        <Hyph />
        <Button type="submit">Create New List</Button>
      </form>
    );
  }
}