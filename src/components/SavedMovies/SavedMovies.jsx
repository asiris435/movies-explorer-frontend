import { useCallback, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies ({ savedMovies, onDelete, setIsError }) {
    const [filteredMovies, setFilteredMovies] = useState(savedMovies);
    const [searchText, setSearchText] = useState("");
    const [firstLogin, setFirstLogin] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    const filter = useCallback((search, isChecked, movies) => {
        setSearchText(search);
        setFilteredMovies(movies.filter((item) => {
            const nameSearch = item.nameRU.toLowerCase().includes(search.toLowerCase());
            return isChecked ? (nameSearch && item.duration <= 40) : nameSearch;
        }))
    }, []);

    function moviesSearch (search) {
        setFirstLogin(false);
        filter(search, isChecked, savedMovies);
    }

    useEffect(() => {
        if (savedMovies.lehgth === 0) {
            setFirstLogin(true);
        } else {
            setFirstLogin(false);
        }
        filter(searchText, isChecked, savedMovies);
    }, [filter, savedMovies, isChecked, searchText]);

    function changeShortFilm () {
        if (isChecked) {
            setIsChecked(false);
            setFirstLogin(false);
            filter(searchText, false, savedMovies);
        } else {
            setIsChecked(true);
            setFirstLogin(false);
            filter(searchText, true, savedMovies);
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
                savedMovies={savedMovies}
            />
            <MoviesCardList
                movies={filteredMovies}
                onDelete={onDelete}
                firstLogin={firstLogin}
            />
        </>
    );
}

export default SavedMovies;
