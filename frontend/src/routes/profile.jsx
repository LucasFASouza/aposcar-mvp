import { useState, useEffect } from "react";
import {
  useOutletContext,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();
  const [users, bets, points, rightAnswers, positions, categories] =
    useOutletContext();
  const [user, setUser] = useState({});
  const [userBets, setUserBets] = useState([]);
  const [winners, setWinners] = useState({});

  useEffect(() => {
    let userObj = users.find((user) => {
      return user.id == userId;
    });

    setUser(userObj);
  }, [users, userId]);

  useEffect(() => {
    let userBetsObj = bets.filter((bet) => {
      return bet.player.id == userId;
    });

    setUserBets(userBetsObj);
  }, [user, bets]);

  useEffect(() => {
    let winnersObj = {};

    categories.forEach((category) => {
      winnersObj[category.name] = category.winner?.title || "-";
    });

    setWinners(winnersObj);
  }, [categories]);

  if (!user?.id || !userBets.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-neutral-950 text-neutral-200 py-4 flex">
      <div className="flex flex-col items-center w-1/3 pt-32">
        <img
          src={user.pic_url}
          alt={user.name}
          style={{
            borderRadius: "50%",
            width: "250px",
            height: "250px",
            objectFit: "cover",
          }}
        />
        <h1 className="text-4xl font-semibold text-neutral-100 my-4">
          {user.name}
        </h1>
        {user.letterboxd && (
          <Link
            className="hover:text-neutral-50 underline"
            to={user.letterboxd}
            target="_blank"
          >
            Letterboxd
          </Link>
        )}

        <h3 className="text-3xl my-4">{positions[user.name]}º lugar</h3>
        <h3 className="text-2xl">{points[user.name]} Points</h3>
        <h3 className="text-2xl">
          {rightAnswers[user.name]}/
          {Object.values(winners).filter((winner) => winner !== "-").length}{" "}
          correct answers
        </h3>
      </div>

      <div className="w-2/3 flex flex-col">
        <div className="grid grid-cols-3 py-3 px-6 border bg-neutral-800 border-neutral-700 text-lg rounded-t-lg">
          <h2 className="font-bold text-2xl">Category</h2>
          <h2 className="font-bold text-2xl">Your Bet</h2>
          <h2 className="font-bold text-2xl">Winner</h2>
        </div>

        {categories.map((category) => {
          const bet = userBets.find((bet) => {
            return bet.category.id == category.id;
          });

          return (
            <div
              key={bet.id}
              className={`grid grid-cols-3 py-1 px-6 border text-lg last:rounded-b-lg ${
                winners[bet.category.name] == "-"
                  ? "bg-neutral-900 border-neutral-800"
                  : winners[bet.category.name] == bet.movie.title
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              <h3 className="font-semibold">{bet.category.name}</h3>
              <p>{bet.movie.title}</p>
              <p>{winners[bet.category.name]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
