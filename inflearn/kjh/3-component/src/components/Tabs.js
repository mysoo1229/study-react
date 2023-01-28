import React from "react";

export const TabType = {
  KEYWORD: 'KEYWORD',
  HISTORY: 'HISTORY'
}

const TabLabel = {
  [TabType.KEYWORD]: '추천 검색어',
  [TabType.HISTORY]: '최근 검색어',
}

const Tabs = ({ selectedTab, onChange }) => {
  return (
    <ul className="tabs">
      {Object.values(TabType).map(tabType => {
        return (
          <li key={tabType}>
            <button
              type="button"
              data-tab={tabType}
              aria-selected={selectedTab === tabType ? true : false}
              onClick={() => onChange(tabType)}
            >
              {TabLabel[tabType]}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default Tabs;
