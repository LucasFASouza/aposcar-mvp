import { Outlet, Link } from "react-router-dom";

export default function Categories() {
  return (
    <>
      <div id="sidebar">
        <h1>Aposcar</h1>
        <nav>
          <ul>
            <li>
              <Link to="categories/1">Category 1</Link>
            </li>
            <li>
              <Link to="categories/2">Category 2</Link>
            </li>
            <li>
              <Link to="categories/3">Category 3</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
