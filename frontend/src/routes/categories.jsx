import { useState, useEffect } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  const { categoryId } = useParams();

  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [bets, setBets] = useState({});
  const [complete, setComplete] = useState(false);

  const pic_url =
    "https://pbs.twimg.com/profile_images/1749700193333743616/K037laO3_400x400.jpg";

  const [image, setImage] = useState(pic_url);

  async function fetchCategories() {
    await fetch("https://aposcar-api.fly.dev/api/categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data.categories);
      });

    await fetch("https://aposcar-api.fly.dev/api/players")
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

  useEffect(() => {
    let complete = true;

    categories.forEach((category) => {
      if (!bets[category.id]) {
        complete = false;
      }
    });

    setComplete(complete);
  }, [bets, categoryId]);

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
    if (!complete) {
      alert("Please bet on all categories");
      return;
    }

    const betsObj = bets;

    const userObj = {
      player: {
        name: betsObj.username,
        pic_url: betsObj.pic_url,
        letterboxd: betsObj.letterboxd,
      },
    };

    let user = {};

    delete betsObj.username;
    delete betsObj.pic_url;
    delete betsObj.letterboxd;

    await fetch("https://aposcar-api.fly.dev/api/players", {
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

      fetch("https://aposcar-api.fly.dev/api/bets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(betObj),
      })
        .then((res) => {
          return res.json();
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

      <div className="flex py-5 flex-col-reverse lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
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

        <div className="w-full lg:w-3/4">
          <Outlet context={[categories, bets, setBets]} />

          {!categoryId && (
            <div className="flex flex-col bg-neutral-900 rounded-md border border-neutral-800 items-center py-8">
              <h1 className="text-2xl lg:text-3xl font-semibold pb-4">
                Welcome to Aposcar!
              </h1>

              <img
                src={image}
                alt={bets.username}
                className="rounded-full object-cover w-48 h-48 lg:w-72 lg:h-72 my-2"
              />

              <div className="my-2 px-8 w-full md:w-1/2 lg:w-1/3">
                <h3 className="text-xl mt-3">Username</h3>
                <input
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => updateBets("username", e.target.value)}
                  className="bg-neutral-800 py-2 px-2 rounded-md border border-neutral-700 mt-1 w-full"
                />
              </div>

              <div className="my-2 px-8 w-full md:w-1/2 lg:w-1/3">
                <h3 className="text-xl mt-3">Profile Picture URL</h3>
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

              <div className="my-2 px-8 w-full md:w-1/2 lg:w-1/3">
                <h3 className="text-xl mt-3">Letterboxd profile</h3>
                <input
                  type="text"
                  placeholder="Enter your letterboxd"
                  onChange={(e) => updateBets("letterboxd", e.target.value)}
                  className="bg-neutral-800 py-2 px-2 rounded-md border border-neutral-700 my-2 w-full"
                />
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
              <button
                className="bg-neutral-700 text-neutral-200 py-2 px-8 rounded-md hover:bg-neutral-800 hover:text-neutral-50"
                onClick={() => {
                  categoryId > 1
                    ? navigate(`/categories/${parseInt(categoryId) - 1}`)
                    : navigate(`/categories/${categories.length}`);
                }}
              >
                Back
              </button>

              <button
                className="bg-yellow-300 text-neutral-900 py-2 px-8 rounded-md hover:bg-yellow-200 hover:text-neutral-800"
                onClick={() => {
                  categoryId < categories.length
                    ? navigate(`/categories/${parseInt(categoryId) + 1}`)
                    : navigate(`/categories/1`);
                }}
              >
                Next
              </button>
            </div>
          )}

          <div className="flex justify-end">
            {complete && (
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
