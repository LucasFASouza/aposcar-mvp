import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [winners, setWinners] = useState({});

  async function fetchBets() {
    await fetch("https://aposcar-api.fly.dev/api/categories")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data.categories);
      });
  }

  useEffect(() => {
    let winnersObj = {};

    categories.forEach((category) => {
      winnersObj[category.name] = category.winner?.title || "-";
    });

    setWinners(winnersObj);
  }, [categories]);

  return (
    <div className="bg-neutral-950 text-neutral-300 min-h-screen">
      <div className="px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl md:text-3xl text-yellow-300 hover:text-yellow-200"
          >
            Aposcar
          </Link>

          <div className="flex gap-4 lg:gap-8 items-center text-sm lg:text-lg">
            <Link to="/about" className="text-yellow-300 hover:text-yellow-200">
              About
            </Link>

            {Object.values(winners).every((value) => value === "-") && (
              <Link
                to="/categories"
                className="bg-yellow-300 text-neutral-900 py-2 px-6 rounded-md hover:bg-yellow-200 hover:text-neutral-800"
              >
                Place your bets
              </Link>
            )}
          </div>
        </div>

        <div className="border bg-neutral-900 border-neutral-800 rounded-xl p-6 lg:w-2/3 mx-auto my-8">
          <h1 className="text-xl lg:text-3xl font-semibold pb-4 text-neutral-100">
            About the Aposcar
          </h1>
          <div className="text-base lg:text-lg flex flex-col gap-2">
            <p>
              Ever dreamt of having your finger on the pulse of the Oscars? Look
              no further! Aposcar is your go-to site for turning those cinematic
              hunches into winning predictions. Here's the lowdown:
            </p>
            <h3 className="text-lg lg:text-2xl pt-6 pb-2 font-semibold">
              🏆 Predict to Win
            </h3>
            <p>
              Dive into the thrill of Oscar night by casting your bets on who's
              taking home the gold in each category. Main categories pack a
              punch at 10 points, while the others weigh in at a cool 5.
            </p>
            <h3 className="text-lg lg:text-2xl pt-6 pb-2 font-semibold">
              📜 Cinephile Status
            </h3>
            <p>
              No money here, just bragging rights! Win the coveted title of
              "Cinephile Extraordinaire" (and brace yourself for the bullying
              that come with it).
            </p>
            <h3 className="text-lg lg:text-2xl pt-6 pb-2 font-semibold">
              👥 Show Off Your Style
            </h3>
            <p>
              Elevate your Aposcar profile by linking your Letterboxd account
              and rocking a personalized Picrew pic as your avatar. It's the
              cinephile flex you've been waiting for.
            </p>
            <h3 className="text-lg lg:text-2xl pt-6 pb-2 font-semibold">
              📈 Real-Time Leaderboard
            </h3>
            <p>
              When the Oscars kick off, our leaderboard comes alive! Watch as it
              updates in real time, revealing the winners and your predictions.
              The race is on!
            </p>
            <h3 className="text-lg lg:text-2xl pt-6 pb-2 font-semibold">
              🔄 Change Your Mind
            </h3>
            <p>
              Got a last-minute gut feeling? No worries! Let us know, and we'll
              swap out your previous bets faster than you can say "And the Oscar
              goes to...".
            </p>
            <h3 className="text-lg lg:text-2xl pt-6 pb-2 font-semibold">
              💻 Contribute to the Fun
            </h3>
            <p>
              Want to be a part of the behind-the-scenes action? Head over to
              our{" "}
              <Link
                to="https://github.com/LucasFASouza/aposcar-mvp"
                target="_blank"
                className="text-yellow-300 hover:text-yellow-200 underline"
              >
                GitHub repository
              </Link>{" "}
              and get involved. Your coding skills are more than welcome! That's
              it! Good luck, cinephile!
            </p>
            <p className="py-6"> Let the Aposcar predictions begin! 🎬🍿</p>
          </div>
          <h1 className="text-xl lg:text-3xl font-semibold pb-4 text-neutral-100 pt-8">
            Contact
          </h1>
          <p className="text-base lg:text-lg">
            Questions? Feedback? Just want to chat? Hit me up at{" "}
            <a
              href="mailto:lucasfsouza.dev@gmail.com?subject=Aposcar Contact"
              className="text-yellow-300 hover:text-yellow-200 underline"
            >
              lucasfsouza.dev@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
