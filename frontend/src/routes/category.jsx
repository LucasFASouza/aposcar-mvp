import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function Category() {
  const [movies] = useOutletContext();
  const [categories] = useOutletContext();

  console.log(movies);
  console.log(categories);

  const { id } = useParams();

  const category = categories.find((category) => {
    return category.id === id;
  });

  const [nominees, setNominees] = useState([]);

  useEffect(() => {
    console.log(movies);
    setNominees(
      movies.filter((movie) => {
        return category.nominees.includes(movie.id);
      })
    );
  }, [movies]);

  return (
    <div>
      <div>
        <h1>{category.name}</h1>
      </div>
      <div>
        {nominees.map((nominee) => {
          return (
            <div key={nominee.id}>
              <h2>{nominee.title}</h2>
              <p>{nominee.description}</p>
              <img src={nominee.poster_url} alt={nominee.title} width={100} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
