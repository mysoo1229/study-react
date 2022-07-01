import React from "react";

const List = ({data=[], renderItem}) => {
  return (
    <ul className="list">
      {data.map((item, index) => {
        return (
          <li key={item.id}>
            {renderItem(item, index)}
          </li>
        )
      })}
    </ul>
  );
};

export default List;
