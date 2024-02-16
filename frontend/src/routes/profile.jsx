import { useState, useEffect } from "react";
import {
  useOutletContext,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();
  const { users } = useOutletContext();
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(users);

    if (!users) {
      return;
    }

    let userObj = users.find((user) => {
      return user.id == userId;
    });

    setUser(userObj);
  }, [users, userId]);

  if (!user.lengh) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-neutral-950 text-neutral-300 px-8 py-4 h-screen">
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
    </div>
  );
}
