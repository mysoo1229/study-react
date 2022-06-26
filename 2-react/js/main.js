import store from './js/Store.js';

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
      selectedTab: TabType.KEYWORD
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
    const searchResult = store.search(searchKeyword)
    this.setState({
      searchResult,
      submitted: true
    })
  }

  handleReset() {
    this.setState({
      searchKeyword: '',
      submitted: false
    });
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
      {this.state.selectedTab === TabType.KEYWORD && <>추천검색어</>}
      {this.state.selectedTab === TabType.HISTORY && <>최근검색어</>}
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
