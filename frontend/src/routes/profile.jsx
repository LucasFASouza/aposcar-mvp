import { useState, useEffect } from "react";
import {
  useOutletContext,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();
  const [users, bets] = useOutletContext();
  const [user, setUser] = useState({});
  const [userBets, setUserBets] = useState([]);

  useEffect(() => {
    if (!users) {
      return;
    }

    let userObj = users.find((user) => {
      return user.id == userId;
    });

    setUser(userObj);
  }, [users, userId]);

  useEffect(() => {
    if (!bets) {
      return;
    }

    console.log(bets);

    let userBetsObj = bets.filter((bet) => {
      return bet.player.id == userId;
    });

    setUserBets(userBetsObj);
  }, [user]);

  if (!user?.id) {
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
        <h1 className="text-4xl font-semibold text-neutral-100">{user.name}</h1>
        <h2 className="text-2xl">0 Points</h2>
        <h2 className="text-2xl">0/23 correct answers</h2>
      </div>

      <div className="w-2/3 flex flex-col">
        <div className="grid grid-cols-2 py-3 px-6 border bg-neutral-800 border-neutral-700 text-lg rounded-t-lg">
          <h2 className="font-bold text-2xl">Category</h2>
          <h2 className="font-bold text-2xl">Your Bet</h2>
        </div>

        {userBets.map((bet) => {
          return (
            <div
              key={bet.id}
              className="grid grid-cols-2 py-1 px-6 border bg-neutral-900 border-neutral-800 text-lg last:rounded-b-lg"
            >
              <h3 className="font-semibold">{bet.category.name}</h3>
              <p>{bet.movie.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
