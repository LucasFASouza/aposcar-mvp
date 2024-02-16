import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function Category() {
  const { categoryId } = useParams();

  const [categories, bets, setBets] = useOutletContext();

  const [nominees, setNominees] = useState([]);
  const [category, setCategory] = useState({});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let categoryObj = categories.find((category) => {
      return category.id == categoryId;
    });

    setCategory(categoryObj);

    if (bets[categoryId]) {
      let selectedNominee = categoryObj.nominees.find((nominee) => {
        return nominee.id == bets[categoryId];
      });

      setSelected(selectedNominee);
    } else {
      setSelected(null);
    }
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

  function selectMovie(nominee) {
    setSelected(nominee);

    setBets((prevBets) => {
      return {
        ...prevBets,
        [categoryId]: nominee.id,
      };
    });
  }

  if (!category || !nominees.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-8">
      <div className="w-1/2">
        <h1 className="text-3xl">{category.name}</h1>
        <h3 className="pt-4 text-xl">Your bet is...</h3>
        {selected && (
          <>
            <h3 className="text-4xl text-yellow-300 py-2">{selected.title}</h3>
            <p className="leading-5">{selected.description}</p>
          </>
        )}
        {!selected && (
          <h3 className="text-4xl text-yellow-300 py-2">Place your bet!</h3>
        )}
      </div>

      <div className="flex flex-row gap-4 py-4">
        {nominees.map((nominee) => {
          return (
            <button key={nominee.id} onClick={() => selectMovie(nominee)}>
              <img
                src={nominee.poster_url}
                alt={nominee.title}
                className={`hover:cursor-pointer ${
                  nominee.id === selected?.id
                    ? "border-4 border-yellow-300"
                    : "hover:border hover:border-neutral-200"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
