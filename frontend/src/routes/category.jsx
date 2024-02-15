import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";

export default function Category() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [categories] = useOutletContext();
  const [, movies] = useOutletContext();

  const [nominees, setNominees] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    if (categories.length === 0) {
      navigate("/categories");
    }

    let categoryObj = categories.find((category) => {
      return category.id == categoryId;
    });

    setCategory(categoryObj);
  }, [categoryId]);

  useEffect(() => {
    if (category.nominees) {
      let nomineesObj = movies.filter((movie) => {
        return category.nominees.includes(movie.id);
      });

      let sortedNominees = [...nomineesObj].sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      setNominees(sortedNominees);
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
