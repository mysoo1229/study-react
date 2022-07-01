import React from "react";
import List from "./List.js";
import store from "../Store.js";
import { formatRelativeDate } from "../helpers.js"

export default class HistoryList extends React.Component {
  constructor() {
    super();

    this.state = {
      historyList: []
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const historyList = store.getHistoryList();
    this.setState({ historyList });
  }

  handleClickRemoveHistory(keyword) {
    store.removeHistory(keyword);
    this.fetch();
  }

  render() {
    return(
      <List
        data={this.state.historyList}
        renderItem={(item) => {
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
        }}
      />
    )
  }
}
