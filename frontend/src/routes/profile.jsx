import { useState, useEffect } from "react";
import { useOutletContext, Link, useParams } from "react-router-dom";

import Loading from "../components/loading";

export default function Profile() {
  const { userName } = useParams();

  const [
    users,
    categories,
    bets,
    getReceiver,
    winners,
    points,
    rightAnswers,
    positions,
  ] = useOutletContext();

  const [user, setUser] = useState({});
  const [userBets, setUserBets] = useState([]);

  useEffect(() => {
    let userObj = users.find((user) => {
      return user.name == userName;
    });

    setUser(userObj);
  }, [users, userName]);

  useEffect(() => {
    let userBetsObj = bets.filter((bet) => {
      return bet.player.name == userName;
    });

    setUserBets(userBetsObj);
  }, [user, bets]);

  if (!user?.id || !userBets.length) {
    return (
      <div className="bg-neutral-950 text-neutral-300 flex justify-center items-center px-8 py-4 min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 text-neutral-200 py-4 flex flex-col lg:flex-row">
      <div className="flex flex-col items-center py-12 w-full lg:w-1/3 lg:pt-32 lg:pb-12">
        <img
          src={user.pic_url}
          alt={user.name}
          className="rounded-full w-32 h-32 lg:w-48 lg:h-48 object-cover"
        />
        <h1 className="text-2xl lg:text-4xl font-semibold text-neutral-100 my-2 lg:my-4 text-center">
          {user.name}
        </h1>
        {user.letterboxd && (
          <Link
            className="hover:text-neutral-50 underline text-sm lg:text-base"
            to={user.letterboxd}
            target="_blank"
          >
            Letterboxd
          </Link>
        )}

        <h3 className="text-lg lg:text-2xl my-2 lg:my-4 font-semibold">
          {positions[user.name]}º lugar
        </h3>
        <h3 className="lg:text-xl">{points[user.name]} Points</h3>
        <h3 className="lg:text-xl">
          {rightAnswers[user.name]}/
          {Object.values(winners).filter((winner) => winner !== "-").length}{" "}
          correct answers
        </h3>
      </div>

      <div className="w-full lg:w-2/3 flex flex-col">
        <div
          className={`grid gap-2 text-center p-3 lg:py-3 lg:px-6 border bg-neutral-800 border-neutral-700 rounded-t-lg font-bold text-sm md:text-lg lg:text-xl ${
            Object.values(winners).every((value) => value === "-")
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          <h2>Category</h2>
          <h2>Your Bet</h2>
          {!Object.values(winners).every((value) => value === "-") && (
            <h2>Winner</h2>
          )}
        </div>

        {categories.map((category) => {
          const bet = userBets.find((bet) => {
            return bet.category.id == category.id;
          });

          return (
            <div
              key={bet.id}
              className={`border grid gap-2 p-3 lg:py-3 lg:px-6 text-xs md:text-base lg:text-lg last:rounded-b-lg ${
                winners[bet.category.name] == "-"
                  ? "bg-neutral-900 border-neutral-800"
                  : winners[bet.category.name] == bet.movie.title
                  ? "bg-green-500"
                  : "bg-red-500"
              } ${
                Object.values(winners).every((value) => value === "-")
                  ? "grid-cols-2"
                  : "grid-cols-3"
              }`}
            >
              <h3 className="font-semibold">{bet.category.name}</h3>
              <p>{getReceiver(bet.movie.title, bet.category.id)}</p>
              {!Object.values(winners).every((value) => value === "-") && (
                <p>
                  {getReceiver(winners[bet.category.name], bet.category.id)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
