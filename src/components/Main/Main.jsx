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
import NavTab from "../NavTab/NavTab";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function Main ({ name, onRegistration, onLogin, outLogin, editUserProfile, setIsError, isSuccess, setSuccess, isEdit, setIsEdit, savedMovies, addMovie, onDelete }) {

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
        signup: <Register name={name} onRegistration={onRegistration} setIsError={setIsError} />,
        signin: <Login name={name} onLogin={onLogin} setIsError={setIsError} />,
        profile: <Profile
                  name={name}
                  outLogin={outLogin}
                  editUserProfile={editUserProfile}
                  setIsError={setIsError}
                  isSuccess={isSuccess}
                  setSuccess={setSuccess}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                />,
        movies: <Movies savedMovies={savedMovies} addMovie={addMovie} setIsError={setIsError} />,
        savedmovies: <SavedMovies savedMovies={savedMovies} onDelete={onDelete} setIsError={setIsError} />,
        patherror: <PathError />
      }[name]}
    </main>  
  );
}

export default Main;
