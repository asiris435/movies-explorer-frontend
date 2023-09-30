import { useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList ({ movies }) {
    const [count, setCount] = useState(showMovies().init);
    const result = movies.slice(0, count);

    function showMovies () {
        const counter = { init: 12, step: 3 };
        if (window.innerWidth < 1023) {
            counter.init = 8;
            counter.step = 2;
        }
        if (window.innerWidth < 650) {
            counter.init = 5;
            counter.step = 2;
        }
        return counter;
    }

    function clickMore () {
        setCount(count + showMovies().step);
    }

    return (
        <section aria-label="list of films" className="movies">
            <ul className="movies__list">
                {result.map(data => {
                    return (
                        <MoviesCard key={data.id} name={data.name} src={data.src} trailerLink={data.trailerLink} />
                    );
                })}
            </ul>
            <button type="button" className={`movies__more ${count >= movies.length && "movies__more_hidden"}`} onClick={clickMore}>Ещё</button>
        </section>
    );
}

export default MoviesCardList;
