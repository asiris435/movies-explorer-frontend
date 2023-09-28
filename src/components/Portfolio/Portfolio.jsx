import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio () {
    return (
        <section aria-label="portfolio" className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <nav className="portfolio__nav">
                <ul className="portfolio__list">
                    <li className="portfolio__item">
                        <Link to={"https://asiris435.github.io/how-to-learn/"} target="_blank" className="portfolio__link">
                            <p className="portfolio__text">Статичный сайт</p>
                            <button type="button" className="portfolio__button"></button>
                        </Link>
                    </li>
                    <li className="portfolio__item">
                        <Link to={"https://asiris435.github.io/russian-travel"} target="_blank" className="portfolio__link">
                            <p className="portfolio__text">Адаптивный сайт</p>
                            <button type="button" className="portfolio__button"></button>
                        </Link>
                    </li>
                    <li className="portfolio__item">
                        <Link to={"https://asiris435.github.io/react-mesto-auth"} target="_blank" className="portfolio__link portfolio__link_type_last">
                            <p className="portfolio__text">Одностраничное приложение</p>
                            <button type="button" className="portfolio__button"></button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    );
}

export default Portfolio;
