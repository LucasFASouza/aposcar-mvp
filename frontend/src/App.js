import "./App.css";
import { useState, useEffect } from "react";
import Voting from "./components/Voting";

function App() {
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCategories(data.categories);
      });

    fetch("http://127.0.0.1:8000/api/movies")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMovies(data.movies);
      });
  }, []);

  return (
    <div className="App">
      <h1>Movie Awards</h1>
      {categories.map((category) => (
        <Voting key={category.id} category={category} movies={movies} />
      ))}
    </div>
  );
}

export default App;
