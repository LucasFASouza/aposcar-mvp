import { useState, useEffect } from "react";

const Voting = (data) => {
  const category = data.category;
  const movies = data.movies;

  const [nominees, setNominees] = useState([]);

  useEffect(() => {
    setNominees(
      movies.filter((movie) => {
        return category.nominees.includes(movie.id);
      })
    );
  }, []);

  return (
    <div>
      <h1>{category.name}</h1>
      {nominees.map((nominee) => (
        <div>
          <h2>{nominee.title}</h2>
          <p>{nominee.description}</p>
          <img
            key={nominee.id}
            src={nominee.poster_url}
            alt={nominee.title}
            width={100}
          />
        </div>
      ))}
    </div>
  );
};
export default Voting;
