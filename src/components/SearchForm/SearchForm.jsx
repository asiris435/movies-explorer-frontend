import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import useFormValidation from "../../hooks/useFormValidation";
import { useLocation } from "react-router-dom";
import ErrorContext from "../../contexts/ErrorContext";
import { useContext, useEffect } from "react";

function SearchForm ({ isChecked, setIsChecked, filter, moviesSearch, searchText, allMovies, setIsError, savedMovies }) {
    const { pathname } = useLocation();
    const isError = useContext(ErrorContext);
    const { values, handleChange, reset } = useFormValidation();

    useEffect(() => {
        if ((pathname === "/saved-movies" && savedMovies.length === 0)) {
            reset({ search: "" });
        } else {
            reset({ search: searchText });
        }
        setIsError(false);
    }, [searchText, reset, setIsError, pathname, savedMovies]);

    function changeShortFilm () {
        if (isChecked) {
            setIsChecked(false);
            filter(values.search, false, allMovies);
        } else {
            setIsChecked(true);
            filter(values.search, true, allMovies);
        }
    }

    function onSubmit (evt) {
        evt.preventDefault();
        if (evt.target.search.value) {
            moviesSearch(evt.target.search.value);
            setIsError(false);
        } else {
            setIsError(true);
        }
    }

    return (
        <section aria-label="search" className="search">
            <div className="search__container">
                <form noValidate className="search__form" name={"SearchForm"} onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Фильм"
                        required
                        className="search__input"
                        value={values.search || ""}
                        onChange={(evt) => {
                            handleChange(evt);
                            setIsError(false);
                        }}
                        disabled={savedMovies ? (savedMovies.length === 0 && true) : false}
                    />
                    <button 
                        type="submit" 
                        className={`search__button ${savedMovies ? (pathname === "/saved-movies" && savedMovies.length === 0) && "search__button_disabled" : ""}`}
                    ></button>  
                </form>
                <span className={`search__error ${isError && "search__error_active"}`}>{"«Нужно ввести ключевое слово»"}</span>
                <FilterCheckbox isChecked={isChecked} changeShortFilm={changeShortFilm} />
            </div>
        </section>
    );
}

export default SearchForm;
