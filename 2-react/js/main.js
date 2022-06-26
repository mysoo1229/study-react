import store from './js/Store.js';
import { formatRelativeDate } from "./js/helpers.js";

const TabType = {
  KEYWORD: 'KEYWORD',
  HISTORY: 'HISTORY'
}

const TabLabel = {
  [TabType.KEYWORD]: '추천 검색어',
  [TabType.HISTORY]: '최근 검색어',
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: '',
      searchResult: '',
      submitted: false,
      selectedTab: TabType.KEYWORD,
      keywordList: [],
      historyList: []
    }
  }

  handleChangeInput(event) {
    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0 && this.state.submitted) {
      return this.handleReset();
    }

    this.setState({ searchKeyword });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.search(this.state.searchKeyword);
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword);
    const historyList = store.getHistoryList();

    this.setState({
      searchKeyword: searchKeyword,
      searchResult,
      submitted: true,
      historyList
    })
  }

  handleReset() {
    this.setState({
      searchKeyword: '',
      submitted: false
    });
  }

  componentDidMount() {
    const keywordList = store.getKeywordList();
    const historyList = store.getHistoryList();

    this.setState({
      keywordList,
      historyList
    });
  }

  handleClickRemoveHistory(keyword) {
    store.removeHistory(keyword);
    const historyList = store.getHistoryList();

    this.setState({
      historyList
    })
  }

  render() {
    const searchForm = (
      <form
        onSubmit={event => this.handleSubmit(event)}
        onReset={() => this.handleReset()}
      >
        <label className="input-search">
          <input
            type="text"
            autoFocus
            value={this.state.searchKeyword}
            onChange={event => this.handleChangeInput(event)}
          />
          {this.state.searchKeyword.length == 0 && (<span className="placeholder">검색어를 입력하세요</span>)}
        </label>
        {this.state.searchKeyword.length > 0 && (<button type="reset" className="button-reset" aria-label="검색어 삭제"></button>)}
      </form>
    );

    const searchResult = (
      this.state.searchResult.length > 0 ? (
        <ul className="result">
          {this.state.searchResult.map(item => {
            return (
              <li key={item.id}>
                <span><img src={item.imageUrl} alt="" /></span>
                <p>{item.name}</p>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="empty-box">검색 결과가 없습니다</div>
      )
    );

    const keywordList = (
      <ul className="list">
        {this.state.keywordList.map((item, index) => {
          return (
            <li key={item.id}>
              <span className="number">{index + 1}</span>
              <button
                type="button"
                onClick={() => this.search(item.keyword)}
              >
                {item.keyword}
              </button>
            </li>
          )
        })}
      </ul>
    )

    const historyList = (
      <ul className="list">
        {this.state.historyList.map(({id, keyword, date}) => {
          return (
            <li key={id}>
              <button type="button" onClick={() => this.search(keyword)}>{keyword}</button>
              <span className="date">{formatRelativeDate(date)}</span>
              <button
                className="button-remove"
                onClick={() => this.handleClickRemoveHistory(keyword)}
                aria-label="삭제"
              ></button>
            </li>
          )
        })}
      </ul>
    )

    const tabs = (
      <>
      <ul className="tabs">
        {Object.values(TabType).map(tabType => {
          return (
            <li key={tabType}>
              <button
                type="button"
                data-tab={tabType}
                aria-selected={this.state.selectedTab === tabType ? true : false}
                onClick={() => this.setState({ selectedTab: tabType })}
              >
                {TabLabel[tabType]}
              </button>
            </li>
          )
        })}
      </ul>
      {this.state.selectedTab === TabType.KEYWORD && keywordList}
      {this.state.selectedTab === TabType.HISTORY && historyList}
      </>
    );

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          {searchForm}
          <div className="content">
            {this.state.submitted ? searchResult : tabs}
          </div>
        </div>
      </>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
