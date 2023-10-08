import { useCallback, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { MaxDurationShortFilm } from "../../utils/constants";

function SavedMovies ({ savedMovies, onDelete, setIsError }) {
    const [filteredMovies, setFilteredMovies] = useState(savedMovies);
    const [searchText, setSearchText] = useState("");
    const [firstLogin, setFirstLogin] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    const filter = useCallback((search, isChecked, movies) => {
        setSearchText(search);
        setFilteredMovies(movies.filter((item) => {
            const nameSearch = item.nameRU.toLowerCase().includes(search.toLowerCase());
            return isChecked ? (nameSearch && item.duration <= MaxDurationShortFilm) : nameSearch;
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

    return (
        <>
            <SearchForm
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                moviesSearch={moviesSearch}
                searchText={searchText}
                setIsError={setIsError}
                firstLogin={firstLogin}
                savedMovies={savedMovies}
                filter={filter}
                movies={savedMovies}
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
