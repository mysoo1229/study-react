import React from "react";
import { formatRelativeDate } from "../helpers.js"

const List = ({
    data = [],
    onKeywordClick,
    hasIndex = false,
    hasDate = false,
    onRemoveClick
  }) => {

  const handleClickRemoveHistory = (keyword) => {
    onRemoveClick(keyword);
  }

  return (
    <ul className="list">
      {data.map((item, index) => {
        return (
          <li key={item.id}>
            {hasIndex && <span className="number">{index + 1}</span>}
            <button
              type="button"
              onClick={() => onKeywordClick(item.keyword)}
            >
              {item.keyword}
            </button>
            {hasDate && <span className="date">{formatRelativeDate(item.date)}</span>}
            {!!onRemoveClick && (
              <button
                className="button-remove"
                onClick={() => handleClickRemoveHistory(item.keyword)}
                aria-label="삭제"
              ></button>
            )}
          </li>
        )
      })}
    </ul>
  );
};

export default List;
