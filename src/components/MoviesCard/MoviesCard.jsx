import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard ({ name, src, trailerLink }) {
    const { pathname } = useLocation();
    const [click, setClick] = useState(false);

    function onClick () {
        if (click) {
            setClick(false);
        } else {
            setClick(true);
        }
    }

    return (
        <li className="movies__card">
            <article>
                <Link to={trailerLink} target="_blank">
                    <img src={src} alt="Изображение кадра из фильма" className="movies__image" />
                </Link>
                <div className="movies__container">
                    <div className="movies__text-container">
                        <p className="movies__text">{name}</p>
                        <span className="movies__duration">1ч 47м</span>
                    </div>
                    {pathname === "/movies" ?
                        <button type="button" className={`movies__button ${click ? "movies__button_active" : ""}`} onClick={onClick}></button>
                        :
                        <button type="button" className={`movies__button movies__button_delete`} onClick={onClick}></button> 
                    }
                </div>
            </article>
        </li>
    );
}

export default MoviesCard;
