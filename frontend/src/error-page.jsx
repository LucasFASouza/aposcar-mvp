import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="bg-neutral-950 text-neutral-300 px-8 py-4 h-screen">
      <Link to="/" className="text-3xl text-yellow-300 hover:text-yellow-200">
        Aposcar
      </Link>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold text-yellow-300 pb-4">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
