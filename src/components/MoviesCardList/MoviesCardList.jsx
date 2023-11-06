import { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import {
    MaxScreen,
    MediumScreen,
    SmallScreen,
    InitMaxScreen,
    InitMediumScreen,
    InitSmallScreen,
    StepMaxScreen,
    StepMediumScreen
} from "../../utils/constants";


function MoviesCardList ({ movies, onDelete, addMovie, savedMovies, isLoading, serverError, firstLogin }) {
    const { pathname } = useLocation();
    const [count, setCount] = useState("");
    const result = movies.slice(0, count);

    function showMovies () {
        const counter = { init: InitMaxScreen, step: StepMaxScreen };
        if (window.innerWidth < MaxScreen) {
            counter.init = InitMediumScreen;
            counter.step = StepMediumScreen;
        }
        if (window.innerWidth < MediumScreen) {
            counter.init = InitMediumScreen;
            counter.step = StepMediumScreen;
        }
        if (window.innerWidth < SmallScreen) {
            counter.init = InitSmallScreen;
            counter.step = StepMediumScreen;
        }
        return counter;
    }

    useEffect(() => {
        if (pathname === "/movies") {
            setCount(showMovies().init);
            function showMoviesResize () {
                if (window.innerWidth >= StepMaxScreen) {
                    setCount(showMovies().init);
                }
                if (window.innerWidth < StepMaxScreen) {
                    setCount(showMovies().init);
                }
                if (window.innerWidth < MediumScreen) {
                    setCount(showMovies().init);
                }
                if (window.innerWidth < SmallScreen) {
                    setCount(showMovies().init);
                }
            }
            window.addEventListener("resize", showMoviesResize);
            return () => window.removeEventListener("resize", showMoviesResize);
        }
    }, [pathname]);

    function clickMore () {
        setCount(count + showMovies().step);
    }

    return (
        <section aria-label="list of films" className="movies">
            <ul className="movies__list">
                {isLoading ? <Preloader /> :
                    (pathname === "/movies" && result.length !== 0) ?
                    result.map(data => {
                        return (
                            <MoviesCard key={data.id} savedMovies={savedMovies} addMovie={addMovie} data={data} />
                        );
                    }) : movies.length !== 0 ?
                    movies.map(data => {
                        return (
                            <MoviesCard key={data._id} onDelete={onDelete} data={data} />
                        );
                    }) : serverError ?
                    <span className="movies__search-error">
                        «Во время запроса произошла ошибка.
                        Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»
                    </span>
                    : !firstLogin ?
                    <span className="movies__search-error">«Ничего не найдено»</span>
                    : pathname === "/movies" ?
                    <span className='movies__search-error'>«Выполните поиск»</span>
                    :
                    <span className="movies__search-error">«Нет сохранённых фильмов»</span>
                }
            </ul>
            {pathname === "/movies" && 
            <button type="button" className={`movies__more ${count >= movies.length && "movies__more_hidden"}`} onClick={clickMore}>Ещё</button>}
        </section>
    );
}

export default MoviesCardList;
