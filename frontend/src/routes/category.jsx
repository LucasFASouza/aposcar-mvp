import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";

export default function Category() {
  const navigate = useNavigate();

  const { categoryId } = useParams();

  const [categories, bets, setBets] = useOutletContext();

  const [nominees, setNominees] = useState([]);
  const [category, setCategory] = useState({});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (bets && !bets.username) {
      navigate("/categories");
    }

    let categoryObj = categories.find((category) => {
      return category.id == categoryId;
    });

    setCategory(categoryObj);

    if (bets[categoryId]) {
      let selectedNominee = categoryObj.nominees.find((nominee) => {
        return nominee.id == bets[categoryId].id;
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

    const betsObj = bets;
    betsObj[categoryId] = nominee;

    setBets(betsObj);
  }

  if (!category || !nominees.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="md:w-1/2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl lg:text-3xl font-bold">{category.name}</h1>
          <p className="text-sm lg:text-lg">
            {category.type == "Main" ? "(10 Points)" : "(5 Points)"}
          </p>
        </div>
        <h3 className="pt-4 lf:text-xl font-semibold">Your bet is...</h3>

        <div>
          {selected && (
            <>
              <h3 className="text-2xl lg:text-4xl text-yellow-300 font-bold">
                {selected.title}
              </h3>
              <p className="leading-5">{selected.description}</p>
            </>
          )}

          {!selected && (
            <h3 className="text-4xl text-yellow-300 py-2 font-bold">
              Place your bet!
            </h3>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 py-4 justify-center lg:justify-between lg:gap-y-8">
        {nominees.map((nominee) => {
          return (
            <button key={nominee.id} onClick={() => selectMovie(nominee)}>
              <img
                src={nominee.poster_url}
                alt={nominee.title}
                className={`hover:cursor-pointer w-24 md:w-44 ${
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
