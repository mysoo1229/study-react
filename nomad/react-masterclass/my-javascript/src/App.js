import { useState } from "react";

const tabs = [
  {
    tab: "Section 1",
    content: "content of section 1"
  },
  {
    tab: "Section 2",
    content: "content of section 2"
  }
];

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);

  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }

  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  };
};

function App() {
  const { currentItem, changeItem } = useTabs(0, tabs);

  return (
    <div className="App">
      {tabs.map((section, index) => (
        <button
          key={section.tab}
          onClick={() => changeItem(index)}
        >{section.tab}</button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
}

export default App;
