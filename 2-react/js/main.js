class App extends React.Component { //Controlled Component =  React가 관리하는 것
  constructor() {
    super();

    this.state = {
      searchKeyword: '' //입력값을 React가 관리할 수 있도록 여기 넣어둠
    }
  }

  handleChangeInput(event) {
    // 이건 model과 view를 계속 업데이트하는 방식이라 React를 적절히 사용하는게 아님
    // this.state.searchKeyword = event.target.value;
    // this.forceUpdate(); //강제로 다시 render 하도록

    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0) {
      return this.handleReset();
    }

    this.setState({ searchKeyword });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit:', this.state.searchKeyword);
  }

  handleReset() {
    // this.setState({ searchKeyword: '' }); 이건 비동기로 임시 저장된 값만 바꿔줌.

    this.setState(() => { //변경된 상태값을 전달
      return { searchKeyword: '' } 
    }, () => { //모든 업데이트가 끝났으니 호출됨
      console.log('handleSubmit:', this.state.searchKeyword);
    })
  }

  render() {
    // [method 1] using element
    // let placeholder = <span className="placeholder">검색어를 입력하세요</span>;
    // let resetButton = null;

    // if (this.state.searchKeyword.length > 0) {
    //   placeholder = null;
    //   resetButton = <button type="reset" className="button-reset" aria-label="검색어 삭제"></button>
    // }

    // [method 2] using ternary operator (밑에 return 값에)
    // {this.state.searchKeyword.length > 0 ? (
    //   <button type="reset" className="button-reset" aria-label="검색어 삭제"></button>
    // ) : null}

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
        </div>
      </>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
