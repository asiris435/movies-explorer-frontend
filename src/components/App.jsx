import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import SendingContext from "../contexts/SendingContext";
import mainApi from "../utils/MainApi";
import ErrorContext from "../contexts/ErrorContext";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ProtectedComponent from "./ProtectedComponent/ProtectedComponent";
import Preloader from "./Preloader/Preloader";

function App () {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCheckedToken, setIsCheckedToken] = useState(true);
  const [isSuccess, setIsSaccess] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([mainApi.getUserInfo(localStorage.jwt), mainApi.getMovies(localStorage.jwt)])
        .then(([userData, dataMovies]) => {
          setSavedMovies(dataMovies.reverse());
          setCurrentUser(userData);
          setLoggedIn(true);
          setIsCheckedToken(false);
        })
        .catch((err) => {
          console.error(err);
          setIsCheckedToken(false);
          localStorage.clear();
        });
    } else {
      setLoggedIn(false);
      setIsCheckedToken(false);
      localStorage.clear();
    }
  }, [loggedIn]);

  const setSuccess = useCallback(() => {
    setIsSaccess(false);
  }, []);

  function handleRegistration (username, email, password) {
    setIsSending(true);
    mainApi.registration(username, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          mainApi.authorization(email, password)
            .then(res => {
              localStorage.setItem("jwt", res.token);
              setLoggedIn(true);
              window.scrollTo(0, 0);
              navigate("/movies");
            })
            .catch((err) => {
              setIsError(true);
              console.error(err);
            })
            .finally(() => setIsSending(false));
        }
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
      })
      .finally(() => setIsSending(false));
  }

  function handleLogin (email, password) {
    setIsSending(true);
    mainApi.authorization(email, password)
      .then(res => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        window.scrollTo(0, 0);
        navigate("/movies");
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
      })
      .finally(() => setIsSending(false));
  }

  function outLogin () {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  }

  function editUserProfile (username, email) {
    setIsSending(true);
    mainApi.setUserInfo(username, email, localStorage.jwt)
      .then(res => {
        setCurrentUser(res);
        setIsSaccess(true);
        setIsEdit(false);
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
      })
      .finally(() => setIsSending(false));
  }

  function handleDeleteMovie (deletemovieId) {
    mainApi.deleteMovie(deletemovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(item => { return item._id !== deletemovieId }));
      })
      .catch((err) => {
        console.error(err);
      })
  }

  function handleSelectedMovie (data) {
    const isAddMovie = savedMovies.some(item => data.id === item.movieId);
    const searchSelectedMovie = savedMovies.filter((item) => {
      return item.movieId === data.id;
    });
    if (isAddMovie) {
      handleDeleteMovie(searchSelectedMovie[0]._id);
    } else {
      mainApi.addMovie(data, localStorage.jwt)
        .then(res => {
          setSavedMovies([res, ...savedMovies]);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }

  return (
    <div className="page__content">
      {isCheckedToken ? <Preloader /> : 
        <CurrentUserContext.Provider value={currentUser}>
          <SendingContext.Provider value={isSending}>
            <ErrorContext.Provider value={isError}>
              <Routes>

              <Route path="/" element={
                  <>
                    <Header name="homepage" loggedIn={loggedIn} />
                    <Main name="homepage" />
                    <Footer />
                  </>
                } />

                <Route path="/signup" element={
                  loggedIn ? <Navigate to="/movies" replace /> :
                  <Main name="signup" onRegistration={handleRegistration} setIsError={setIsError} />
                } />

                <Route path="/signin" element={
                  loggedIn ? <Navigate to="movies" replace /> :
                  <Main name="signin" onLogin={handleLogin} setIsError={setIsError} />
                } />

                <Route path="/profile" element={<ProtectedRoute
                  element={ProtectedComponent}
                  name="profile"
                  loggedIn={loggedIn}
                  outLogin={outLogin}
                  editUserProfile={editUserProfile}
                  setIsError={setIsError}
                  isSuccess={isSuccess}
                  setSuccess={setSuccess}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  />
                } />

                <Route path="/movies" element={<ProtectedRoute
                  element={ProtectedComponent}
                  name="movies"
                  savedMovies={savedMovies}
                  addMovie={handleSelectedMovie}
                  loggedIn={loggedIn}
                  setIsError={setIsError}
                />
                } />

                <Route path="/saved-movies" element={<ProtectedRoute
                  element={ProtectedComponent}
                  name="savedmovies"
                  onDelete={handleDeleteMovie}
                  savedMovies={savedMovies}
                  loggedIn={loggedIn}
                  setIsError={setIsError}
                />
                } />

                <Route path="*" element={
                  <Main name="patherror" />
                } />

              </Routes>
            </ErrorContext.Provider>
          </SendingContext.Provider>
        </CurrentUserContext.Provider>
      }
    </div>
  );
}

export default App;
