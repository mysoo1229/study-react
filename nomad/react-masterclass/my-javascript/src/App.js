import { useEffect, useState } from "react";

const useNetwork = (onchange) => {
  const [status, setStatus] = useState(navigator.onLine);
  //navigator.onLine : is a booelan to check if online/offline

  const handleChange = () => {
    setStatus(navigator.onLine);
  };

  useEffect(() => {
    if (typeof onchange !== "function") {
      return;
    }

    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);

    return () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);

  return status;
};

const App = () => {
  const handleNetworkChange = (online) => {
    console.log(online ? "We are online" : "We are offline");
  };
  const onLine = useNetwork(handleNetworkChange);

  return (
    <div className="App">
      <h1>{onLine ? "onLine" : "offLine"}</h1>
    </div>
  );
};

export default App;
