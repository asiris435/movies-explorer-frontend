import { useEffect, useState } from "react";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import PathError from "../PathError/PathError";
import Login from "../Login/Login";
import Portfolio from "../Portfolio/Portfolio";
import Profile from "../Profile/Profile";
import Promo from "../Promo/Promo";
import Register from "../Register/Register";
import Techs from "../Techs/Techs";
import "./Main.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { movies, moviesSaved } from "../../utils/constants";
import SearchForm from "../SearchForm/SearchForm";
import NavTab from "../NavTab/NavTab";

function Main ({ name, setLoggedIn }) {
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isAllFoundMovies, setIsAllFoundMovies] = useState(true);
  const [isAllFoundSavedMovies, setIsAllFoundSavedMovies] = useState(true);

  useEffect(() => {
    setAllMovies(movies);
    setSavedMovies(moviesSaved);
  }, []);

  function onAllFoundMovies () {
    if (isAllFoundMovies) {
      setIsAllFoundMovies(false);
      setAllMovies(allMovies.filter((element) => element.duration <= 40));
    } else {
      setIsAllFoundMovies(true);
      setAllMovies(movies);
    }
  }

  function onAllFoundSavedMovies () {
    if (isAllFoundSavedMovies) {
      setIsAllFoundSavedMovies(false);
      setSavedMovies(savedMovies.filter((element) => element.duration <= 40));
    } else {
      setIsAllFoundSavedMovies(true);
      setSavedMovies(moviesSaved);
    }
  }

    return (
      <main className="content">
        {{
          homepage:
            <>
              <Promo />
              <NavTab />
              <AboutProject />
              <Techs />
              <AboutMe />
              <Portfolio />
            </>,
          signup: <Register name={name} setLoggedIn={setLoggedIn} />,
          signin: <Login name={name} setLoggedIn={setLoggedIn} />,
          profile: <Profile name={name} setLoggedIn={setLoggedIn} />,
          movies: 
            <>
              <SearchForm isChecked={isAllFoundMovies} changeShortFilm={onAllFoundMovies} />
              <MoviesCardList movies={allMovies} />
            </>,
          savedmovies: 
            <>
              <SearchForm isChecked={isAllFoundSavedMovies} changeShortFilm={onAllFoundSavedMovies} />
              <MoviesCardList movies={savedMovies} />
            </>,
          patherror: <PathError />
        }[name]}
      </main>  
    );
}

export default Main;
