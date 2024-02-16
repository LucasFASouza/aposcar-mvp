import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const [bets, setBets] = useState({});

  async function fetchCategories() {
    await fetch("http://127.0.0.1:8000/api/categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data.categories);
      });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setBets({
      username: "",
      pic_url: "",
    });

    categories.forEach((category) => {
      setBets((prevBets) => {
        return {
          ...prevBets,
          [category.id]: null,
        };
      });
    });
  }, [categories]);

  return (
    <div className="bg-neutral-950 text-neutral-300 px-8 py-4">
      <h1 className="text-3xl">Aposcar</h1>
      <div className="flex flex-row py-5">
        <div className="w-1/4">
          <div>
            {categories.map((category) => {
              return (
                <div key={category.id}>
                  <Link to={`/categories/${category.id}`}>{category.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-3/4">
          <Outlet context={[categories, bets, setBets]} />
        </div>
      </div>
    </div>
  );
}
