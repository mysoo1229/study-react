import React from "react";

export default class List extends React.Component {
  constructor() {
    super();

    this.state = {
      data: []
    }
  }

  renderItem(item, index) {
    throw 'renderItem()을 구현하세요';
  }

  render() {
    return (
      <ul className="list">
        {this.state.data.map((item, index) => {
          return (
            <li key={item.id}>
              {this.renderItem(item, index)}
            </li>
          )
        })}
      </ul>
    )
  }
}
