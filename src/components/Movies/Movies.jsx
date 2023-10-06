import { useCallback, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import moviesApi from "../../utils/MoviesApi";

function Movies ({ setIsError, savedMovies, addMovie }) {
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [firstLogin, setFirstLogin] = useState(true);
    const [serverError, setServerError] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const filter = useCallback((search, isChecked, movies) => {
        localStorage.setItem("textsearch", JSON.stringify(search));
        localStorage.setItem("shortfilm", JSON.stringify(isChecked));
        localStorage.setItem("allmovies", JSON.stringify(movies));
        setSearchText(search);
        setFilteredMovies(movies.filter((item) => {
            const nameSearch = item.nameRU.toLowerCase().includes(search.toLowerCase());
            return isChecked ? (nameSearch && item.duration <= 40) : nameSearch;
        }))
    }, []);

    function moviesSearch (search) {
        if (allMovies.length === 0) {
            setIsLoading(true);
            moviesApi.getMovies()
                .then((res) => {
                    setAllMovies(res);
                    setIsChecked(false);
                    setServerError(false);
                    setFirstLogin(false);
                    filter(search, isChecked, res);
                })
                .catch((err) => {
                    setServerError(true);
                    console.error(err);
                })
                .finally(() => setIsLoading(false));
        } else {
            filter(search, isChecked, allMovies);
        }
    }

    useEffect(() => {
        if (localStorage.allMovies && localStorage.shortfilm && localStorage.textsearch) {
            const movies = JSON.parse(localStorage.allMovies);
            const search = JSON.parse(localStorage.textsearch);
            const isChecked = JSON.parse(localStorage.shortfilm);
            setServerError(false);
            setFirstLogin(false);
            setSearchText(search);
            setIsChecked(isChecked);
            setAllMovies(movies);
            filter(movies, search, isChecked);
        }
    }, [filter]);

    function changeShortFilm () {
        if (isChecked) {
            setIsChecked(false);
            filter(searchText, false, allMovies);
        } else {
            setIsChecked(true);
            filter(searchText, true, allMovies);
        }
    }

    return (
        <>
            <SearchForm
                isChecked={isChecked}
                moviesSearch={moviesSearch}
                searchText={searchText}
                changeShortFilm={changeShortFilm}
                setIsError={setIsError}
                firstLogin={firstLogin} 
            />
            <MoviesCardList
                movies={filteredMovies}
                addMovie={addMovie}
                savedMovies={savedMovies}
                isLoading={isLoading}
                serverError={serverError}
                firstLogin={firstLogin}
            />
        </>
    );
}

export default Movies;