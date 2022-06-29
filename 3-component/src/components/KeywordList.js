import React from "react";
import List from "./List.js";
import store from "../Store.js";

export default class KeywordList extends List {
  componentDidMount() {
    const data = store.getKeywordList();
    this.setState({ data })
  }

  renderItem(item, index) {
    return (
      <>
        <span className="number">{index + 1}</span>
        <button
          type="button"
          onClick={() => this.props.onClick(item.keyword)}
        >
          {item.keyword}
        </button>
      </>
    )
  }
}
