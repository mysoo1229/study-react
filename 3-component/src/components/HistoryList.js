import React from "react";
import List from "./List.js";
import store from "../Store.js";
import { formatRelativeDate } from "../helpers.js"

export default class HistoryList extends List {
  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const data = store.getHistoryList();
    this.setState({ data });
  }

  handleClickRemoveHistory(keyword) {
    store.removeHistory(keyword);
    const historyList = store.getHistoryList();
    this.fetch();
  }

  renderItem(item) {
    return (
      <>
        <button
          type="button"
          onClick={() => this.props.onKeywordClick(item.keyword)}
        >{item.keyword}</button>
        <span className="date">{formatRelativeDate(item.date)}</span>
        <button
          className="button-remove"
          onClick={() => this.handleClickRemoveHistory(item.keyword)}
          aria-label="삭제"
        ></button>
      </>
    )
  }
}
