import { useEffect } from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";

export default function Root() {
  const { categories } = useLoaderData();

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <>
      <div id="sidebar">
        <h1>Aposcar</h1>
        <nav>
          {categories.length ? (
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`categories/${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>Searching...</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
