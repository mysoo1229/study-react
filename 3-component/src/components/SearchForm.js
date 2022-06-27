import React from 'react';

export default class SearchForm extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: '',
    }
  }

  handleChangeInput(event) {
    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0) {
      this.handleReset();
    }

    this.setState({ searchKeyword });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.searchKeyword);
  }

  handleReset() {
    this.props.onReset();
  }

  render() {
    return (
      <form
        onSubmit={event => this.handleSubmit(event)}
        onReset={() => this.handleReset()}
      >
        <label className="input-search">
          <input
            type="text"
            value={this.state.searchKeyword}
            onChange={event => this.handleChangeInput(event)}
          />
          {this.state.searchKeyword.length == 0 && (<span className="placeholder">검색어를 입력하세요</span>)}
        </label>
        {this.state.searchKeyword.length > 0 && (<button type="reset" className="button-reset" aria-label="검색어 삭제"></button>)}
      </form>
    );
  }
}
