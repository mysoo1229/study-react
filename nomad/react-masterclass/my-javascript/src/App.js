const usePreventLeave = () => {
  const listener = (event) =>{
    event.preventDefault();
    event.returnValue = ""; //for chrome
  }
  const enablePrevent = () => window.addEventListener("beforeunload", listener); //beforunload: 윈도우 닫히기 전에 하는 일
  const disablePrevent = () => window.removeEventListener("beforeunload", listener);

  return { enablePrevent, disablePrevent };
};

const App = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <div className="App">
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>Unprotect</button>
    </div>
  );
}

export default App;
