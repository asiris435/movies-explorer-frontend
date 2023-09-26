import { Link, useNavigate } from "react-router-dom";
import "./PathError.css";

function PathError () {
    const navigate = useNavigate();

    return (
        <section className="path-error">
            <div className="path-error__container">
                <h2 className="path-error__title">404</h2>
                <p className="path-error__text">Страница не найдена</p>
                <Link onClick={() => navigate(-1)} className="path-error__link">Назад</Link>
            </div>
        </section>
    );
}

export default PathError;
