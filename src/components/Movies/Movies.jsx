import { useCallback, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import moviesApi from "../../utils/MoviesApi";
import { MaxDurationShortFilm } from "../../utils/constants";

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
            return isChecked ? (nameSearch && item.duration <= MaxDurationShortFilm) : nameSearch;
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
        if (localStorage.allmovies && localStorage.shortfilm && localStorage.textsearch) {
            const movies = JSON.parse(localStorage.allmovies);
            const search = JSON.parse(localStorage.textsearch);
            const isChecked = JSON.parse(localStorage.shortfilm);
            setServerError(false);
            setFirstLogin(false);
            setSearchText(search);
            setIsChecked(isChecked);
            setAllMovies(movies);
            filter(search, isChecked, movies);
        }
    }, [filter]);

    return (
        <>
            <SearchForm
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                filter={filter}
                moviesSearch={moviesSearch}
                searchText={searchText}
                movies={allMovies}
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
