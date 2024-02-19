import { useState, useEffect } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [bets, setBets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [points, setPoints] = useState({});
  const [rightAnswers, setRightAnswers] = useState({});
  const [positions, setPositions] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [winners, setWinners] = useState({});

  const { userId } = useParams();

  async function fetchBets() {
    await fetch("https://aposcar-api.fly.dev/api/players")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data.players);
      });

    await fetch("https://aposcar-api.fly.dev/api/bets")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBets(data.bets);
      });

    await fetch("https://aposcar-api.fly.dev/api/categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data.categories);
      });
  }

  useEffect(() => {
    fetchBets();
  }, []);

  useEffect(() => {
    let pointsObj = {};
    let rightAnswersObj = {};

    users?.forEach((user) => {
      pointsObj[user.name] = 0;
      rightAnswersObj[user.name] = 0;
    });

    bets?.forEach((bet) => {
      let category = categories.find(
        (category) => category?.id === bet.category?.id
      );

      if (category?.winner?.id == bet.movie?.id) {
        if (category?.type == "Main") {
          pointsObj[bet.player?.name] += 10;
        } else {
          pointsObj[bet.player?.name] += 5;
        }

        rightAnswersObj[bet.player?.name] += 1;
      }
    });

    setPoints(pointsObj);
    setRightAnswers(rightAnswersObj);
  }, [bets]);

  useEffect(() => {
    if (!points) return;

    let usersObj = users;

    usersObj.sort((a, b) => points[b.name] - points[a.name]);
    setUsers(usersObj);

    let positionsObj = {};

    let buffer = 0;
    let lastPoints;
    let lastPosition = 1;

    usersObj.forEach((user) => {
      if (!lastPoints) {
        lastPoints = points[user.name];
        positionsObj[user.name] = 1;
      } else if (lastPoints === points[user.name]) {
        positionsObj[user.name] = lastPosition;
        buffer += 1;
      } else {
        lastPosition = lastPosition + 1 + buffer;
        positionsObj[user.name] = lastPosition;
        lastPoints = points[user.name];
        buffer = 0;
      }
    });

    setPositions(positionsObj);
  }, [points]);

  useEffect(() => {
    let totalPoints = 0;

    categories.forEach((category) => {
      if (category.winner) {
        if (category.type === "Main") {
          totalPoints += 10;
        } else if (category.type === "Extra") {
          totalPoints += 5;
        }
      }
    });

    setTotalPoints(totalPoints);
  }, [categories]);

  useEffect(() => {
    let winnersObj = {};

    categories.forEach((category) => {
      winnersObj[category.name] = category.winner?.title || "-";
    });

    setWinners(winnersObj);
  }, [categories]);

  if (!categories.length) {
    return (
      <div className="bg-neutral-950 text-neutral-300 px-8 py-4 min-h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 text-neutral-300 px-8 py-4 min-h-screen">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl md:text-3xl text-yellow-300 hover:text-yellow-200"
        >
          Aposcar
        </Link>

        {Object.values(winners).every((value) => value === "-") && (
          <button
            className="bg-yellow-300 text-neutral-900 py-2 px-6 rounded-md hover:bg-yellow-200 hover:text-neutral-800"
            onClick={() => navigate("/categories/")}
          >
            Place your bets
          </button>
        )}
      </div>
      <div>
        {!userId && (
          <div className="flex py-6 justify-between gap-6 flex-col lg:flex-row">
            <div className="flex flex-col w-full lg:w-1/2">
              {users.map((user) => {
                return (
                  <Link
                    to={`/users/${user.id}`}
                    key={user.id}
                    className="border bg-neutral-900 border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-neutral-700 p-2 my-1"
                  >
                    <div className="flex items-center">
                      <div className="text-lg md:text-2xl w-12 text-center">
                        {positions[user.name]}º
                      </div>
                      <img
                        src={user.pic_url}
                        alt={user.name}
                        className="w-12 h-12 lg:w-20 lg:h-20 rounded-full object-cover mx-4"
                      />
                      <div className="w-full flex flex-col justify-between gap-3 mr-4">
                        <div className="flex justify-between items-center">
                          <h3 className="md:text-2xl">{user.name}</h3>
                          <h3 className="text-sm md:text-lg">
                            {points[user.name]} pts
                          </h3>
                        </div>
                        <div className="flex">
                          <div
                            className="h-2 bg-yellow-400 rounded-md"
                            style={{
                              width: `${
                                (points[user.name] / totalPoints) * 100
                              }%`,
                            }}
                          />
                          <div
                            className="h-2 bg-neutral-600 rounded-e-md"
                            style={{
                              width: `${
                                ((totalPoints - points[user.name]) /
                                  totalPoints) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col w-full lg:w-1/2 my-1">
              <div className="grid grid-cols-2 gap-x-2 py-3 px-6 border bg-neutral-800 border-neutral-700 md:text-lg rounded-t-lg">
                <div className="font-bold md:text-2xl w-1/2">Category</div>
                <div className="font-bold md:text-2xl w-1/2">Winner</div>
              </div>

              {categories.map((category) => {
                return (
                  <div
                    key={category.id}
                    className={
                      "grid grid-cols-2 gap-x-4 py-1 px-6 border md:text-lg last:rounded-b-lg bg-neutral-900 border-neutral-800"
                    }
                  >
                    <div className="md:font-semibold">{category.name}</div>
                    <div>{winners[category.name]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Outlet
        context={[
          users,
          bets,
          points,
          rightAnswers,
          positions,
          categories,
          winners,
        ]}
      />
    </div>
  );
}
