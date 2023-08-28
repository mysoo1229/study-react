import { useAxios } from "./hooks/useAxios";

const App = () => {
  const { loading, data, error, refetch } = useAxios({
    url: "https://api.themoviedb.org/3/movie/now_playing?page=1&api_key=6c61618f0f7e88b0c9c7babe5058cf8f&include_adult=false&page=1&region=kr"
  });

  return (
    <div className="App">
      <h1>{data && JSON.stringify(data.data.total_results)}</h1>
      <h2>{loading && "loading..."}</h2>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
};

export default App;
