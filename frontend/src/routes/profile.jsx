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
    <div className="bg-neutral-950 text-neutral-300 px-8 py-4">
      <div className="flex flex-col items-center">
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

        {userBets.map((bet) => {
          return (
            <div
              key={bet.id}
              className="flex items-center justify-between w-2/5"
            >
              <h3 className="text-xl text-neutral-50 font-semibold">
                {bet.category.name}
              </h3>
              <p>{bet.movie.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
