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
      username: null,
      pic_url: null,
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

  function updateBets(categoryId, nomineeId) {
    const betsObj = bets;
    betsObj[categoryId] = nomineeId;

    setBets(betsObj);
  }

  return (
    <div className="bg-neutral-950 text-neutral-300 px-8 py-4">
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
            <div className="flex flex-col bg-neutral-900 rounded-md border border-neutral-800 items-center py-8">
              <img
                src={
                  bets.pic_url
                    ? bets.pic_url
                    : "https://scontent.fcgh22-1.fna.fbcdn.net/v/t39.30808-6/305964648_950959589144333_4486772196625135245_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeFoO-UmUvHbkxC-9P3xc3DRInZbWpMOpMYidltakw6kxvlYGDhAFjecSxRD52yb4L37F8bdg5nD4JhdbGbAuxSm&_nc_ohc=WZu4_O-WUzQAX8OwQUH&_nc_oc=AQkABtWFUAoQm2_SimdTi2GhwyYMIyd4dqfB8tUm4FrNy1mGqXGeSVDBj9CxJ5xdQv8tbvIhXwAcMD8sy3-fY7dE&_nc_ht=scontent.fcgh22-1.fna&oh=00_AfAeISnQL5B8IpJWwLvfq61mxjujD3RVExjNMQXr50FlJA&oe=65D42C87"
                }
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
                  onChange={(e) => updateBets("pic_url", e.target.value)}
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
                  onClick={() => {
                    if (bets.username) {
                      navigate(`/categories/1`);
                    }
                  }}
                  className="py-3 px-6 rounded-md text-xl mt-6 text-yellow-300 bg-neutral-900 border border-yellow-300 hover:bg-yellow-300 hover:text-neutral-900"
                >
                  Submit
                </button>
              </div>
            </div>
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
