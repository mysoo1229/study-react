import store from './js/Store.js';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: '',
      searchResult: '',
      submitted: false
    }
  }

  handleChangeInput(event) {
    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0) {
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
    this.setState(() => {
      return { searchKeyword: '' } 
    }, () => {
      console.log('리셋됨');
    })
  }

  render() {
    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
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

          <div className="content">
            {this.state.submitted && (
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
            )}
          </div>
        </div>
      </>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
