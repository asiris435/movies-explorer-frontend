import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard ({ onDelete, addMovie, data, savedMovies }) {
    const { pathname } = useLocation();
    const [click, setClick] = useState(false);

    useEffect(() => {
        if (pathname === "/movies")             
        setClick(savedMovies.some(item => data.id === item.movieId));
    }, [savedMovies, data.id, setClick, pathname]);

    function onClick () {
        if (savedMovies.some(item => data.id === item.movieId)) {
            setClick(true);
            addMovie(data);
        } else {
            setClick(false);
            addMovie(data);
        }
    }

    function convertTimeCounter (duration) {
        const minutes = duration % 60;
        const hours = Math.floor(duration / 60);
        return (hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч${minutes}м`);
    }

    return (
        <li className="movies__card">
            <article>
                <Link to={data.trailerLink} target="_blank">
                    <img src={pathname === "/movies" ? `https://api.nomoreparties.co${data.image.url}` : data.image} alt={data.name} className="movies__image" />
                </Link>
                <div className="movies__container">
                    <div className="movies__text-container">
                        <p className="movies__text">{data.nameRU}</p>
                        <span className="movies__duration">{convertTimeCounter(data.duration)}</span>
                    </div>
                    {pathname === "/movies" ?
                        <button type="button" className={`movies__button ${click ? "movies__button_active" : ""}`} onClick={onClick}></button>
                        :
                        <button type="button" className={`movies__button movies__button_delete`} onClick={() => onDelete(data._id)}></button> 
                    }
                </div>
            </article>
        </li>
    );
}

export default MoviesCard;
