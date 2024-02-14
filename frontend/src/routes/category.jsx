import { useState, useEffect } from "react";

export default function Category() {
  const category = {
    name: "Name of Category",
    nominees: [1, 2, 3, 4, 5],
  };

  const movies = [
    {
      id: 1,
      title: "Movie 1",
      description: "Description of Movie 1",
      poster_url:
        "https://a.ltrbxd.com/resized/alternative-poster/2/7/7/0/6/4/p/bqiPSxorfxSu3Nt21Q28eltLABK-0-500-0-750-crop.jpg?v=3cfef99e31",
    },
    {
      id: 2,
      title: "Movie 2",
      description: "Description of Movie 2",
      poster_url:
        "https://a.ltrbxd.com/resized/alternative-poster/2/7/7/0/6/4/p/bqiPSxorfxSu3Nt21Q28eltLABK-0-500-0-750-crop.jpg?v=3cfef99e31",
    },
    {
      id: 3,
      title: "Movie 3",
      description: "Description of Movie 3",
      poster_url:
        "https://a.ltrbxd.com/resized/alternative-poster/2/7/7/0/6/4/p/bqiPSxorfxSu3Nt21Q28eltLABK-0-500-0-750-crop.jpg?v=3cfef99e31",
    },
    {
      id: 4,
      title: "Movie 4",
      description: "Description of Movie 4",
      poster_url:
        "https://a.ltrbxd.com/resized/alternative-poster/2/7/7/0/6/4/p/bqiPSxorfxSu3Nt21Q28eltLABK-0-500-0-750-crop.jpg?v=3cfef99e31",
    },
    {
      id: 5,
      title: "Movie 5",
      description: "Description of Movie 5",
      poster_url:
        "https://a.ltrbxd.com/resized/alternative-poster/2/7/7/0/6/4/p/bqiPSxorfxSu3Nt21Q28eltLABK-0-500-0-750-crop.jpg?v=3cfef99e31",
    },
  ];

  const [nominees, setNominees] = useState([]);

  useEffect(() => {
    setNominees(
      movies.filter((movie) => {
        return category.nominees.includes(movie.id);
      })
    );
  }, []);

  return (
    <div id="contact">
      <div>
        <h1>{category.name}</h1>
      </div>
      <div>
        {nominees.map((nominee) => {
          return (
            <div key={nominee.id}>
              <h2>{nominee.title}</h2>
              <p>{nominee.description}</p>
              <img src={nominee.poster_url} alt={nominee.title} width={100}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}
