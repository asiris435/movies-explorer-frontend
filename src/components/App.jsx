import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";
import { useState } from "react";

function App () {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="page__content">
        <Routes>

        <Route path="/" element={
            <>
              <Header name="homepage" loggedIn={loggedIn} />
              <Main name="homepage" />
              <Footer />
            </>
          } />

          <Route path="/signup" element={
            <Main name="signup" setLoggedIn={setLoggedIn} />
          } />

          <Route path="/signin" element={
            <Main name="signin" setLoggedIn={setLoggedIn} />
          } />

          <Route path="/profile" element={
            <>
              <Header />
              <Main name="profile" setLoggedIn={setLoggedIn} />
            </>
          } />

          <Route path="/movies" element={
            <>
              <Header />
              <Main name="movies" />
              <Footer />
            </>
          } />

          <Route path="/saved-movies" element={
            <>
              <Header />
              <Main name="savedmovies" />
              <Footer />
            </>
          } />

          <Route path="*" element={
            <Main name="patherror" />
          } />

        </Routes>
    </div>
  );
}

export default App;
