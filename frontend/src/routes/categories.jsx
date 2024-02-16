import { useState, useEffect } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  const { categoryId } = useParams();

  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [bets, setBets] = useState({});

  const pic_url =
    "https://img.nsctotal.com.br/wp-content/uploads/2023/11/oscar-2024.jpg";

  const [image, setImage] = useState(pic_url);

  async function fetchCategories() {
    await fetch("http://127.0.0.1:8000/api/categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data.categories);
      });

    await fetch("http://127.0.0.1:8000/api/players")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data.players);
      });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setBets({
      username: null,
      pic_url: pic_url,
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

  function updateBets(categoryId, nomineeId) {
    const betsObj = bets;
    betsObj[categoryId] = nomineeId;

    setBets(betsObj);
  }

  function startVoting() {
    if (users.some((user) => user.name === bets.username)) {
      alert("Username already exists");
    } else if (!bets.username || !bets.pic_url) {
      alert("Username and profile picture are required");
    } else {
      navigate(`/categories/${categories[0].id}`);
    }
  }

  async function submitBets(bets) {
    const betsObj = bets;

    const userObj = {
      player: {
        name: betsObj.username,
        pic_url: betsObj.pic_url,
      },
    };

    let user = {};

    delete betsObj.username;
    delete betsObj.pic_url;

    await fetch("http://127.0.0.1:8000/api/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        user = data;
      });

    Object.keys(betsObj).forEach((categoryId) => {
      let category = categories.find((category) => {
        return category.id == categoryId;
      });

      delete category.winner;
      delete category.nominees;

      const betObj = {
        bet: {
          player: user,
          category: category,
          movie: betsObj[categoryId],
        },
      };

      console.log(betObj);

      fetch("http://127.0.0.1:8000/api/bets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(betObj),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
    navigate("/");
  }

  return (
    <div className="bg-neutral-950 text-neutral-300 px-8 py-4 min-h-screen">
      <Link to="/" className="text-3xl text-yellow-300 hover:text-yellow-200">
        Aposcar
      </Link>

      <div className="flex  py-5">
        <div className="w-1/4">
          <div className="border border-neutral-800">
            {categories.map((category) => {
              return (
                <Link
                  to={bets.username ? `/categories/${category.id}` : "#"}
                  key={category.id}
                >
                  <div
                    className={`py-1 px-6 border hover:cursor-pointer
                    ${
                      categoryId == category.id
                        ? "bg-yellow-300 text-neutral-800 border-neutral-800"
                        : "hover:bg-neutral-700"
                    }
                    ${
                      !bets[category.id] && categoryId != category.id
                        ? "bg-neutral-800 border-neutral-700"
                        : "bg-neutral-900 border-neutral-800"
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
            <div className="flex flex-col bg-neutral-900 rounded-md border border-neutral-800 items-center py-8">
              <h1 className="text-3xl font-semibold text-yellow-300 pb-4">
                Welcome to Aposcar!
              </h1>

              <img
                src={image}
                alt={bets.username}
                style={{
                  borderRadius: "50%",
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                }}
                className="my-2"
              />

              <div className="my-2 w-1/3">
                <h3 className="text-xl mt-6">Username</h3>
                <input
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => updateBets("username", e.target.value)}
                  className="bg-neutral-800 py-2 px-2 rounded-md border border-neutral-700 mt-2 w-full"
                />
              </div>

              <div className="my-2 w-1/3">
                <h3 className="text-xl mt-6">Profile Picture URL</h3>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  onChange={(e) => {
                    updateBets("pic_url", e.target.value);
                    setImage(e.target.value);
                  }}
                  className="bg-neutral-800 py-2 px-2 rounded-md border border-neutral-700 my-2 w-full"
                />
                <p>
                  Create a{" "}
                  <Link
                    to="https://picrew.me/en/image_maker/644129"
                    target="_blank"
                    className="hover:text-neutral-50 underline"
                  >
                    piccrew
                  </Link>
                  , copy the image URL and paste it here!
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => startVoting()}
                  className="py-3 px-6 rounded-md text-xl mt-6 text-yellow-300 bg-neutral-900 border border-yellow-300 hover:bg-yellow-300 hover:text-neutral-900"
                >
                  Start
                </button>
              </div>
            </div>
          )}

          {categoryId && (
            <div className="flex justify-between">
              <div>
                {categoryId > 1 && (
                  <button
                    className="bg-neutral-700 text-neutral-200 py-2 px-8 rounded-md hover:bg-neutral-800 hover:text-neutral-50"
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
                    className="bg-yellow-300 text-neutral-900 py-2 px-8 rounded-md hover:bg-yellow-200 hover:text-neutral-800"
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
              <button
                onClick={() => {
                  submitBets(bets);
                }}
                className="py-3 px-6 rounded-md text-xl mt-6 text-yellow-300 bg-neutral-900 border border-yellow-300 hover:bg-yellow-300 hover:text-neutral-900"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
