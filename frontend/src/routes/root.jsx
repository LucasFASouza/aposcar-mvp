import { useState, useEffect } from "react";
import { Outlet, Link, useParams, useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [bets, setBets] = useState([]);

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
  }

  useEffect(() => {
    fetchBets();
  }, []);

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
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <Outlet context={[users, bets]} />
    </div>
  );
}
