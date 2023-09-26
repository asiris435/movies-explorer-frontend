import "./AboutProject.css";

function AboutProject () {
    return (
        <section className="about__project">
            <h2 id="about-project" className="about__title">О проекте</h2>
            <div className="about__container">
                <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
                <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
                <p className="about__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className="about__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="about__time-container">
                <p className="about__time-allocation about__time-allocation_type_backend">1 неделя</p>
                <p className="about__time-allocation">4 недели</p>
                <p className="about__text">Back-end</p>
                <p className="about__text">Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;
