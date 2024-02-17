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

  const { userId } = useParams();

  async function fetchBets() {
    await fetch("http://127.0.0.1:8000/api/players")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data.players);
      });

    await fetch("http://127.0.0.1:8000/api/bets")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBets(data.bets);
      });

    await fetch("http://127.0.0.1:8000/api/categories")
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

  if (!categories.length || !users.length || !bets.length) {
    return (
      <div className="bg-neutral-950 text-neutral-300 px-8 py-4 min-h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 text-neutral-300 px-8 py-4 min-h-screen">
      <div className="flex justify-between">
        <Link to="/" className="text-3xl text-yellow-300 hover:text-yellow-200">
          Aposcar
        </Link>

        <button
          className="bg-yellow-300 text-neutral-900 py-2 px-6 rounded-md hover:bg-yellow-200 hover:text-neutral-800"
          onClick={() => navigate("/categories/")}
        >
          Place your bets
        </button>
      </div>

      {!userId && (
        <div className="flex flex-col">
          {users.map((user) => {
            return (
              <Link
                to={`/users/${user.id}`}
                key={user.id}
                className="hover:text-neutral-50"
              >
                <div className="flex items-center">
                  <h3 className="text-2xl">{positions[user.name]}</h3>
                  <img
                    src={user.pic_url}
                    alt={user.name}
                    style={{
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <h3 className="text-2xl">{user.name}</h3>
                  <h3>{points[user.name]}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <Outlet context={[users, bets, points, rightAnswers, positions, categories]} />
    </div>
  );
}
