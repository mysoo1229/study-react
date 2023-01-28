import React from 'react';

const SearchForm = ({ value, onChange, onSubmit, onReset}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  }

  const handleReset = (props) => {
    onReset();
  }

  const handleChangeInput = (event) => {
    const searchKeyword = event.target.value;
    onChange(event.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <label className="input-search">
        <input
          type="text"
          value={value}
          onChange={handleChangeInput}
        />
        {value.length == 0 && (<span className="placeholder">검색어를 입력하세요</span>)}
      </label>
      {value.length > 0 && (<button type="reset" className="button-reset" aria-label="검색어 삭제"></button>)}
    </form>
  );
}

export default SearchForm;
