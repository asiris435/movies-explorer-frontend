import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import useFormValidation from "../../hooks/useFormValidation";

function SearchForm ({ isChecked, changeShortFilm }) {
    const [isError, setIsError] = useState(false);
    const { values, isValid, handleChange } = useFormValidation();

    function onSubmit (evt) {
        evt.preventDefault();
        if (!isValid) {
            setIsError(true);
            return;
        } else {
            setIsError(false);
        }
    }

    return (
        <section aria-label="search" className="search">
            <div className="search__container">
                <form noValidate className="search__form" name={"SearchForm"} value={values.search} onSubmit={onSubmit}>
                    <input type="text" placeholder="Фильм" required className="search__input" onChange={handleChange} />
                    <button type="submit" className="search__button"></button>
                </form>
                <span className={`search__error ${isError && "search__error_active"}`}>{isError ? "Введите ключевое слово" : ""}</span>
                <FilterCheckbox isChecked={isChecked} changeShortFilm={changeShortFilm} />
            </div>
        </section>
    );
}

export default SearchForm;
