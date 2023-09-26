import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

function Footer () {
    const { pathname } = useLocation();

    return (
        <footer className={`footer ${pathname === "/saved-movies" && "footer_type_saved-movies"}`}>
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">© 2023</p>
                <nav className="footer__nav">
                    <Link to={"https://practicum.yandex.ru"} target="_blank" className="footer__link">Яндекс.Практикум</Link>
                    <Link to={"https://github.com/asiris435"} target="_blank" className="footer__link">Github</Link>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
