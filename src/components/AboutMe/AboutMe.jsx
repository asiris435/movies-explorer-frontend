import { Link } from "react-router-dom";
import photo from "../../images/photo.png";
import "./AboutMe.css";

function AboutMe () {
    return (
        <section aria-label="about me" className="about-me">
            <h2 id="about-me" className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__container-info">
                    <h3 className="about-me__name">Александр</h3>
                    <p className="about-me__job">Фронтенд-разработчик, 49 лет</p>
                    <p className="about-me__resume">Я живу в Санкт-Петербурге,
                    образование высшее филологическое. Работал в компании "Российские железные дороги" в сфере HR.
                    Всегда интересовался IT, когда представилась возможность сменить вид деятельности, благодаря
                    курсам повышения квалификации, я ей воспльзовался. Планирую закрепиться и развиваться в новой,
                    для себя, отрасли. 
                    Я играю на гитаре, увлекаюсь авиационными симуляторами.
                    </p>
                    <Link to={"https://github.com/asiris435"} target="_blank" className="about-me__link">Github</Link>
                </div>
                <img src={photo} alt="Фотография автора проекта" className="about-me__photo" />
            </div>
        </section>
    );
}

export default AboutMe;
