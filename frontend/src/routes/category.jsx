import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function Category() {
  const { categoryId } = useParams();

  const [categories, bets, setBets] = useOutletContext();

  const [nominees, setNominees] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    let categoryObj = categories.find((category) => {
      return category.id == categoryId;
    });

    setCategory(categoryObj);
  }, [categoryId, categories]);

  useEffect(() => {
    if (!category?.nominees) {
      return;
    }

    let nomineesObj = category.nominees;

    let sortedNominees = [...nomineesObj].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

    setNominees(sortedNominees);
  }, [category]);

  if (!category || !nominees.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-8">
      <div className="w-1/2">
        <h1 className="text-3xl">{category.name}</h1>
        <h3 className="pt-4 text-xl">Your bet is...</h3>
        <h3 className="text-4xl text-yellow-300 py-2">Barbie</h3>
        <p className="leading-5">
          Barbie and Ken are having the time of their lives in the colorful and
          seemingly perfect world of Barbie Land. However, when they get a
          chance to go to the real world, they soon discover the joys and perils
          of living among humans.
        </p>
      </div>
      <div className="flex flex-row gap-4 py-4">
        {nominees.map((nominee) => {
          return (
            <div
              key={nominee.id}
              className="hover:border hover:border-neutral-200 hover:cursor-pointer"
            >
              <img src={nominee.poster_url} alt={nominee.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
