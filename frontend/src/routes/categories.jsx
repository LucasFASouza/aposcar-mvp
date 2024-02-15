import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);

  const [bets, setBets] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data.categories);
      });

    fetch("http://127.0.0.1:8000/api/movies")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMovies(data.movies);
      });
  }, []);

  useEffect(() => {
    console.log(categories);
    categories.forEach((category) => {
      setBets((prevBets) => {
        return {
          ...prevBets,
          [category.id]: null,
        };
      });
    });

    setUser({
      username: "",
      pic_url: "",
    });
  }, [categories]);

  return (
    <>
      <div id="sidebar">
        <h1>Aposcar</h1>
        <nav>
          <ul>
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <Link to={`/categories/${category.id}`}>{category.name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet context={{movies, categories}} />
      </div>
    </>
  );
}
