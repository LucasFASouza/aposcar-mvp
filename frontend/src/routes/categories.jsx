import { useState, useEffect } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

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
          [category.id]: 1,
        };
      });
    });
  }, [categories]);

  return (
    <div className="bg-neutral-950 text-neutral-300 px-8 py-4">
      <Link to="/" className="text-3xl text-yellow-300">
        Aposcar
      </Link>

      <div className="flex  py-5">
        <div className="w-1/4">
          <div className="border border-neutral-800">
            {categories.map((category) => {
              return (
                <Link to={`/categories/${category.id}`} key={category.id}>
                  <div
                    className={`py-1 px-6 border bg-neutral-900 border-neutral-800 hover:cursor-pointer
                    ${
                      !bets[category.id] && categoryId != category.id
                        ? "bg-neutral-700"
                        : ""
                    }
                    ${
                      categoryId == category.id
                        ? "bg-yellow-300 text-neutral-800"
                        : "hover:bg-neutral-800 "
                    }
                    
                    `}
                  >
                    {category.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="w-3/4 ml-8">
          <Outlet context={[categories, bets, setBets]} />
          {!categoryId && (
            <div className="text-3xl">Please select a category</div>
          )}

          {categoryId && (
            <div className="flex justify-between">
              <div>
                {categoryId > 1 && (
                  <button
                    className="bg-neutral-700 text-neutral-200 py-2 px-8 rounded-md"
                    onClick={() =>
                      navigate(`/categories/${parseInt(categoryId) - 1}`)
                    }
                  >
                    Back
                  </button>
                )}
              </div>

              <div>
                {categoryId < categories.length && (
                  <button
                    className="bg-yellow-300 text-neutral-900 py-2 px-8 rounded-md"
                    onClick={() =>
                      navigate(`/categories/${parseInt(categoryId) + 1}`)
                    }
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
          <div className="flex justify-end">
            {Object.values(bets).every((value) => value !== null) && (
              <button className="py-3 px-6 rounded-md text-xl mt-6 text-yellow-300 bg-neutral-900 border border-yellow-300 hover:bg-yellow-300 hover:text-neutral-900">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
