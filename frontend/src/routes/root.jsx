import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div>
        <h1>Aposcar</h1>
        <Link to="categories">Categories</Link>
      </div>
    </>
  );
}
