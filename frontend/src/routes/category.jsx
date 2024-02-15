import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function Category() {
  const [categories] = useOutletContext();
  const [, movies] = useOutletContext();

  const { categoryId } = useParams();

  const [nominees, setNominees] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    let categoryObj = categories.find((category) => {
      return category.id == categoryId;
    });

    setCategory(categoryObj);
  }, [categoryId]);

  useEffect(() => {
    if (category.nominees) {
      setNominees(
        movies.filter((movie) => {
          return category.nominees.includes(movie.id);
        })
      );
    }
  }, [category]);

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
