import { useState, useEffect } from "react";
import { Outlet, Link, useParams } from "react-router-dom";

export default function Categories() {
  const { categoryId } = useParams();

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
      <Link to="/" className="text-3xl text-yellow-300">
        Aposcar
      </Link>
      <div className="flex flex-row py-5">
        <div className="w-1/4">
          <div className="border border-neutral-800">
            {categories.map((category) => {
              return (
                <Link to={`/categories/${category.id}`}>
                  <div
                    className="py-1 px-6 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:cursor-pointer"
                    key={category.id}
                  >
                    {category.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="w-3/4">
          <Outlet context={[categories, bets, setBets]} />
          {!categoryId && (
            <div className="text-3xl px-6">Please select a category</div>
          )}
        </div>
      </div>
    </div>
  );
}
