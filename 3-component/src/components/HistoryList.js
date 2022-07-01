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
    const { onKeywordClick } = this.props;
    const { historyList } = this.state;

    return(
      <List
        data={historyList}
        onKeywordClick={onKeywordClick}
        hasDate
        onRemoveClick={(keyword) => this.handleClickRemoveHistory(keyword)}
      />
    )
  }
}
