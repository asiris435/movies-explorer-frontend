import { Link } from "react-router-dom";
import photo from "../../images/photo.png";
import "./AboutMe.css";

function AboutMe () {
    return (
        <section className="about-me">
            <h2 id="about-me" className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__container-info">
                    <h3 className="about-me__name">Виталий</h3>
                    <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
                    <p className="about-me__resume">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове,
                    закончил факультет экономики СГУ. У&nbsp;меня есть жена
                    и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом.
                    Недавно начал кодить. С 2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
                    После того, как прошёл курс по&nbsp;веб-разработке,
                    начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.</p>
                    <Link to={"https://github.com/asiris435"} target="_blank" className="about-me__link">Github</Link>
                </div>
                <img src={photo} alt="Фотография автора проекта" className="about-me__photo" />
            </div>
        </section>
    );
}

export default AboutMe;
