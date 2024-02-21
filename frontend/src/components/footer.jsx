import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 py-2 flex items-center justify-center">
      <p>Made with 💛 by </p>
      <Link
        to="https://labquatro.com.br/"
        target="_blank"
        className="text-yellow-300 hover:text-yellow-200 underline ml-2"
      >
        LabQuatro
      </Link>
      <p>.</p>
    </div>
  );
}
